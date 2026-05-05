import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, Sparkles, MessageCircle, ArrowDown } from 'lucide-react';
import Confetti from './components/Confetti';
import Particles from './components/Particles';
import WishModal from './components/WishModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load saved image on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('hanie_birthday_photo');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

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
        const base64String = reader.result as string;
        setImage(base64String);
        localStorage.setItem('hanie_birthday_photo', base64String);
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
              y: [0, -12, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="mb-10 relative"
          >
            {/* Image Placeholder / Upload */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-56 h-56 md:w-64 md:h-64 mx-auto cursor-pointer group"
            >
              {/* Decorative rings */}
              <div className="absolute inset-[-8px] rounded-full border border-luxury-rose/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-[-15px] rounded-full border border-luxury-gold/10 animate-[spin_15s_linear_infinite_reverse]" />
              
              <div className="w-full h-full rounded-full bg-white shadow-2xl p-2 relative z-10 overflow-hidden transform transition-transform duration-500 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-luxury-cream/50 overflow-hidden flex items-center justify-center border-4 border-luxury-pink/30 relative">
                  {image ? (
                    <img src={image} alt="Hanie" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  ) : (
                    <div className="flex flex-col items-center text-luxury-rose/40 px-6 text-center">
                      <div className="bg-luxury-pink/30 p-5 rounded-full mb-3 group-hover:scale-110 transition-transform duration-500">
                        <Heart size={48} className="fill-luxury-rose/10" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.3em] font-serif font-black text-luxury-rose/60">Click to place<br/>Hanie's Photo</span>
                    </div>
                  )}
                  
                  {/* Inner Glow/Shadow overlay */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(229,168,168,0.3)] pointer-events-none" />
                </div>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                className="hidden" 
                accept="image/*" 
              />
              
              {/* Floating Embellishments */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1], 
                  opacity: [0.5, 0.8, 0.5],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-2 text-luxury-gold z-20"
              >
                <Sparkles size={32} />
              </motion.div>
              
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [0, 15, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute bottom-2 -left-6 text-luxury-rose z-20"
              >
                <Heart size={24} fill="currentColor" />
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
