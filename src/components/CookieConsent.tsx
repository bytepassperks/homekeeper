import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void;
}

export interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent({ onAccept }: CookieConsentProps) {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    functional: true,
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    onAccept(allAccepted);
    setShow(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    onAccept(preferences);
    setShow(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    onAccept(essentialOnly);
    setShow(false);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          {!showSettings ? (
            // Simple Banner
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">We Value Your Privacy 🍪</h3>
                  <p className="text-gray-700 mb-4">
                    We use cookies to enhance your experience, analyze site traffic, and provide personalized content. 
                    By clicking "Accept All," you consent to our use of cookies.{' '}
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Customize settings
                    </button>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="ghost"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Cookie Settings
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Read our{' '}
                    <button className="text-blue-600 hover:underline">Cookie Policy</button>
                    {' '}and{' '}
                    <button className="text-blue-600 hover:underline">Privacy Policy</button>
                  </p>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            // Detailed Settings
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Cookie Preferences</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-700 mb-6">
                Choose which cookies you want to accept. Essential cookies are required for the site to function.
              </p>

              <div className="space-y-4 mb-6">
                {/* Essential */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">Essential Cookies</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Required</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Necessary for authentication and core functionality. Cannot be disabled.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Functional */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Functional Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Remember your preferences like theme, language, and dashboard layout.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <button
                        onClick={() => setPreferences({ ...preferences, functional: !preferences.functional })}
                        className={`w-12 h-6 rounded-full flex items-center transition-all ${
                          preferences.functional ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                        } px-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Analytics */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Help us understand how you use HomeKeeper to improve our service.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <button
                        onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                        className={`w-12 h-6 rounded-full flex items-center transition-all ${
                          preferences.analytics ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                        } px-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Marketing */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                      <p className="text-sm text-gray-600">
                        Used to show you relevant ads and measure campaign effectiveness.
                      </p>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <button
                        onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                        className={`w-12 h-6 rounded-full flex items-center transition-all ${
                          preferences.marketing ? 'bg-blue-600 justify-end' : 'bg-gray-300 justify-start'
                        } px-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAcceptSelected}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Save Preferences
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="outline"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="ghost"
                >
                  Reject All
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}