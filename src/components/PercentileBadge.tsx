import { motion } from 'motion/react';
import { Trophy, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PercentileBadgeProps {
  percentile: number;
  totalPoints: number;
}

export function PercentileBadge({ percentile, totalPoints }: PercentileBadgeProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.8 }}
      className="fixed top-24 right-6 z-40 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl shadow-2xl p-4 max-w-xs"
    >
      <button
        onClick={() => setShow(false)}
        className="absolute top-2 right-2 text-white/80 hover:text-white text-sm"
      >
        ✕
      </button>
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8" />
        <div>
          <p className="font-bold text-lg">You're Crushing It! 🎉</p>
          <p className="text-sm opacity-90">
            Ahead of {percentile}% of households—keep going!
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold">{totalPoints} points</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
