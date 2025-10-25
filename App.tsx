import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { AddItemModal } from './components/AddItemModal';
import { ItemCatalog } from './components/ItemCatalog';
import { ItemDetailPage } from './components/ItemDetailPage';
import { MaintenanceCalendar } from './components/MaintenanceCalendar';
import { WarrantyManagement } from './components/WarrantyManagement';
import { ReplacementWatchlist } from './components/ReplacementWatchlist';
import { NotificationSettings } from './components/NotificationSettings';
import { WebhookConfig } from './components/WebhookConfig';
import { ExitIntentModal } from './components/ExitIntentModal';
import { PricingPage } from './components/PricingPage';
import { FAQPage } from './components/FAQPage';
import { BlogPage } from './components/BlogPage';
import { BrandAssetsPage } from './components/BrandAssetsPage';
import { DocumentationPage } from './components/DocumentationPage';
import { DemoPage } from './components/DemoPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { CookiePolicy } from './components/CookiePolicy';
import { RefundPolicy } from './components/RefundPolicy';
import { CookieConsent, CookiePreferences } from './components/CookieConsent';
import { createClient } from './utils/supabase/client';
import { projectId, publicAnonKey, edgeFunctionName } from './utils/supabase/info';
import { Item, DashboardStats, UserPreferences, MaintenanceRecord, NotificationLog } from './types';
import { toast, Toaster } from 'sonner';

type Page = 'landing' | 'dashboard' | 'catalog' | 'calendar' | 'warranties' | 'watchlist' | 'notifications' | 'webhooks' | 'pricing' | 'faq' | 'blog' | 'brand' | 'docs' | 'demo' | 'privacy' | 'terms' | 'cookies' | 'refund';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalItems: 0,
    warrantiesExpiringSoon: 0,
    maintenanceUpcoming: 0,
    totalValue: 0,
    currency: 'USD'
  });
  const [preferences, setPreferences] = useState<UserPreferences>({
    userId: '',
    emailNotifications: true,
    smsNotifications: false,
    reminderDays: 7,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    currency: 'USD'
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationLog[]>([]);
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const checkSession = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session?.access_token && data.session?.user?.id) {
        setAccessToken(data.session.access_token);
        setUserId(data.session.user.id);
        setCurrentPage('dashboard');
        await loadUserData(data.session.access_token, data.session.user.id);
      }
    } catch (err) {
      console.log('Session check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (token: string, uid: string) => {
    try {
      // Load items
      const itemsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/items`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const itemsData = await itemsRes.json();
      if (itemsData.items) {
        setItems(itemsData.items);
        calculateStats(itemsData.items);
      }

      // Load preferences
      const prefsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/preferences`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const prefsData = await prefsRes.json();
      if (prefsData.preferences) {
        setPreferences(prefsData.preferences);
      }

      // Load notifications
      const notifRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/notifications`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const notifData = await notifRes.json();
      if (notifData.notifications) {
        setNotifications(notifData.notifications);
      }

      // Load webhook logs
      const logsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/webhook-logs`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );
      const logsData = await logsRes.json();
      if (logsData.logs) {
        setWebhookLogs(logsData.logs);
      }
    } catch (err) {
      console.log('Error loading user data:', err);
      toast.error('Failed to load user data');
    }
  };

  const calculateStats = (itemsList: Item[]) => {
    const today = new Date();
    
    const warrantiesExpiringSoon = itemsList.filter(item => {
      const expiryDate = new Date(item.warrantyExpiry);
      const daysUntil = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil > 0 && daysUntil <= 30;
    }).length;

    const maintenanceUpcoming = itemsList.filter(item => {
      const nextDate = new Date(item.nextMaintenance);
      const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7;
    }).length;

    const totalValue = itemsList.reduce((sum, item) => sum + item.price, 0);

    setStats({
      totalItems: itemsList.length,
      warrantiesExpiringSoon,
      maintenanceUpcoming,
      totalValue,
      currency: preferences.currency
    });
  };

  const handleAuthSuccess = (token: string, uid: string) => {
    setAccessToken(token);
    setUserId(uid);
    setShowAuthModal(false);
    setCurrentPage('dashboard');
    loadUserData(token, uid);
    toast.success('Welcome to HomeKeeper!');
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setAccessToken(null);
      setUserId(null);
      setItems([]);
      setCurrentPage('landing');
      toast.success('Signed out successfully');
    } catch (err) {
      console.log('Logout error:', err);
      toast.error('Failed to sign out');
    }
  };

  const handleAddItem = async (itemData: Omit<Item, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/items`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add item');
      }

      setItems([...items, result.item]);
      calculateStats([...items, result.item]);
      toast.success('Item added successfully!');
    } catch (err: any) {
      console.log('Error adding item:', err);
      throw err;
    }
  };

  const handleEditItem = async (item: Item) => {
    // For now, just show the item details
    setSelectedItem(item);
    loadMaintenanceHistory(item.id);
    setCurrentPage('catalog'); // Will show detail view
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!accessToken || !confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/items/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems(items.filter(item => item.id !== itemId));
      calculateStats(items.filter(item => item.id !== itemId));
      toast.success('Item deleted successfully');
    } catch (err) {
      console.log('Error deleting item:', err);
      toast.error('Failed to delete item');
    }
  };

  const loadMaintenanceHistory = async (itemId: string) => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/maintenance/${itemId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );

      const result = await response.json();
      if (result.records) {
        setMaintenanceHistory(result.records);
      }
    } catch (err) {
      console.log('Error loading maintenance history:', err);
    }
  };

  const handleLogMaintenance = async () => {
    if (!selectedItem || !accessToken) return;

    const date = prompt('Enter maintenance date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    if (!date) return;

    const notes = prompt('Enter maintenance notes:');
    if (!notes) return;

    const costStr = prompt('Enter cost (optional):');
    const cost = costStr ? parseFloat(costStr) : 0;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/maintenance`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itemId: selectedItem.id,
            date,
            cost,
            notes,
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to log maintenance');
      }

      loadMaintenanceHistory(selectedItem.id);
      toast.success('Maintenance logged successfully');
    } catch (err) {
      console.log('Error logging maintenance:', err);
      toast.error('Failed to log maintenance');
    }
  };

  const handleMarkForReplacement = async () => {
    if (!selectedItem || !accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/items/${selectedItem.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            markedForReplacement: true
          })
        }
      );

      const result = await response.json();
      if (result.item) {
        setItems(items.map(item => item.id === result.item.id ? result.item : item));
        setSelectedItem(result.item);
        toast.success('Item marked for replacement');
      }
    } catch (err) {
      console.log('Error marking item:', err);
      toast.error('Failed to mark item');
    }
  };

  const handleFindReplacement = async (item: Item) => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/api/webhook/find-replacement`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ item, userId })
        }
      );

      const result = await response.json();
      if (result.replacements) {
        alert(`Found ${result.replacements.length} replacement options:\n\n${result.replacements.map((r: any) => `${r.name} - ${item.currency} ${r.price} (${r.source})`).join('\n')}`);
      }
    } catch (err) {
      console.log('Error finding replacements:', err);
      toast.error('Failed to find replacements');
    }
  };

  const handleRemoveFromWatchlist = async (itemId: string) => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/items/${itemId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            markedForReplacement: false
          })
        }
      );

      const result = await response.json();
      if (result.item) {
        setItems(items.map(item => item.id === result.item.id ? result.item : item));
        toast.success('Removed from watchlist');
      }
    } catch (err) {
      console.log('Error removing from watchlist:', err);
      toast.error('Failed to remove from watchlist');
    }
  };

  const handleSavePreferences = async (prefs: UserPreferences) => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a/preferences`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prefs)
        }
      );

      const result = await response.json();
      if (result.preferences) {
        setPreferences(result.preferences);
        toast.success('Preferences saved successfully');
      }
    } catch (err) {
      console.log('Error saving preferences:', err);
      toast.error('Failed to save preferences');
    }
  };

  const handleTestEndpoint = async (path: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a${path}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ test: true, userId })
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success('Webhook test successful!');
        return { success: true, message: result.message };
      } else {
        toast.error('Webhook test failed');
        return { success: false, message: result.error };
      }
    } catch (err: any) {
      console.log('Webhook test error:', err);
      toast.error('Webhook test failed');
      return { success: false, message: err.message };
    }
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      const csv = [
        ['Name', 'Category', 'Room', 'Purchase Date', 'Price', 'Warranty Expiry', 'Next Maintenance'],
        ...items.map(item => [
          item.name,
          item.category,
          item.room,
          item.purchaseDate,
          `${item.currency} ${item.price}`,
          item.warrantyExpiry,
          item.nextMaintenance
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'homekeeper-inventory.csv';
      a.click();
      toast.success('CSV exported successfully');
    } else {
      toast.info('PDF export coming soon');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading HomeKeeper...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      
      {currentPage === 'landing' && (
        <LandingPage 
          onGetStarted={() => setShowAuthModal(true)} 
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'dashboard' && userId && accessToken && (
        <Dashboard
          userId={userId}
          accessToken={accessToken}
          onLogout={handleLogout}
          onNavigate={setCurrentPage}
          onAddItem={() => setShowAddItemModal(true)}
          items={items}
          stats={stats}
        />
      )}

      {currentPage === 'catalog' && !selectedItem && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold">Item Catalog</h1>
              <button onClick={() => setCurrentPage('dashboard')} className="text-blue-600 hover:underline">
                Back to Dashboard
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <ItemCatalog
              items={items}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onViewDetails={(item) => {
                setSelectedItem(item);
                loadMaintenanceHistory(item.id);
              }}
              onExport={handleExport}
            />
          </main>
        </div>
      )}

      {currentPage === 'catalog' && selectedItem && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto">
              <button onClick={() => setSelectedItem(null)} className="text-blue-600 hover:underline">
                Back to Catalog
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <ItemDetailPage
              item={selectedItem}
              maintenanceHistory={maintenanceHistory}
              onBack={() => setSelectedItem(null)}
              onLogMaintenance={handleLogMaintenance}
              onDownloadDocumentation={() => toast.info('PDF download coming soon')}
              onMarkForReplacement={handleMarkForReplacement}
              onFindReplacement={() => handleFindReplacement(selectedItem)}
            />
          </main>
        </div>
      )}

      {currentPage === 'calendar' && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold">Maintenance Calendar</h1>
              <button onClick={() => setCurrentPage('dashboard')} className="text-blue-600 hover:underline">
                Back to Dashboard
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <MaintenanceCalendar
              items={items}
              onItemClick={(item) => {
                setSelectedItem(item);
                loadMaintenanceHistory(item.id);
                setCurrentPage('catalog');
              }}
              onAddCustomReminder={() => toast.info('Custom reminders coming soon')}
            />
          </main>
        </div>
      )}

      {currentPage === 'warranties' && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold">Warranty Management</h1>
              <button onClick={() => setCurrentPage('dashboard')} className="text-blue-600 hover:underline">
                Back to Dashboard
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <WarrantyManagement
              items={items}
              onViewItem={(item) => {
                setSelectedItem(item);
                loadMaintenanceHistory(item.id);
                setCurrentPage('catalog');
              }}
              onGenerateInsuranceReport={() => toast.info('Insurance report generation coming soon')}
            />
          </main>
        </div>
      )}

      {currentPage === 'watchlist' && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold">Replacement Watchlist</h1>
              <button onClick={() => setCurrentPage('dashboard')} className="text-blue-600 hover:underline">
                Back to Dashboard
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <ReplacementWatchlist
              items={items}
              onViewItem={(item) => {
                setSelectedItem(item);
                loadMaintenanceHistory(item.id);
                setCurrentPage('catalog');
              }}
              onFindReplacement={handleFindReplacement}
              onRemoveFromWatchlist={handleRemoveFromWatchlist}
            />
          </main>
        </div>
      )}

      {currentPage === 'notifications' && userId && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold">Notification Settings</h1>
              <button onClick={() => setCurrentPage('dashboard')} className="text-blue-600 hover:underline">
                Back to Dashboard
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <NotificationSettings
              userId={userId}
              preferences={preferences}
              notificationHistory={notifications}
              onSavePreferences={handleSavePreferences}
              onResendNotification={(id) => toast.info('Resend functionality coming soon')}
            />
          </main>
        </div>
      )}

      {currentPage === 'webhooks' && (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-xl font-semibold">Webhook Configuration</h1>
              <button onClick={() => setCurrentPage('dashboard')} className="text-blue-600 hover:underline">
                Back to Dashboard
              </button>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <WebhookConfig
              onTestEndpoint={handleTestEndpoint}
              webhookLogs={webhookLogs}
            />
          </main>
        </div>
      )}

      {currentPage === 'pricing' && (
        <PricingPage 
          onBack={() => setCurrentPage('landing')} 
          onSelectPlan={(plan) => {
            setShowAuthModal(true);
            toast.success(`Selected ${plan} plan! Create an account to get started.`);
          }}
        />
      )}

      {currentPage === 'faq' && (
        <FAQPage 
          onBack={() => setCurrentPage('landing')} 
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'blog' && (
        <BlogPage onBack={() => setCurrentPage('landing')} onNavigate={setCurrentPage} />
      )}

      {currentPage === 'brand' && (
        <BrandAssetsPage onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'docs' && (
        <DocumentationPage 
          onBack={() => setCurrentPage('landing')} 
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'demo' && (
        <DemoPage 
          onBack={() => setCurrentPage('landing')} 
          onNavigate={setCurrentPage}
          onGetStarted={() => setShowAuthModal(true)}
        />
      )}

      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'terms' && (
        <TermsOfService onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'cookies' && (
        <CookiePolicy onBack={() => setCurrentPage('landing')} />
      )}

      {currentPage === 'refund' && (
        <RefundPolicy onBack={() => setCurrentPage('landing')} />
      )}

      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {userId && (
        <AddItemModal
          open={showAddItemModal}
          onClose={() => setShowAddItemModal(false)}
          onSubmit={handleAddItem}
          userId={userId}
        />
      )}

      {currentPage === 'landing' && (
        <>
          <ExitIntentModal
            onClaim={() => {
              setShowAuthModal(true);
              toast.success('Claim your free month by completing setup!');
            }}
          />
          <CookieConsent
            onAccept={(prefs) => {
              setCookiePreferences(prefs);
              console.log('Cookie preferences saved:', prefs);
            }}
          />
        </>
      )}
    </>
  );
}