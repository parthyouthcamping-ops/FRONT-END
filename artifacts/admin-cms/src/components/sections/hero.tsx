import React from 'react';
import { HeroData } from '@/lib/cms-types';
import { motion } from 'framer-motion';

export function Hero({ data }: { data: HeroData }) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img 
            src={data.backgroundImage} 
            alt={data.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
      )}
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6"
        >
          {data.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-medium text-gray-300 max-w-2xl mx-auto mb-10"
        >
          {data.subtitle}
        </motion.p>
        
        {data.ctaText && (
          <motion.a
            href={data.ctaLink}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block bg-primary text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-primary/30"
          >
            {data.ctaText}
          </motion.a>
        )}
      </div>
    </section>
  );
}
