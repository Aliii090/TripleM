import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { destinations, generateFlightPrice } from '@/lib/flightData';

const recommended = destinations.slice(0, 6);

export default function RecommendedFlights() {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8 sm:mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              Trending Now
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Popular from Amman</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommended.map((dest, i) => {
            const price = generateFlightPrice(dest.basePrice);
            return (
              <motion.button
                key={dest.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(`/search?dest=${encodeURIComponent(dest.city)}`)}
                className="group relative rounded-2xl overflow-hidden h-48 sm:h-56 text-left"
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">{dest.city}</p>
                      <p className="text-white/60 text-xs">{dest.country} · {dest.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-black text-xl">${price}</p>
                      <div className="flex items-center gap-1 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Book now</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
