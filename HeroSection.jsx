import React from 'react';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative pt-20 sm:pt-32 pb-8 sm:pb-16 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
            Powered by Jordanian Airlines Network
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight text-foreground mb-4 sm:mb-6">
            <span className="block">Fly Beyond</span>
            <span className="block bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent">
              Boundaries
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 font-light px-4">
            From Amman to the world. Premium flights at unbeatable prices with
            <span className="text-foreground font-medium"> Triple M for Flying</span>.
          </p>

          {/* Animated airplane */}
          <motion.div
            className="flex justify-center mb-8"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <div className="relative">
              <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-primary/40 -rotate-12" />
              <div className="absolute top-1/2 right-full w-20 sm:w-32 h-px bg-gradient-to-l from-primary/30 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
