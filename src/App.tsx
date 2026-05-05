import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Sparkles, MessageCircle, ArrowDown } from 'lucide-react';
import Confetti from './components/Confetti';
import Particles from './components/Particles';
import WishModal from './components/WishModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-luxury-rose/30">
      <Confetti />
      <Particles />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-luxury-pink/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square bg-luxury-rose/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="mb-8 relative"
          >
            {/* Image Placeholder / Upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full p-1 bg-gradient-to-tr from-luxury-gold via-luxury-rose to-luxury-pink glow-circle cursor-pointer group"
            >
              <div className="w-full h-full rounded-full bg-luxury-cream overflow-hidden flex items-center justify-center border-4 border-white">
                {image ? (
                  <img src={image} alt="Hanie" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex flex-col items-center text-luxury-rose/60 p-4">
                    <Sparkles size={32} className="mb-2" />
                    <span className="text-xs uppercase tracking-widest font-medium">Click to Add<br/>Her Photo</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*" 
              />
              
              {/* Decorative Floating Sparkles */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 text-luxury-gold"
              >
                <Sparkles size={24} />
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-4 tracking-tight">
            Happy Birthday <span className="text-luxury-rose font-semibold italic">Hanie</span> ❤️
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light tracking-wide max-w-lg mx-auto">
            To one of the sweetest souls I’ve ever known.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-luxury-rose/40 animate-bounce"
        >
          <ArrowDown size={32} strokeWidth={1.5} />
        </motion.div>
      </section>

      {/* Message Section */}
      <section className="relative py-24 md:py-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 border border-white/60 shadow-xl shadow-luxury-pink/20 relative"
        >
          <div className="absolute -top-10 -left-10 text-luxury-rose/10 pointer-events-none">
            <Heart size={160} fill="currentColor" />
          </div>

          <div className="relative space-y-8 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 leading-tight">
              Happy Birthday to someone truly special.
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
              <p>
                Your kindness, diligence, and beautiful heart make you stand out in ways words can barely describe. 
                You give so much of yourself to others, always showing care, strength, warmth, and dependability.
              </p>
              <p>
                Thank you for being such an amazing person and for bringing light into the lives of people around you.
              </p>
              <p className="font-medium text-gray-800">
                May this new year bring you happiness, peace, laughter, love, and every beautiful thing your heart deserves.
              </p>
              <p className="text-luxury-rose font-normal text-xl italic pt-4">
                Keep shining, Hanie. You are deeply appreciated more than you know.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Soft Romantic Touch */}
      <section className="py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="px-6"
        >
          <p className="handwritten text-4xl md:text-6xl text-luxury-rose mb-2">
            Some people become unforgettable
          </p>
          <p className="text-gray-400 uppercase tracking-[0.4em] text-xs font-medium ml-4">
            without even trying
          </p>
        </motion.div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-luxury-rose text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 font-medium transition-colors hover:bg-luxury-rose/90 group"
      >
        <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
        <span>Send Hanie a Wish</span>
      </motion.button>

      {/* Footer */}
      <footer className="py-12 border-t border-luxury-pink/30 text-center">
        <div className="flex flex-col items-center gap-2">
          <Heart size={20} className="text-luxury-rose fill-luxury-rose mb-2" />
          <p className="text-sm text-gray-400 font-light tracking-widest uppercase">
            Made with admiration and warm wishes ❤️
          </p>
        </div>
      </footer>

      <WishModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
