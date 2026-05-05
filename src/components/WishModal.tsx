import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import React, { useState } from 'react';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishModal({ isOpen, onClose }: WishModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-luxury-pink"
          >
            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-luxury-rose transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {!submitted ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-gray-800 mb-2">Send Hanie a Wish</h3>
                    <p className="text-sm text-gray-500">Leave a beautiful message for a beautiful soul.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-400 font-medium mb-1.5 ml-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 bg-luxury-cream/50 border border-luxury-pink rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-rose/30 transition-all"
                        placeholder="e.g. Someone who appreciates you"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-400 font-medium mb-1.5 ml-1">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-luxury-cream/50 border border-luxury-pink rounded-xl focus:outline-none focus:ring-2 focus:ring-luxury-rose/30 transition-all resize-none"
                        placeholder="Write something heartfelt..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 bg-luxury-rose text-white rounded-xl font-medium shadow-lg shadow-luxury-rose/20 hover:bg-luxury-rose/90 transition-all active:scale-[0.98]"
                    >
                      Send Wish ❤️
                    </button>
                  </form>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-luxury-pink p-4 rounded-full">
                      <Heart className="text-luxury-rose fill-luxury-rose animate-pulse" size={32} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-500 italic">Your wish has been sent to Hanie.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
