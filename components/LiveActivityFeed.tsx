import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { generateLiveActivity, LiveActivity } from '../utils/liveActivity';

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Add initial activity
    setActivities([generateLiveActivity()]);

    // Generate new activity every 8-15 seconds
    const interval = setInterval(() => {
      const newActivity = generateLiveActivity();
      setActivities(prev => [newActivity, ...prev].slice(0, 3));
    }, Math.random() * 7000 + 8000);

    return () => clearInterval(interval);
  }, []);

  if (!visible || activities.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <AnimatePresence mode="popLayout">
        {activities.slice(0, 1).map((activity) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            className="bg-white rounded-xl shadow-2xl p-4 mb-3 border-2 border-blue-100 backdrop-blur-sm"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
            <div className="flex items-start gap-3">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${activity.color}`}>
                  {activity.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">Just now</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
