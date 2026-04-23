import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { partnerCountries } from '@/lib/flightData';

export default function PartnerNetwork() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-4">
            <Globe className="w-3.5 h-3.5 text-accent" />
            Global Reach
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-3">
            Jordanian Airlines Partner Network
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
            Connecting Amman to the world's most exciting destinations through our trusted airline partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {partnerCountries.map((country, i) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl p-4 text-center hover:border-primary/30 transition-all group cursor-default"
            >
              <span className="text-2xl sm:text-3xl block mb-2 group-hover:scale-110 transition-transform">
                {country.flag}
              </span>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors truncate">
                {country.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
