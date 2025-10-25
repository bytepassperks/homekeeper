import { Webhook, Copy, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { projectId, edgeFunctionName } from '../utils/supabase/info';

interface WebhookEndpoint {
  name: string;
  path: string;
  description: string;
  method: string;
}

interface WebhookLog {
  endpoint: string;
  timestamp: string;
  status: 'success' | 'error';
  message: string;
}

interface WebhookConfigProps {
  onTestEndpoint: (path: string) => Promise<{ success: boolean; message: string }>;
  webhookLogs: WebhookLog[];
}

export function WebhookConfig({ onTestEndpoint, webhookLogs }: WebhookConfigProps) {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [testingPath, setTestingPath] = useState<string | null>(null);

  const endpoints: WebhookEndpoint[] = [
    {
      name: 'New Item',
      path: '/api/webhook/new-item',
      description: 'Triggered when a new item is added. Sets up maintenance reminders.',
      method: 'POST'
    },
    {
      name: 'Maintenance Reminder',
      path: '/api/webhook/maintenance-reminder',
      description: 'Daily check for upcoming maintenance tasks (runs automatically).',
      method: 'POST'
    },
    {
      name: 'Warranty Alert',
      path: '/api/webhook/warranty-alert',
      description: 'Daily check for expiring warranties (runs automatically).',
      method: 'POST'
    },
    {
      name: 'Find Replacement',
      path: '/api/webhook/find-replacement',
      description: 'Searches Amazon and Flipkart for replacement products.',
      method: 'POST'
    },
    {
      name: 'Annual Report',
      path: '/api/webhook/annual-report',
      description: 'Generates comprehensive insurance PDF report.',
      method: 'POST'
    }
  ];

  const getFullUrl = (path: string) => {
    return `https://${projectId}.supabase.co/functions/v1/${edgeFunctionName}/make-server-7627b83a${path}`;
  };

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(getFullUrl(path));
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const testEndpoint = async (path: string) => {
    setTestingPath(path);
    try {
      await onTestEndpoint(path);
    } finally {
      setTestingPath(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Webhook Configuration</h2>
        <p className="text-muted-foreground">
          Configure Make.com webhooks for automation
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="mb-2">Integration Instructions</h4>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Copy the webhook URL from the endpoint cards below</li>
            <li>In Make.com, create a new scenario with a Webhook trigger</li>
            <li>Paste the HomeKeeper webhook URL as the webhook receiver</li>
            <li>Configure the automation actions (email, SMS, etc.)</li>
            <li>Test the connection using the "Test" button</li>
          </ol>
        </CardContent>
      </Card>

      {/* Endpoint Cards */}
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <Card key={endpoint.path}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Webhook className="w-5 h-5" />
                    {endpoint.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {endpoint.description}
                  </p>
                </div>
                <Badge variant="outline">{endpoint.method}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Endpoint URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={getFullUrl(endpoint.path)}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(endpoint.path)}
                  >
                    {copiedPath === endpoint.path ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testEndpoint(endpoint.path)}
                disabled={testingPath === endpoint.path}
              >
                {testingPath === endpoint.path ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Webhook Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {webhookLogs.length > 0 ? (
            <div className="space-y-2">
              {webhookLogs.slice(0, 10).map((log, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 border rounded-lg"
                >
                  {log.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{log.endpoint}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No webhook activity yet
            </p>
          )}
        </CardContent>
      </Card>

      {/* Make.com Integration Card */}
      <Card>
        <CardHeader>
          <CardTitle>Make.com Automation Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Email Reminders:</strong> Use Gmail or SendGrid modules to send maintenance reminders</li>
            <li><strong>SMS Alerts:</strong> Use Twilio to send SMS notifications for urgent items</li>
            <li><strong>Product Search:</strong> Use Amazon API to find replacement products</li>
            <li><strong>Price Tracking:</strong> Monitor product prices and alert on drops</li>
            <li><strong>Calendar Integration:</strong> Add maintenance tasks to Google Calendar</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
