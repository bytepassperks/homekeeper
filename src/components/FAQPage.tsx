import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface FAQPageProps {
  onBack: () => void;
}

const FAQ_DATA = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click "Get Started" on the homepage, then choose "Sign Up." Enter your email and create a password. You\'ll receive a confirmation email to verify your account.'
      },
      {
        q: 'Is HomeKeeper really free?',
        a: 'Yes! Our Free plan allows up to 25 items with basic warranty tracking, email notifications, and maintenance calendars. No credit card required. Upgrade to Premium anytime for unlimited items and advanced features.'
      },
      {
        q: 'What devices can I use HomeKeeper on?',
        a: 'HomeKeeper works on any device with a web browser—desktop, laptop, tablet, or smartphone. We\'re fully responsive and optimized for mobile use.'
      }
    ]
  },
  {
    category: 'Features & Functionality',
    questions: [
      {
        q: 'How do warranty reminders work?',
        a: 'When you add an item with a warranty expiry date, HomeKeeper automatically sends email reminders 30 days, 7 days, and 1 day before expiration. Premium users also get SMS alerts.'
      },
      {
        q: 'Can I upload photos and receipts?',
        a: 'Absolutely! You can upload photos, receipts, and manuals for each item. Free users get 100 MB storage, Premium users get 10 GB.'
      },
      {
        q: 'What is the replacement watchlist?',
        a: 'Mark items for replacement and our system (Premium only) automatically finds deals and alternatives, helping you save money when it\'s time to upgrade.'
      },
      {
        q: 'How do webhook integrations work?',
        a: 'Premium users can connect HomeKeeper to Make.com for custom automations—like sending warranty alerts to Slack, syncing with Google Sheets, or triggering smart home actions.'
      }
    ]
  },
  {
    category: 'Billing & Subscriptions',
    questions: [
      {
        q: 'How much does Premium cost?',
        a: 'Premium is $9.99/month or $99/year (save $20). We often run promotions with up to 50% off. All Premium plans include a 14-day money-back guarantee.'
      },
      {
        q: 'Can I upgrade or downgrade my plan?',
        a: 'Yes! Upgrades take effect immediately. Downgrades take effect at the end of your current billing cycle. You won\'t lose any data when switching plans.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Visa, Mastercard, American Express, Discover, PayPal, and Apple Pay through our secure payment processor.'
      },
      {
        q: 'Is there a refund policy?',
        a: 'Yes! New Premium subscribers can request a full refund within 14 days of their first payment. See our Refund Policy for details.'
      },
      {
        q: 'How do I cancel my subscription?',
        a: 'Go to Settings → Billing → Cancel Subscription. Your access continues until the end of your paid period, and your data is preserved for 30 days.'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'Is my data secure?',
        a: 'Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We use Supabase for secure, GDPR-compliant storage with daily backups.'
      },
      {
        q: 'Who can see my inventory?',
        a: 'Only you. Your items, photos, and documents are private. We never share your personal data with third parties without your explicit consent.'
      },
      {
        q: 'Do you sell my data?',
        a: 'Never. We may use aggregated, anonymized analytics to improve our service, but we do not sell personal data to anyone.'
      },
      {
        q: 'Are you GDPR and CCPA compliant?',
        a: 'Yes! We comply with GDPR, CCPA, and other major data protection regulations. You have full rights to access, export, and delete your data anytime.'
      }
    ]
  },
  {
    category: 'Technical Support',
    questions: [
      {
        q: 'What if I forget my password?',
        a: 'Click "Forgot Password" on the login page. We\'ll send a reset link to your email. If you don\'t receive it, check your spam folder or contact support.'
      },
      {
        q: 'Can I export my data?',
        a: 'Yes! Free users can export to CSV. Premium users can export to CSV, PDF, and JSON formats. Go to Settings → Export Data.'
      },
      {
        q: 'How do I contact support?',
        a: 'Email support@homekeeper.co.site for assistance. Premium users get priority support with responses within 24 hours. Free users typically hear back within 48 hours.'
      },
      {
        q: 'Is there a mobile app?',
        a: 'Currently, HomeKeeper is a web app that works great on mobile browsers. A native mobile app is on our roadmap for 2025!'
      }
    ]
  },
  {
    category: 'Account Management',
    questions: [
      {
        q: 'Can I share my account with family members?',
        a: 'Each account is for individual use. However, Premium users can export data to share inventory lists with family members via PDF or CSV.'
      },
      {
        q: 'What happens to my data if I delete my account?',
        a: 'All your data is permanently deleted within 30 days of account deletion. You can export your data before deleting your account.'
      },
      {
        q: 'Can I change my email address?',
        a: 'Yes! Go to Settings → Account → Change Email. You\'ll need to verify the new email address.'
      }
    ]
  }
];

export function FAQPage({ onBack }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const filteredFAQs = FAQ_DATA.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about HomeKeeper
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {filteredFAQs.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-blue-200">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const questionId = `${catIndex}-${qIndex}`;
                  const isExpanded = expandedQuestions.has(questionId);

                  return (
                    <Card
                      key={qIndex}
                      className="shadow-md hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => toggleQuestion(questionId)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-start gap-2">
                              <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                              {faq.q}
                            </h3>
                            {isExpanded && (
                              <p className="text-gray-700 ml-7 mt-3">
                                {faq.a}
                              </p>
                            )}
                          </div>
                          <button className="flex-shrink-0 text-blue-600">
                            {isExpanded ? (
                              <ChevronUp className="w-6 h-6" />
                            ) : (
                              <ChevronDown className="w-6 h-6" />
                            )}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No results found for "{searchQuery}"</p>
            <Button onClick={() => setSearchQuery('')} variant="outline">
              Clear Search
            </Button>
          </div>
        )}

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8"
              onClick={() => window.location.href = 'mailto:support@homekeeper.co.site'}
            >
              Email Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 text-lg px-8"
            >
              View Documentation
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            support@homekeeper.co.site • Response within 24-48 hours
          </p>
        </div>
      </main>
    </div>
  );
}