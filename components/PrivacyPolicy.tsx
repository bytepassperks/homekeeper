import { Shield, Lock, Mail, FileText } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={onBack} variant="ghost">
            ← Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardContent className="p-8 prose prose-blue max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Your Privacy Matters
              </h3>
              <p className="text-blue-800 mb-0">
                At HomeKeeper, we're committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3">1.1 Information You Provide</h3>
              <ul className="space-y-2 mb-4">
                <li><strong>Account Information:</strong> Name, email address, password (encrypted)</li>
                <li><strong>Inventory Data:</strong> Item names, photos, receipts, purchase dates, warranty information</li>
                <li><strong>Maintenance Records:</strong> Service dates, costs, notes, and documentation</li>
                <li><strong>Notification Preferences:</strong> Email and SMS settings, reminder configurations</li>
                <li><strong>Payment Information:</strong> Processed securely through third-party payment processors (we don't store credit card details)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">1.2 Automatically Collected Information</h3>
              <ul className="space-y-2">
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Cookies:</strong> Session tokens, preferences, analytics data (see Cookie Policy)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <ul className="space-y-2">
                <li>✓ Provide and maintain HomeKeeper services</li>
                <li>✓ Send warranty expiration and maintenance reminders</li>
                <li>✓ Process transactions and generate receipts</li>
                <li>✓ Improve our platform through analytics and user feedback</li>
                <li>✓ Communicate updates, offers, and support messages</li>
                <li>✓ Detect and prevent fraud or unauthorized access</li>
                <li>✓ Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Data Sharing and Third Parties</h2>
              
              <h3 className="text-xl font-semibold mb-3">We share data with:</h3>
              <ul className="space-y-3">
                <li>
                  <strong>Supabase:</strong> Database and authentication provider (US-based, SOC 2 Type II certified)
                </li>
                <li>
                  <strong>Make.com:</strong> Automation platform for webhook integrations and notifications
                </li>
                <li>
                  <strong>Email Service Providers:</strong> For sending warranty alerts and notifications
                </li>
                <li>
                  <strong>Analytics Services:</strong> Aggregated, anonymized data for platform improvement
                </li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-4">
                <p className="text-sm text-yellow-900 mb-0">
                  <strong>Important:</strong> We NEVER sell your personal data to third parties. All third-party services are bound by strict data processing agreements.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Storage and Security</h2>
              <ul className="space-y-2">
                <li><strong>Encryption:</strong> All data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li><strong>Access Control:</strong> Role-based permissions, multi-factor authentication available</li>
                <li><strong>Backups:</strong> Daily automated backups with 30-day retention</li>
                <li><strong>Infrastructure:</strong> Hosted on secure, GDPR-compliant cloud servers</li>
                <li><strong>Retention:</strong> Data kept as long as your account is active, or as required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Privacy Rights</h2>
              
              <h3 className="text-xl font-semibold mb-3">Under GDPR and CCPA, you have the right to:</h3>
              <ul className="space-y-2">
                <li>✓ <strong>Access:</strong> Request a copy of all your personal data</li>
                <li>✓ <strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                <li>✓ <strong>Erasure:</strong> Delete your account and all associated data</li>
                <li>✓ <strong>Portability:</strong> Export your data in CSV or JSON format</li>
                <li>✓ <strong>Restriction:</strong> Limit how we process your data</li>
                <li>✓ <strong>Objection:</strong> Opt-out of marketing communications</li>
                <li>✓ <strong>Withdraw Consent:</strong> Revoke permissions at any time</li>
              </ul>

              <p className="mt-4">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@homekeeper.co.site" className="text-blue-600 hover:underline">
                  privacy@homekeeper.co.site
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking</h2>
              <p>
                We use cookies to enhance your experience. See our{' '}
                <button className="text-blue-600 hover:underline">Cookie Policy</button> for details.
              </p>
              <p className="mt-2">
                You can control cookies through your browser settings. Note that disabling cookies may limit platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
              <p>
                HomeKeeper is not intended for users under 18. We do not knowingly collect data from children. If you believe a child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside your residence. We ensure adequate safeguards through Standard Contractual Clauses (SCCs) and compliance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Significant changes will be communicated via email and platform notifications. Continued use of HomeKeeper after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold mb-2">HomeKeeper Privacy Team</p>
                    <p className="text-sm text-gray-700">Email: privacy@homemaker.co.site</p>
                    <p className="text-sm text-gray-700">Support: support@homemaker.co.site</p>
                    <p className="text-sm text-gray-700 mt-3">
                      For GDPR inquiries, include "GDPR Request" in your subject line.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mt-8">
              <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Download This Policy
              </h3>
              <p className="text-green-800 text-sm mb-3">
                You can download this Privacy Policy as a PDF for your records.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}