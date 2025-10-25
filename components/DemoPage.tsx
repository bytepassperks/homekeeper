import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, ChevronRight, Check, Video, BookOpen, HelpCircle, ArrowRight, Home, Shield, Calendar, Bell, FileText, Zap, Download, Settings, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Breadcrumbs } from './Breadcrumbs';
import { Logo } from './Logo';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DemoPageProps {
  onBack: () => void;
  onNavigate?: (page: 'docs' | 'blog' | 'faq') => void;
  onGetStarted?: () => void;
}

export function DemoPage({ onBack, onNavigate, onGetStarted }: DemoPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = [
    {
      title: 'Welcome to HomeKeeper',
      description: 'Your comprehensive smart home inventory and maintenance tracking solution',
      image: 'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Home,
      duration: 5,
      highlights: [
        'Track unlimited home items',
        'Manage warranties automatically',
        'Never miss maintenance dates',
        'Gamification and rewards'
      ]
    },
    {
      title: 'Create Your Account',
      description: 'Sign up in seconds and start managing your home inventory',
      image: 'https://images.unsplash.com/photo-1649508083072-4010347b47f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: FileText,
      duration: 5,
      highlights: [
        'Free account - no credit card required',
        'Email verification for security',
        'Instant access to all features',
        'Up to 25 items on free plan'
      ]
    },
    {
      title: 'Add Your First Item',
      description: 'Add appliances, electronics, furniture, and more to your inventory',
      image: 'https://images.unsplash.com/photo-1624927637280-f033784c1279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: FileText,
      duration: 8,
      highlights: [
        'Select from 8 categories',
        'Organize by room',
        'Add purchase details and receipts',
        'Set warranty information',
        'Upload photos and documents'
      ]
    },
    {
      title: 'Dashboard Overview',
      description: 'See all your home inventory data at a glance',
      image: 'https://images.unsplash.com/photo-1740803292814-13d2e35924c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Home,
      duration: 7,
      highlights: [
        'Total items and home value',
        'Warranties expiring soon',
        'Upcoming maintenance tasks',
        'Quick stats and insights',
        'Gamification progress'
      ]
    },
    {
      title: 'Warranty Tracking',
      description: 'Never lose a warranty again with automated alerts',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Shield,
      duration: 7,
      highlights: [
        'Automatic expiration alerts',
        'Store warranty certificates',
        'Track warranty status',
        '7-day advance notifications',
        'View all warranties in one place'
      ]
    },
    {
      title: 'Maintenance Calendar',
      description: 'Schedule and track maintenance for all your items',
      image: 'https://images.unsplash.com/photo-1642360912445-61d71dd98400?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Calendar,
      duration: 7,
      highlights: [
        'Set custom maintenance intervals',
        'Calendar view of all tasks',
        'Log maintenance records',
        'Track costs and service history',
        'Get timely reminders'
      ]
    },
    {
      title: 'Smart Notifications',
      description: 'Receive alerts via email, SMS, and webhooks',
      image: 'https://images.unsplash.com/photo-1606495813362-8efff01b8573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Bell,
      duration: 6,
      highlights: [
        'Email notifications included',
        'SMS alerts (Premium)',
        'Make.com webhook integration',
        'Customizable reminder schedules',
        'Notification history tracking'
      ]
    },
    {
      title: 'Gamification & Rewards',
      description: 'Earn points, unlock badges, and level up as you manage your home',
      image: 'https://images.unsplash.com/photo-1759701546980-1211be084c70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Trophy,
      duration: 7,
      highlights: [
        'Earn points for every action',
        'Unlock 20+ achievement badges',
        'Level up from Novice to Home Master',
        'Weekly challenges',
        'City leaderboards',
        'Percentile rankings'
      ]
    },
    {
      title: 'Export & Backup',
      description: 'Export your inventory for insurance, taxes, or backup',
      image: 'https://images.unsplash.com/photo-1728710718080-3cf64d995d2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Download,
      duration: 5,
      highlights: [
        'Export to CSV format',
        'Generate PDF reports',
        'Download all photos/receipts',
        'Perfect for insurance claims',
        'Keep offline backups'
      ]
    },
    {
      title: 'Ready to Get Started?',
      description: 'Join thousands of homeowners managing their homes smarter',
      image: 'https://images.unsplash.com/photo-1758691737138-7b9b1884b1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      icon: Zap,
      duration: 5,
      highlights: [
        'Free plan available',
        'No credit card required',
        'Start in under 60 seconds',
        'Cancel anytime',
        '24/7 customer support'
      ]
    }
  ];

  const totalSteps = demoSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-advance when playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        handleNext();
      }, demoSteps[currentStep].duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep]);

  const currentStepData = demoSteps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo variant="full" size="md" clickable onClick={onBack} />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => onNavigate?.('docs')}
                className="hidden md:flex"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', onClick: onBack },
            { label: 'Product Demo' },
          ]}
        />

        {/* Hero Section */}
        <div className="text-center mb-12 mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Video className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Interactive Product Demo</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            See HomeKeeper in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a guided tour through all the features that make HomeKeeper the best home inventory management solution.
          </p>
        </div>

        {/* Demo Player */}
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            {/* Progress Bar */}
            <div className="bg-gray-100 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep + 1} of {totalSteps}
                </span>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Main Content */}
            <CardContent className="p-0">
              {/* Image/Screenshot Area */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-green-500 overflow-hidden">
                {/* Main Screenshot Image */}
                <ImageWithFallback
                  src={currentStepData.image}
                  alt={currentStepData.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Icon Badge in Top Right */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                  <StepIcon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                
                {/* Step Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <Badge className="bg-white/20 text-white border-white/30 mb-3 backdrop-blur-sm">
                    Step {currentStep + 1} of {totalSteps}
                  </Badge>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {currentStepData.title}
                  </h2>
                  <p className="text-base md:text-lg text-white/95 drop-shadow-md">
                    {currentStepData.description}
                  </p>
                </div>
              </div>

              {/* Step Details */}
              <div className="p-8 bg-white">
                <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {currentStepData.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA for last step */}
                {currentStep === totalSteps - 1 && (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border-2 border-blue-200">
                    <h3 className="text-2xl font-bold mb-2">Ready to Start Managing Your Home?</h3>
                    <p className="text-gray-600 mb-4">
                      Create your free account now and get instant access to all features.
                    </p>
                    <Button 
                      size="lg"
                      onClick={onGetStarted}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Controls */}
            <div className="bg-gray-50 border-t p-6">
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="hidden md:flex"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>

                <div className="flex items-center gap-2 flex-1 justify-center">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="default"
                    onClick={handlePlayPause}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleNext}
                  >
                    {currentStep === totalSteps - 1 ? 'Restart' : 'Next'}
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={handleNext}
                  className="hidden md:flex"
                >
                  Skip
                  <SkipForward className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-8 bg-blue-600'
                        : index < currentStep
                        ? 'w-2 bg-green-600'
                        : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Read Documentation</h3>
                <p className="text-gray-600 mb-4">
                  Detailed guides and tutorials for every feature
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate?.('docs')}
                  className="w-full"
                >
                  View Docs
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                  <HelpCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visit FAQ</h3>
                <p className="text-gray-600 mb-4">
                  Find answers to common questions
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => onNavigate?.('faq')}
                  className="w-full"
                >
                  View FAQ
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                  <Video className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Free Trial</h3>
                <p className="text-gray-600 mb-4">
                  Create your account and start managing your home
                </p>
                <Button 
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 HomeKeeper. All rights reserved.</p>
            <p className="mt-2">
              <a href="mailto:support@homemaker.co.site" className="text-blue-600 hover:underline">
                support@homemaker.co.site
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
