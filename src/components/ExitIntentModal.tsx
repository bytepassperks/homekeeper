import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Clock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface ExitIntentModalProps {
  onClaim: () => void;
}

export function ExitIntentModal({ onClaim }: ExitIntentModalProps) {
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [hasShown, setHasShown] = useState(false); // Track if already shown this session
  const [timeOnPage, setTimeOnPage] = useState(0); // Track time spent on page

  // Track time on page
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Only set up exit intent detection if:
    // 1. Modal hasn't been shown yet
    // 2. User has been on page for at least 10 seconds
    if (hasShown || timeOnPage < 10) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if:
      // 1. Mouse is leaving from the top (y <= 10)
      // 2. Mouse is moving upward (checking velocity)
      // 3. Modal is not already showing
      if (e.clientY <= 10 && !show) {
        setShow(true);
        setHasShown(true); // Mark as shown so it doesn't trigger again
      }
    };

    // Add event listener to document
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [show, hasShown, timeOnPage]);

  useEffect(() => {
    if (show && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [show, countdown]);

  const handleClaim = () => {
    onClaim();
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
    // Don't reset hasShown - keep it marked as shown for this session
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close if clicking on backdrop
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <Gift className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold mb-4">Wait! Don't Go Yet! 🎁</h2>
              <p className="text-xl text-gray-700 mb-6">
                <span className="font-bold text-blue-600">Exclusive Offer:</span> Get 1 month premium FREE if you finish setup now!
              </p>

              <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="w-6 h-6 text-red-600" />
                  <p className="font-bold text-red-600">Limited Time Offer!</p>
                </div>
                <div className="text-4xl font-bold text-red-600 tabular-nums">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </div>
                <p className="text-sm text-gray-600 mt-2">Offer expires in</p>
              </div>

              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Track unlimited items and warranties</p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Priority customer support</p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Advanced analytics and insights</p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Automatic deal finding and alerts</p>
                </div>
              </div>

              <Button
                onClick={handleClaim}
                size="lg"
                className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all"
              >
                Claim My FREE Month Now! 🚀
              </Button>

              <p className="text-xs text-gray-500 mt-4">No credit card required</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
