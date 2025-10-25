import { Cookie, Settings, Info } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface CookiePolicyProps {
  onBack: () => void;
}

export function CookiePolicy({ onBack }: CookiePolicyProps) {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl mb-4">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardContent className="p-8 prose prose-blue max-w-none">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-orange-900 mb-2 flex items-center gap-2">
                <Info className="w-5 h-5" />
                What Are Cookies?
              </h3>
              <p className="text-orange-800 mb-0">
                Cookies are small text files stored on your device when you visit HomeKeeper. They help us provide you with a better, faster, and safer experience.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold mb-3">1.1 Essential Cookies (Required)</h3>
              <p>These cookies are necessary for the platform to function. You cannot opt out of these.</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-mono text-xs">sb-access-token</td>
                      <td className="py-2">Authentication session</td>
                      <td className="py-2">7 days</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono text-xs">sb-refresh-token</td>
                      <td className="py-2">Session renewal</td>
                      <td className="py-2">30 days</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-xs">cookie-consent</td>
                      <td className="py-2">Stores your cookie preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">1.2 Functional Cookies (Optional)</h3>
              <p>These enhance your experience with personalized features.</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-mono text-xs">user-preferences</td>
                      <td className="py-2">Theme, language, dashboard layout</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-xs">notification-settings</td>
                      <td className="py-2">Alert preferences</td>
                      <td className="py-2">6 months</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">1.3 Analytics Cookies (Optional)</h3>
              <p>Help us understand how you use HomeKeeper to improve our service.</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-mono text-xs">_ga</td>
                      <td className="py-2">Google Analytics - visitor tracking</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-mono text-xs">usage-metrics</td>
                      <td className="py-2">Feature usage statistics</td>
                      <td className="py-2">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">1.4 Marketing Cookies (Optional)</h3>
              <p>Used to deliver relevant ads and measure campaign effectiveness.</p>
              <div className="bg-gray-50 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Cookie Name</th>
                      <th className="text-left py-2">Purpose</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 font-mono text-xs">marketing-source</td>
                      <td className="py-2">Track referral sources</td>
                      <td className="py-2">90 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Third-Party Cookies</h2>
              <p>We use services from trusted third parties that may set their own cookies:</p>
              <ul className="space-y-3 mt-4">
                <li>
                  <strong>Supabase:</strong> Authentication and database services
                  <br />
                  <a href="https://supabase.com/privacy" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener">
                    View Supabase Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Google Analytics:</strong> Website usage analytics (if enabled)
                  <br />
                  <a href="https://policies.google.com/privacy" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener">
                    View Google Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Make.com:</strong> Automation and webhook integrations
                  <br />
                  <a href="https://www.make.com/en/privacy-notice" className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener">
                    View Make.com Privacy Notice
                  </a>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Managing Your Cookie Preferences</h2>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-4">
                <div className="flex items-start gap-3">
                  <Settings className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-blue-900 mb-2">Control Your Cookies</h3>
                    <p className="text-blue-800 text-sm mb-3">
                      You can manage cookie preferences at any time through:
                    </p>
                    <ul className="space-y-2 text-blue-800 text-sm">
                      <li>• Cookie preference banner (appears on first visit)</li>
                      <li>• Account Settings → Privacy → Cookie Settings</li>
                      <li>• Your browser's privacy settings</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Browser Controls</h3>
              <p>Most browsers allow you to:</p>
              <ul className="space-y-2">
                <li>✓ View and delete cookies</li>
                <li>✓ Block third-party cookies</li>
                <li>✓ Block all cookies (may impact functionality)</li>
                <li>✓ Delete cookies when you close your browser</li>
              </ul>

              <div className="mt-4 space-y-2 text-sm">
                <p><strong>Browser-specific guides:</strong></p>
                <ul className="space-y-1">
                  <li>• <a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Chrome</a></li>
                  <li>• <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Firefox</a></li>
                  <li>• <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Safari</a></li>
                  <li>• <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Edge</a></li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Do Not Track (DNT)</h2>
              <p>
                HomeKeeper respects "Do Not Track" signals. When DNT is enabled in your browser, we will not set optional analytics or marketing cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Mobile Devices</h2>
              <p>
                Mobile apps may use device identifiers instead of cookies. You can manage these through your device settings:
              </p>
              <ul className="space-y-2 mt-3">
                <li><strong>iOS:</strong> Settings → Privacy → Tracking</li>
                <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy to reflect changes in technology or legal requirements. Check this page periodically for updates. Last updated date appears at the top.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="font-semibold mb-2">Questions about cookies?</p>
                <p className="text-sm text-gray-700">Email: privacy@homemaker.co.site</p>
                <p className="text-sm text-gray-700">Support: support@homemaker.co.site</p>
              </div>
            </section>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mt-8">
              <h3 className="font-bold text-green-900 mb-2">Your Consent</h3>
              <p className="text-green-800 text-sm mb-3">
                By continuing to use HomeKeeper, you consent to our use of essential cookies. Optional cookies require explicit consent via the cookie banner.
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Manage Cookie Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}