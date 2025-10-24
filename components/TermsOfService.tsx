import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardContent className="p-8 prose prose-blue max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Agreement to Terms</h3>
              <p className="text-blue-800 mb-0">
                By accessing or using HomeKeeper, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our service.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Service Description</h2>
              <p>
                HomeKeeper is a smart home inventory and maintenance tracking platform that helps users:
              </p>
              <ul className="space-y-2">
                <li>Catalog household items with photos, receipts, and warranties</li>
                <li>Track maintenance schedules and receive automated reminders</li>
                <li>Manage warranty expirations and documentation</li>
                <li>Find replacement options and deals</li>
                <li>Integrate with third-party automation tools (Make.com)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
              
              <h3 className="text-xl font-semibold mb-3">2.1 Eligibility</h3>
              <p>You must be at least 18 years old to use HomeKeeper. By registering, you represent that you meet this requirement.</p>

              <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Account Security</h3>
              <ul className="space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>You are liable for all activities under your account</li>
                <li>One account per user (no account sharing)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">2.3 Accurate Information</h3>
              <p>You agree to provide accurate, current, and complete information during registration and keep it updated.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Subscription Plans and Billing</h2>
              
              <h3 className="text-xl font-semibold mb-3">3.1 Free Plan</h3>
              <ul className="space-y-2">
                <li>Limited to 25 items</li>
                <li>Basic warranty tracking</li>
                <li>Email notifications</li>
                <li>No credit card required</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">3.2 Premium Plan</h3>
              <ul className="space-y-2">
                <li>Unlimited items</li>
                <li>Advanced analytics and insights</li>
                <li>Priority support</li>
                <li>Webhook integrations</li>
                <li>Automatic deal finding</li>
                <li>Billed monthly or annually</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-4">3.3 Payment Terms</h3>
              <ul className="space-y-2">
                <li>Subscriptions auto-renew unless canceled</li>
                <li>Price changes communicated 30 days in advance</li>
                <li>All fees are non-refundable except as stated in our Refund Policy</li>
                <li>Failed payments may result in service suspension</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold mb-3">You agree NOT to:</h3>
              <ul className="space-y-2">
                <li>❌ Use the service for illegal activities</li>
                <li>❌ Upload malicious code, viruses, or harmful content</li>
                <li>❌ Attempt to hack, reverse engineer, or compromise our systems</li>
                <li>❌ Scrape, data mine, or use automated tools without permission</li>
                <li>❌ Impersonate others or create fake accounts</li>
                <li>❌ Share copyrighted material without authorization</li>
                <li>❌ Resell or redistribute HomeKeeper services</li>
                <li>❌ Send spam or unsolicited communications through our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              
              <h3 className="text-xl font-semibold mb-3">5.1 Our IP</h3>
              <p>
                HomeKeeper, our logo, design, features, and content are owned by HomeKeeper and protected by copyright, trademark, and other laws. You may not copy, modify, or distribute our intellectual property.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">5.2 Your Content</h3>
              <p>
                You retain ownership of content you upload (photos, receipts, notes). By using HomeKeeper, you grant us a license to store, process, and display your content solely to provide our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Third-Party Integrations</h2>
              <p>
                HomeKeeper integrates with third-party services like Make.com. Your use of these services is subject to their respective terms and privacy policies:
              </p>
              <ul className="space-y-2 mt-3">
                <li>• Make.com: <a href="https://www.make.com/en/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Terms</a> | <a href="https://www.make.com/en/privacy-notice" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Privacy</a></li>
                <li>• Supabase: <a href="https://supabase.com/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Terms</a> | <a href="https://supabase.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Privacy</a></li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                We are not responsible for third-party service availability, performance, or data practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Disclaimers and Limitations</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-xl mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-yellow-900 mb-2">Important Disclaimers</h3>
                    <ul className="space-y-2 text-yellow-800 text-sm">
                      <li>• HomeKeeper is provided "AS IS" without warranties of any kind</li>
                      <li>• We do not guarantee uninterrupted or error-free service</li>
                      <li>• Warranty reminders are informational only—we're not liable for missed expirations</li>
                      <li>• You're responsible for backing up your own data</li>
                      <li>• Deal recommendations are estimates—actual prices may vary</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Limitation of Liability</h3>
              <p>
                To the maximum extent permitted by law, HomeKeeper shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
              </p>
              <p className="mt-2">
                Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
              
              <h3 className="text-xl font-semibold mb-3">8.1 By You</h3>
              <p>You may cancel your account at any time through Account Settings. Data deletion occurs within 30 days.</p>

              <h3 className="text-xl font-semibold mb-3 mt-4">8.2 By Us</h3>
              <p>We may suspend or terminate your account if you:</p>
              <ul className="space-y-2">
                <li>• Violate these Terms of Service</li>
                <li>• Fail to pay subscription fees</li>
                <li>• Engage in fraudulent or abusive behavior</li>
                <li>• Remain inactive for over 12 months (with prior notice)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Governing Law and Disputes</h2>
              <p>
                These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
              </p>
              <p className="mt-3">
                Any disputes shall be resolved through binding arbitration, except where prohibited by law. You waive the right to participate in class-action lawsuits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p>
                We may update these Terms at any time. Material changes will be communicated via email 30 days before taking effect. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="font-semibold mb-2">Questions about these Terms?</p>
                <p className="text-sm text-gray-700">Email: support@homemaker.co.site</p>
                <p className="text-sm text-gray-700">Legal: legal@homemaker.co.site</p>
              </div>
            </section>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mt-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 mb-2">By using HomeKeeper, you acknowledge:</h3>
                  <ul className="space-y-1 text-green-800 text-sm">
                    <li>✓ You have read and understood these Terms</li>
                    <li>✓ You agree to comply with all terms and conditions</li>
                    <li>✓ You accept our Privacy Policy and Cookie Policy</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}