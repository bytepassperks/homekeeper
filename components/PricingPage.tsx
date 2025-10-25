import { Check, Sparkles, Zap, Crown, Users, TrendingUp, Shield, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TestimonialsSlider } from './TestimonialsSlider';
import { SEOHead, getProductSchema } from './SEOHead';

interface PricingPageProps {
  onBack: () => void;
  onSelectPlan: (plan: 'free' | 'premium') => void;
}

export function PricingPage({ onBack, onSelectPlan }: PricingPageProps) {
  const structuredData = [
    getProductSchema({
      name: "HomeKeeper Free Plan",
      description: "Free home inventory and warranty tracking for up to 25 items",
      image: "https://www.homemaker.co.site/images/free-plan.jpg",
      price: "0",
      currency: "USD"
    }),
    getProductSchema({
      name: "HomeKeeper Premium Plan",
      description: "Unlimited home inventory, maintenance tracking, and warranty alerts",
      image: "https://www.homemaker.co.site/images/premium-plan.jpg",
      price: "9.99",
      currency: "USD"
    })
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
      <SEOHead
        title="Affordable Home Inventory & Warranty Tracking Plans"
        description="Choose the perfect HomeKeeper plan for your needs. Free plan includes 25 items. Premium unlocks unlimited inventory, automated maintenance reminders, and priority support. Start free today!"
        keywords="home inventory pricing, warranty tracker cost, free home management app, affordable maintenance scheduler, home organization pricing"
        canonicalUrl="https://www.homemaker.co.site/pricing"
        ogType="website"
        structuredData={structuredData}
      />
      
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={onBack} variant="ghost">
            ← Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            LIMITED TIME: 50% OFF Annual Plans
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, upgrade anytime. No credit card required. 14-day money-back guarantee.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <Lock className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold">CCPA Ready</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-sm text-gray-600">Perfect to get started</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Forever free</p>
              </div>

              <Button 
                onClick={() => onSelectPlan('free')}
                variant="outline" 
                size="lg" 
                className="w-full mb-6 border-2"
              >
                Get Started Free
              </Button>

              <div className="space-y-4">
                <p className="font-semibold text-gray-900">What's included:</p>
                <ul className="space-y-3">
                  {[
                    'Up to 25 items',
                    'Basic warranty tracking',
                    'Email notifications',
                    'Maintenance calendar',
                    'Mobile responsive',
                    'Basic analytics',
                    'Community support'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="shadow-2xl hover:shadow-3xl transition-all duration-300 border-4 border-gradient-to-r from-blue-500 to-purple-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-xl">
              ⚡ MOST POPULAR
            </div>
            
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Premium
                  </h3>
                  <p className="text-sm text-gray-600">For power users</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    $9.99
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through">$19.99/month</span>
                  <Badge className="bg-red-100 text-red-700">50% OFF</Badge>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-2">
                  Or $99/year (save $20)
                </p>
              </div>

              <Button 
                onClick={() => onSelectPlan('premium')}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 shadow-xl"
              >
                Try Premium Free
              </Button>

              <div className="space-y-4">
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Everything in Free, plus:
                </p>
                <ul className="space-y-3">
                  {[
                    { text: 'Unlimited items', highlight: true },
                    { text: 'Advanced analytics & insights', highlight: true },
                    { text: 'Priority customer support', highlight: false },
                    { text: 'Webhook integrations (Make.com)', highlight: true },
                    { text: 'Automatic deal finding', highlight: true },
                    { text: 'Document storage & scanning', highlight: false },
                    { text: 'PDF export & reports', highlight: false },
                    { text: 'SMS notifications', highlight: false },
                    { text: 'Custom branding', highlight: false },
                    { text: 'API access', highlight: true }
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${feature.highlight ? 'text-purple-600' : 'text-green-600'}`} />
                      <span className={feature.highlight ? 'text-gray-900 font-semibold' : 'text-gray-700'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500">
                  14-day money-back guarantee • Cancel anytime
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
          <Card className="shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold">Free</th>
                    <th className="text-center p-4 font-semibold bg-gradient-to-r from-blue-100 to-purple-100">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: 'Number of items', free: '25', premium: 'Unlimited' },
                    { feature: 'Warranty tracking', free: '✓', premium: '✓' },
                    { feature: 'Email notifications', free: '✓', premium: '✓' },
                    { feature: 'SMS notifications', free: '✗', premium: '✓' },
                    { feature: 'Analytics dashboard', free: 'Basic', premium: 'Advanced' },
                    { feature: 'Document storage', free: '100 MB', premium: '10 GB' },
                    { feature: 'Webhook integrations', free: '✗', premium: '✓' },
                    { feature: 'Deal finding', free: '✗', premium: 'Automatic' },
                    { feature: 'Support', free: 'Community', premium: 'Priority' },
                    { feature: 'API access', free: '✗', premium: '✓' },
                    { feature: 'Custom branding', free: '✗', premium: '✓' },
                    { feature: 'Export options', free: 'CSV', premium: 'CSV, PDF, JSON' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="p-4 text-center text-gray-700">{row.free}</td>
                      <td className="p-4 text-center font-semibold bg-blue-50/50">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="max-w-4xl mx-auto mb-16">
          <TestimonialsSlider />
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Join Thousands of Happy Homeowners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Items Tracked</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$2.5M+</div>
              <div className="text-blue-100">Saved in Warranty Claims</div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the end of your billing cycle.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Apple Pay.'
              },
              {
                q: 'Is there really a 14-day money-back guarantee?',
                a: 'Absolutely! If you\'re not satisfied with Premium within the first 14 days, we\'ll refund you in full, no questions asked.'
              },
              {
                q: 'What happens if I cancel?',
                a: 'You keep access until the end of your paid period. Your data is preserved for 30 days in case you want to reactivate.'
              }
            ].map((faq, i) => (
              <Card key={i} className="shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-700">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start protecting your home investments today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onSelectPlan('free')}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8"
            >
              Start Free
            </Button>
            <Button 
              onClick={() => onSelectPlan('premium')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 shadow-xl"
            >
              Try Premium Free
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            Have questions? Email us at sales@homekeeper.co.site
          </p>
        </div>
      </main>
    </div>
  );
}