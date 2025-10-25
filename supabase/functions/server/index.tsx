import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware - Enhanced CORS with explicit OPTIONS handling
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400,
  credentials: true,
}));

app.use('*', logger(console.log));

// Explicit OPTIONS handler for all routes
app.options('*', (c) => {
  return c.text('', 204);
});

// Helper function to create admin Supabase client
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

// Helper function to create regular Supabase client
const getSupabase = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );
};

// Helper function to verify auth
const verifyAuth = async (authHeader: string | null) => {
  if (!authHeader) {
    return { error: 'Unauthorized', userId: null };
  }

  const accessToken = authHeader.split(' ')[1];
  const supabase = getSupabase();
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user?.id) {
    return { error: 'Unauthorized', userId: null };
  }

  return { error: null, userId: user.id };
};

// ========== AUTH ROUTES ==========

app.post('/make-server-7627b83a/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const supabase = getSupabaseAdmin();

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Registration error for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Initialize user preferences
    if (data.user) {
      await kv.set(`user:${data.user.id}:preferences`, {
        userId: data.user.id,
        emailNotifications: true,
        smsNotifications: false,
        reminderDays: 7,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00',
        currency: 'USD'
      });
    }

    console.log(`User registered successfully: ${email}`);
    return c.json({ success: true, userId: data.user.id });
  } catch (err: any) {
    console.log(`Unexpected registration error: ${err.message}`);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// ========== ITEM ROUTES ==========

app.post('/make-server-7627b83a/items', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const itemData = await c.req.json();
    const itemId = crypto.randomUUID();
    const now = new Date().toISOString();

    const item = {
      id: itemId,
      userId,
      ...itemData,
      createdAt: now,
      updatedAt: now
    };

    await kv.set(`user:${userId}:item:${itemId}`, item);

    // Trigger webhook for new item (Make.com integration)
    try {
      const webhookUrl = await kv.get(`user:${userId}:webhook:new-item`);
      if (webhookUrl) {
        fetch(webhookUrl as string, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item, userId })
        }).catch(err => console.log(`Webhook error: ${err.message}`));
      }
    } catch (err) {
      console.log(`Webhook trigger error: ${err}`);
    }

    console.log(`Item created: ${itemId} for user ${userId}`);
    return c.json({ success: true, item });
  } catch (err: any) {
    console.log(`Error creating item: ${err.message}`);
    return c.json({ error: 'Failed to create item' }, 500);
  }
});

app.get('/make-server-7627b83a/items', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const items = await kv.getByPrefix(`user:${userId}:item:`);
    
    console.log(`Fetched ${items.length} items for user ${userId}`);
    return c.json({ items });
  } catch (err: any) {
    console.log(`Error fetching items: ${err.message}`);
    return c.json({ error: 'Failed to fetch items' }, 500);
  }
});

app.put('/make-server-7627b83a/items/:itemId', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const itemId = c.req.param('itemId');
    const updates = await c.req.json();

    const existingItem = await kv.get(`user:${userId}:item:${itemId}`);
    if (!existingItem) {
      return c.json({ error: 'Item not found' }, 404);
    }

    const updatedItem = {
      ...existingItem,
      ...updates,
      id: itemId,
      userId,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${userId}:item:${itemId}`, updatedItem);

    console.log(`Item updated: ${itemId} for user ${userId}`);
    return c.json({ success: true, item: updatedItem });
  } catch (err: any) {
    console.log(`Error updating item: ${err.message}`);
    return c.json({ error: 'Failed to update item' }, 500);
  }
});

app.delete('/make-server-7627b83a/items/:itemId', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const itemId = c.req.param('itemId');

    await kv.del(`user:${userId}:item:${itemId}`);
    
    // Also delete related maintenance records
    const maintenanceRecords = await kv.getByPrefix(`user:${userId}:maintenance:${itemId}:`);
    for (const record of maintenanceRecords) {
      await kv.del(`user:${userId}:maintenance:${itemId}:${record.id}`);
    }

    console.log(`Item deleted: ${itemId} for user ${userId}`);
    return c.json({ success: true });
  } catch (err: any) {
    console.log(`Error deleting item: ${err.message}`);
    return c.json({ error: 'Failed to delete item' }, 500);
  }
});

// ========== MAINTENANCE ROUTES ==========

app.post('/make-server-7627b83a/maintenance', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const { itemId, date, cost, notes, performedBy } = await c.req.json();
    const maintenanceId = crypto.randomUUID();

    const record = {
      id: maintenanceId,
      itemId,
      date,
      cost: cost || 0,
      notes,
      performedBy,
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${userId}:maintenance:${itemId}:${maintenanceId}`, record);

    // Update item's lastMaintenance and nextMaintenance
    const item = await kv.get(`user:${userId}:item:${itemId}`);
    if (item) {
      const maintenanceDate = new Date(date);
      const nextDate = new Date(maintenanceDate);
      nextDate.setDate(nextDate.getDate() + (item.maintenanceInterval || 90));

      await kv.set(`user:${userId}:item:${itemId}`, {
        ...item,
        lastMaintenance: date,
        nextMaintenance: nextDate.toISOString().split('T')[0],
        updatedAt: new Date().toISOString()
      });
    }

    console.log(`Maintenance logged: ${maintenanceId} for item ${itemId}`);
    return c.json({ success: true, record });
  } catch (err: any) {
    console.log(`Error logging maintenance: ${err.message}`);
    return c.json({ error: 'Failed to log maintenance' }, 500);
  }
});

app.get('/make-server-7627b83a/maintenance/:itemId', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const itemId = c.req.param('itemId');
    const records = await kv.getByPrefix(`user:${userId}:maintenance:${itemId}:`);

    // Sort by date descending
    records.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(`Fetched ${records.length} maintenance records for item ${itemId}`);
    return c.json({ records });
  } catch (err: any) {
    console.log(`Error fetching maintenance records: ${err.message}`);
    return c.json({ error: 'Failed to fetch maintenance records' }, 500);
  }
});

// ========== PREFERENCES ROUTES ==========

app.get('/make-server-7627b83a/preferences', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    let preferences = await kv.get(`user:${userId}:preferences`);
    
    if (!preferences) {
      // Return default preferences
      preferences = {
        userId,
        emailNotifications: true,
        smsNotifications: false,
        reminderDays: 7,
        quietHoursStart: '22:00',
        quietHoursEnd: '08:00',
        currency: 'USD'
      };
    }

    return c.json({ preferences });
  } catch (err: any) {
    console.log(`Error fetching preferences: ${err.message}`);
    return c.json({ error: 'Failed to fetch preferences' }, 500);
  }
});

app.put('/make-server-7627b83a/preferences', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const preferences = await c.req.json();
    await kv.set(`user:${userId}:preferences`, { ...preferences, userId });

    console.log(`Preferences updated for user ${userId}`);
    return c.json({ success: true, preferences });
  } catch (err: any) {
    console.log(`Error updating preferences: ${err.message}`);
    return c.json({ error: 'Failed to update preferences' }, 500);
  }
});

// ========== WEBHOOK ROUTES ==========

app.post('/make-server-7627b83a/api/webhook/new-item', async (c) => {
  try {
    const { item, userId } = await c.req.json();
    
    console.log(`Webhook: new-item triggered for user ${userId}, item ${item.name}`);
    
    // Log webhook call
    const logId = crypto.randomUUID();
    await kv.set(`webhook-log:${logId}`, {
      endpoint: '/api/webhook/new-item',
      timestamp: new Date().toISOString(),
      status: 'success',
      message: `New item added: ${item.name}`
    });

    return c.json({ 
      success: true, 
      message: 'Item webhook received. Reminders will be scheduled via Make.com.' 
    });
  } catch (err: any) {
    console.log(`Webhook error (new-item): ${err.message}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

app.post('/make-server-7627b83a/api/webhook/maintenance-reminder', async (c) => {
  try {
    console.log('Webhook: maintenance-reminder triggered');
    
    const logId = crypto.randomUUID();
    await kv.set(`webhook-log:${logId}`, {
      endpoint: '/api/webhook/maintenance-reminder',
      timestamp: new Date().toISOString(),
      status: 'success',
      message: 'Maintenance reminder check completed'
    });

    return c.json({ 
      success: true, 
      message: 'Maintenance reminders processed via Make.com' 
    });
  } catch (err: any) {
    console.log(`Webhook error (maintenance-reminder): ${err.message}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

app.post('/make-server-7627b83a/api/webhook/warranty-alert', async (c) => {
  try {
    console.log('Webhook: warranty-alert triggered');
    
    const logId = crypto.randomUUID();
    await kv.set(`webhook-log:${logId}`, {
      endpoint: '/api/webhook/warranty-alert',
      timestamp: new Date().toISOString(),
      status: 'success',
      message: 'Warranty alert check completed'
    });

    return c.json({ 
      success: true, 
      message: 'Warranty alerts processed via Make.com' 
    });
  } catch (err: any) {
    console.log(`Webhook error (warranty-alert): ${err.message}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

app.post('/make-server-7627b83a/api/webhook/find-replacement', async (c) => {
  try {
    const { item, userId } = await c.req.json();
    
    console.log(`Webhook: find-replacement triggered for item ${item.name}`);
    
    // Here you would integrate with Amazon/Flipkart APIs
    // For now, we'll return a mock response
    const replacements = [
      {
        name: `${item.name} (2025 Model)`,
        price: item.price * 1.1,
        source: 'Amazon',
        url: '#',
        rating: 4.5
      },
      {
        name: `Similar to ${item.name}`,
        price: item.price * 0.9,
        source: 'Flipkart',
        url: '#',
        rating: 4.3
      }
    ];

    const logId = crypto.randomUUID();
    await kv.set(`webhook-log:${logId}`, {
      endpoint: '/api/webhook/find-replacement',
      timestamp: new Date().toISOString(),
      status: 'success',
      message: `Found ${replacements.length} replacement options for ${item.name}`
    });

    return c.json({ success: true, replacements });
  } catch (err: any) {
    console.log(`Webhook error (find-replacement): ${err.message}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

app.post('/make-server-7627b83a/api/webhook/annual-report', async (c) => {
  try {
    const { userId } = await c.req.json();
    
    console.log(`Webhook: annual-report triggered for user ${userId}`);
    
    const logId = crypto.randomUUID();
    await kv.set(`webhook-log:${logId}`, {
      endpoint: '/api/webhook/annual-report',
      timestamp: new Date().toISOString(),
      status: 'success',
      message: 'Annual report generation completed'
    });

    return c.json({ 
      success: true, 
      message: 'Annual insurance report generated via Make.com' 
    });
  } catch (err: any) {
    console.log(`Webhook error (annual-report): ${err.message}`);
    return c.json({ error: 'Webhook processing failed' }, 500);
  }
});

// Get webhook logs
app.get('/make-server-7627b83a/webhook-logs', async (c) => {
  try {
    const logs = await kv.getByPrefix('webhook-log:');
    
    // Sort by timestamp descending
    logs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ logs: logs.slice(0, 20) });
  } catch (err: any) {
    console.log(`Error fetching webhook logs: ${err.message}`);
    return c.json({ error: 'Failed to fetch logs' }, 500);
  }
});

// ========== NOTIFICATION ROUTES ==========

app.get('/make-server-7627b83a/notifications', async (c) => {
  try {
    const { error, userId } = await verifyAuth(c.req.header('Authorization'));
    if (error) return c.json({ error }, 401);

    const notifications = await kv.getByPrefix(`user:${userId}:notification:`);
    
    // Sort by timestamp descending
    notifications.sort((a: any, b: any) => 
      new Date(b.sentAt || b.createdAt).getTime() - new Date(a.sentAt || a.createdAt).getTime()
    );

    return c.json({ notifications: notifications.slice(0, 50) });
  } catch (err: any) {
    console.log(`Error fetching notifications: ${err.message}`);
    return c.json({ error: 'Failed to fetch notifications' }, 500);
  }
});

// Health check
app.get('/make-server-7627b83a/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
Deno.serve(app.fetch);
