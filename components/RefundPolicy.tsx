import { DollarSign, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface RefundPolicyProps {
  onBack: () => void;
}

export function RefundPolicy({ onBack }: RefundPolicyProps) {
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-gray-600">Last Updated: January 15, 2025</p>
        </div>

        <Card className="shadow-xl mb-8">
          <CardContent className="p-8 prose prose-blue max-w-none">
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-8">
              <h3 className="text-xl font-bold text-green-900 mb-2">Our Commitment</h3>
              <p className="text-green-800 mb-0">
                We want you to be completely satisfied with HomeKeeper. If you're not happy, we'll make it right.
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. 14-Day Money-Back Guarantee</h2>
              
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <div className="flex items-start gap-4">
                  <Clock className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Premium Plan Trial</h3>
                    <p className="text-blue-800">
                      New Premium subscribers can request a full refund within 14 days of their first payment. No questions asked.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">Eligibility Requirements:</h3>
              <ul className="space-y-2">
                <li>✓ First-time Premium subscribers only</li>
                <li>✓ Request must be made within 14 days of initial payment</li>
                <li>✓ Applies to monthly and annual subscriptions</li>
                <li>✓ Account must not have violated our Terms of Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Refund Process</h2>
              
              <h3 className="text-xl font-semibold mb-3">How to Request a Refund</h3>
              <ol className="space-y-3">
                <li>
                  <strong>1. Contact Support</strong>
                  <br />
                  <span className="text-sm text-gray-700">
                    Email support@homemaker.co.site with "Refund Request" in the subject line
                  </span>
                </li>
                <li>
                  <strong>2. Provide Information</strong>
                  <br />
                  <span className="text-sm text-gray-700">
                    Include your account email, order number, and reason for refund (optional but appreciated)
                  </span>
                </li>
                <li>
                  <strong>3. Receive Confirmation</strong>
                  <br />
                  <span className="text-sm text-gray-700">
                    We'll confirm your request within 24 hours (business days)
                  </span>
                </li>
                <li>
                  <strong>4. Processing Time</strong>
                  <br />
                  <span className="text-sm text-gray-700">
                    Refunds are processed within 5-7 business days to your original payment method
                  </span>
                </li>
              </ol>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg mt-6">
                <p className="text-sm text-yellow-900 mb-0">
                  <strong>Note:</strong> Depending on your bank or card issuer, it may take an additional 3-10 business days for the refund to appear in your account.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. What's Refundable</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-green-900">Eligible for Refund</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>✓ Premium monthly subscription (first 14 days)</li>
                    <li>✓ Premium annual subscription (first 14 days)</li>
                    <li>✓ Technical issues preventing service use</li>
                    <li>✓ Duplicate charges or billing errors</li>
                    <li>✓ Service not as described</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h3 className="text-lg font-bold text-red-900">Not Refundable</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>✗ Renewals after the 14-day window</li>
                    <li>✗ Partial month refunds (except billing errors)</li>
                    <li>✗ Free plan (nothing to refund)</li>
                    <li>✗ Accounts terminated for TOS violations</li>
                    <li>✗ Change of mind after 14 days</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Subscription Cancellation</h2>
              
              <h3 className="text-xl font-semibold mb-3">Cancel Anytime</h3>
              <p>
                You can cancel your Premium subscription at any time. Cancellation takes effect at the end of your current billing period.
              </p>

              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900 mb-2"><strong>Important:</strong></p>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Canceling does NOT automatically trigger a refund</li>
                  <li>• You retain access until the end of the paid period</li>
                  <li>• Data is preserved for 30 days after cancellation</li>
                  <li>• You can reactivate anytime within 30 days</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mb-3 mt-6">How to Cancel</h3>
              <ol className="space-y-2">
                <li>1. Log in to your HomeKeeper account</li>
                <li>2. Go to Settings → Billing</li>
                <li>3. Click "Cancel Subscription"</li>
                <li>4. Confirm cancellation</li>
                <li>5. Receive confirmation email</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Billing Errors and Disputes</h2>
              
              <h3 className="text-xl font-semibold mb-3">Duplicate Charges</h3>
              <p>
                If you've been charged more than once for the same subscription, contact us immediately. We'll refund duplicate charges within 3-5 business days.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">Unauthorized Charges</h3>
              <p>
                If you notice unauthorized charges on your account:
              </p>
              <ol className="space-y-2 mt-2">
                <li>1. Secure your account immediately (change password)</li>
                <li>2. Contact support@homemaker.co.site</li>
                <li>3. We'll investigate and issue refunds for confirmed fraudulent charges</li>
              </ol>

              <h3 className="text-xl font-semibold mb-3 mt-4">Price Changes</h3>
              <p>
                If we increase subscription prices:
              </p>
              <ul className="space-y-2 mt-2">
                <li>• You'll be notified at least 30 days in advance</li>
                <li>• Your current rate is locked until your next renewal</li>
                <li>• You can cancel before the price change takes effect</li>
                <li>• If you cancel due to price increase, standard refund policy applies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Pro-Rated Refunds</h2>
              <p>
                We generally do not offer pro-rated refunds for partial subscription periods, except in the following cases:
              </p>
              <ul className="space-y-2 mt-3">
                <li>• Service outage lasting more than 48 consecutive hours</li>
                <li>• Account termination due to our error</li>
                <li>• Billing system malfunction</li>
                <li>• Verified technical issues preventing platform use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Annual Subscription Refunds</h2>
              <p>
                Annual subscriptions are eligible for full refunds within 14 days of purchase. After 14 days:
              </p>
              <ul className="space-y-2 mt-3">
                <li>• No refunds for the remaining subscription period</li>
                <li>• You can cancel to prevent auto-renewal</li>
                <li>• Access continues until the annual period ends</li>
              </ul>

              <div className="bg-blue-50 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> If you're unsure about committing to an annual plan, start with a monthly subscription to try HomeKeeper risk-free.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Refund Method</h2>
              <p>
                Refunds are issued to the original payment method:
              </p>
              <ul className="space-y-2 mt-3">
                <li>• <strong>Credit/Debit Card:</strong> 5-10 business days</li>
                <li>• <strong>PayPal:</strong> 3-5 business days</li>
                <li>• <strong>Other Payment Methods:</strong> Up to 14 business days</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                If the original payment method is no longer available, contact support for alternative refund arrangements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Exceptions and Special Cases</h2>
              
              <h3 className="text-xl font-semibold mb-3">Promotional Offers</h3>
              <p>
                If you subscribed using a promotional discount or coupon, refunds are calculated based on the amount actually paid, not the full price.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">Free Trials</h3>
              <p>
                Free trials can be canceled at any time before the trial ends without charge. No refund is necessary since no payment was made.
              </p>

              <h3 className="text-xl font-semibold mb-3 mt-4">Account Violations</h3>
              <p>
                Accounts terminated for violating our Terms of Service are not eligible for refunds.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="font-semibold mb-3">Need help with billing or refunds?</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> support@homemaker.co.site</p>
                  <p><strong>Subject Line:</strong> \"Refund Request\" or \"Billing Question\"</p>
                  <p><strong>Response Time:</strong> Within 24 hours (business days)</p>
                  <p className="mt-4 text-xs text-gray-600">
                    Please include your account email and order number for faster processing.
                  </p>
                </div>
              </div>
            </section>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mt-8">
              <h3 className="font-bold text-green-900 mb-2">Fair Refund Guarantee</h3>
              <p className="text-green-800 text-sm">
                We stand behind our service. If you experience technical issues or are unsatisfied within the first 14 days, we'll work with you to resolve the problem or provide a full refund. Your satisfaction is our priority.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}