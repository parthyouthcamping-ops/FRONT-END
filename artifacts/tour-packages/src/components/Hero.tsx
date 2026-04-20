import { motion } from "framer-motion";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
}

export function Hero({ title, subtitle, image, ctaText = "Explore Experiences" }: HeroProps) {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with cinematic scale */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img src={image} className="w-full h-full object-cover" alt="Hero Background" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/80 font-bold uppercase tracking-[0.3em] text-xs mb-6"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-5xl md:text-8xl font-serif text-white leading-[1.1] mb-10"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <button className="gold-button mx-auto group">
            {ctaText}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />
    </section>
  );
}
