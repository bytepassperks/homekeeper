import { Bell, Mail, MessageSquare, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { UserPreferences, NotificationLog } from '../types';

interface NotificationSettingsProps {
  userId: string;
  preferences: UserPreferences;
  notificationHistory: NotificationLog[];
  onSavePreferences: (prefs: UserPreferences) => Promise<void>;
  onResendNotification: (notificationId: string) => void;
}

export function NotificationSettings({ 
  userId, 
  preferences, 
  notificationHistory,
  onSavePreferences,
  onResendNotification 
}: NotificationSettingsProps) {
  const [localPrefs, setLocalPrefs] = useState<UserPreferences>(preferences);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocalPrefs(preferences);
  }, [preferences]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSavePreferences(localPrefs);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: NotificationLog['status']) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-100 text-green-800">Sent</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Notification Settings</h2>
        <p className="text-muted-foreground">
          Configure how and when you receive notifications
        </p>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts via email
                </p>
              </div>
            </div>
            <Switch
              checked={localPrefs.emailNotifications}
              onCheckedChange={(checked) => 
                setLocalPrefs({ ...localPrefs, emailNotifications: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive alerts via SMS (coming soon)
                </p>
              </div>
            </div>
            <Switch
              checked={localPrefs.smsNotifications}
              onCheckedChange={(checked) => 
                setLocalPrefs({ ...localPrefs, smsNotifications: checked })
              }
              disabled
            />
          </div>
        </CardContent>
      </Card>

      {/* Reminder Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Reminder Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="reminderDays">Reminder Advance Notice (days)</Label>
            <Input
              id="reminderDays"
              type="number"
              min="1"
              max="30"
              value={localPrefs.reminderDays}
              onChange={(e) => 
                setLocalPrefs({ ...localPrefs, reminderDays: parseInt(e.target.value) || 7 })
              }
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get notified this many days before maintenance or warranty expiry
            </p>
          </div>

          <div>
            <Label htmlFor="currency">Preferred Currency</Label>
            <Select 
              value={localPrefs.currency} 
              onValueChange={(v) => setLocalPrefs({ ...localPrefs, currency: v as 'INR' | 'USD' })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="INR">INR (₹)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quietStart">Quiet Hours Start</Label>
              <Input
                id="quietStart"
                type="time"
                value={localPrefs.quietHoursStart || '22:00'}
                onChange={(e) => 
                  setLocalPrefs({ ...localPrefs, quietHoursStart: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="quietEnd">Quiet Hours End</Label>
              <Input
                id="quietEnd"
                type="time"
                value={localPrefs.quietHoursEnd || '08:00'}
                onChange={(e) => 
                  setLocalPrefs({ ...localPrefs, quietHoursEnd: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            No notifications will be sent during quiet hours
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
        </CardHeader>
        <CardContent>
          {notificationHistory.length > 0 ? (
            <div className="space-y-3">
              {notificationHistory.slice(0, 10).map((notification) => (
                <div 
                  key={notification.id} 
                  className="flex items-start justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium capitalize">{notification.type}</span>
                      {getStatusBadge(notification.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.sentAt 
                        ? new Date(notification.sentAt).toLocaleString()
                        : 'Not sent yet'
                      }
                    </p>
                  </div>
                  {notification.status === 'failed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onResendNotification(notification.id)}
                    >
                      Resend
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No notifications sent yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="mb-2">Notification Types</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>Maintenance Due:</strong> Upcoming maintenance tasks</li>
            <li><strong>Warranty Expiring:</strong> Warranties expiring soon</li>
            <li><strong>Replacement Deals:</strong> Price drops on replacement items</li>
            <li><strong>Annual Summary:</strong> Yearly inventory report</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3">
            Email: support@homemaker.co.site
          </p>
        </CardContent>
      </Card>
    </div>
  );
}