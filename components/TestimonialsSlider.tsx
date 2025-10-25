import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../utils/liveActivity';

export function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[current];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">What Our Users Say</h3>
        <div className="flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{testimonial.avatar}</div>
          <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
          <p className="font-bold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
          <div className="mt-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            Saved {testimonial.saved}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white hover:bg-gray-100 shadow-md transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full bg-white hover:bg-gray-100 shadow-md transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-blue-600 w-6' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
