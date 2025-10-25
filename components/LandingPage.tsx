import { useState, useEffect } from 'react';
import { Home, Shield, Calendar, Bell, FileText, Smartphone, TrendingUp, Users, Star, CheckCircle, AlertCircle, Trophy, Zap, Target, Mail, Twitter, Linkedin, Instagram, ExternalLink, DollarSign, HelpCircle, BookOpen, ArrowRight, BarChart3, Sparkles, Play } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { TestimonialsSlider } from './TestimonialsSlider';
import { motion } from 'motion/react';
import { SEOHead, getOrganizationSchema } from './SEOHead';
import { SocialShare } from './SocialShare';
import { Logo } from './Logo';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate?: (page: 'pricing' | 'faq' | 'blog' | 'brand' | 'docs' | 'demo' | 'privacy' | 'terms' | 'cookies' | 'refund') => void;
}

export function LandingPage({ onGetStarted, onNavigate }: LandingPageProps) {
  const structuredData = getOrganizationSchema();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SEOHead
        title="Smart Home Inventory & Maintenance Tracker"
        description="Track your home inventory, manage warranties, schedule maintenance, and never miss important dates. The ultimate smart home management solution with automated reminders and Make.com integration."
        keywords="home inventory app, warranty tracker, maintenance scheduler, smart home management, appliance tracker, home organization, insurance inventory, warranty management software, home maintenance app India"
        canonicalUrl="https://www.homemaker.co.site"
        ogType="website"
        structuredData={structuredData}
      />
      
      {/* Enhanced Header with Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo 
              variant="full" 
              size="md" 
              clickable 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => onNavigate?.('pricing')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold flex items-center gap-1"
              >
                <DollarSign className="w-4 h-4" />
                Pricing
              </button>
              <button 
                onClick={() => onNavigate?.('docs')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold flex items-center gap-1"
              >
                <BookOpen className="w-4 h-4" />
                Docs
              </button>
              <button 
                onClick={() => onNavigate?.('blog')}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Blog
              </button>
              <button 
                onClick={() => onNavigate?.('faq')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-semibold flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" />
                FAQ
              </button>
              <button 
                onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Testimonials
              </button>
            </nav>

            <Button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sign In / Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Smart Home Management</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Manage Your Home,<br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Effortlessly
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Track your home inventory, manage warranties, schedule maintenance, and never miss an important date again. 
            Your complete smart home management solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate?.('demo')}
              className="text-lg px-8 py-6 border-2 hover:bg-blue-50 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="mt-16 relative animate-fade-in-up animation-delay-600">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1591528287446-43c9c0e1075e?w=1200" 
              alt="Organized home inventory and storage"
              className="rounded-2xl shadow-2xl w-full max-w-5xl mx-auto border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose HomeKeeper?</h2>
          <p className="text-xl text-gray-600">Everything you need to manage your home inventory</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-blue-200">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl">Complete Inventory</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize all your home items by category and room. Track purchase dates, prices, and receipts in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-green-200">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl">Warranty Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Never lose a warranty again. Get alerts before warranties expire and keep all documentation accessible.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-purple-200">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl">Maintenance Scheduling</h3>
              <p className="text-gray-600 leading-relaxed">
                Set maintenance intervals and get timely reminders. Track service history and costs for every item.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-yellow-200">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl">Smart Notifications</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive email and SMS alerts for upcoming maintenance, expiring warranties, and replacement recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-red-200">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl">Replacement Watchlist</h3>
              <p className="text-gray-600 leading-relaxed">
                Track aging items and get smart recommendations for replacements with price comparisons.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-indigo-200">
            <CardContent className="pt-6">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Home className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-xl">Insurance Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate comprehensive inventory reports with photos and values for insurance claims.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get started in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                1
              </div>
              <h3 className="mb-3 text-xl">Add Your Items</h3>
              <p className="text-gray-600 leading-relaxed">
                Create an inventory of your home items with photos, receipts, and warranty information.
              </p>
              <div className="mt-6 w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1756471818388-af6aadafbf07?w=400" 
                  alt="Catalog your home appliances and items"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                2
              </div>
              <h3 className="mb-3 text-xl">Set Up Reminders</h3>
              <p className="text-gray-600 leading-relaxed">
                Configure maintenance schedules and warranty alerts. Our system automatically tracks everything.
              </p>
              <div className="mt-6 w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1617106400445-2a7a84cec8c9?w=400" 
                  alt="Schedule maintenance and set calendar reminders"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-xl">
                3
              </div>
              <h3 className="mb-3 text-xl">Stay Informed</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive timely notifications and access detailed reports whenever you need them.
              </p>
              <div className="mt-6 w-full aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?w=400" 
                  alt="View analytics dashboard and reports"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Hear from satisfied HomeKeeper users</p>
        </div>
        
        <TestimonialsSlider />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl shadow-2xl p-12 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Home Management?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of homeowners who trust HomeKeeper to keep their homes organized and maintained.
            </p>
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Start Free Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div>
              <Logo variant="full" size="md" theme="dark" className="mb-6" />
              <p className="text-gray-400 mb-6">
                Your complete smart home inventory and maintenance management solution.
              </p>
              <div className="flex gap-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => {
                      // Scroll to features section
                      const featuresSection = document.getElementById('features');
                      if (featuresSection) {
                        featuresSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('pricing')} className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      // Scroll to top for "About Us" story
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Roadmap
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => onNavigate?.('faq')} className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </button>
                </li>
                <li>
                  <a href="mailto:support@homemaker.co.site" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('faq')} className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </button>
                </li>
                <li>
                  <a 
                    href="https://discord.gg/homekeeper" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    Community
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <button onClick={() => onNavigate?.('privacy')} className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('terms')} className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('cookies')} className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('refund')} className="text-gray-400 hover:text-white transition-colors">
                    Refund Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-800 pt-8 pb-8">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="text-sm">CCPA Ready</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-orange-500" />
                <span className="text-sm">AES-256 Encryption</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 HomeKeeper. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Made with ❤️ for homeowners everywhere
              </p>
            </div>
            <p className="text-gray-600 text-xs mt-4 text-center">
              Third-party integrations: Powered by{' '}
              <a href="https://www.make.com/en/privacy-notice" target="_blank" rel="noopener" className="text-blue-400 hover:underline">
                Make.com
              </a>
              {' '}and{' '}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener" className="text-blue-400 hover:underline">
                Supabase
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}