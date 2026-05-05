import { motion } from 'motion/react';
import React, { useMemo } from 'react';

interface ParticleProps {
  delay: number;
}

const Particle: React.FC<ParticleProps> = ({ delay }) => {
  const size = useMemo(() => Math.random() * 4 + 2, []);
  const initialX = useMemo(() => Math.random() * 100, []);
  const initialY = useMemo(() => Math.random() * 100, []);
  
  return (
    <motion.div
      className="absolute bg-white/40 rounded-full blur-[1px] pointer-events-none"
      initial={{ 
        x: `${initialX}%`, 
        y: `${initialY}%`, 
        opacity: 0,
        scale: 0 
      }}
      animate={{ 
        y: [`${initialY}%`, `${initialY - 10}%`],
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5]
      }}
      transition={{ 
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      style={{
        width: size,
        height: size,
        boxShadow: '0 0 8px rgba(255,255,255,0.5)'
      }}
    />
  );
};

export default function Particles() {
  const particles = useMemo(() => Array.from({ length: 30 }), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <Particle key={i} delay={i * 0.2} />
      ))}
    </div>
  );
}
