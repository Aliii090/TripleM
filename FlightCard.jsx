import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, Users, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FlightCard({ flight, onSelect, index }) {
  const [viewers, setViewers] = useState(flight.viewers);

  // Simulate live viewer changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(3, Math.min(60, prev + change));
      });
    }, 3000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden hover:border-primary/20 transition-all group"
    >
      {flight.isBestPrice && (
        <div className="bg-gradient-to-r from-primary/20 to-amber-500/10 px-4 py-1.5 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary">Best Price Today</span>
        </div>
      )}

      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Route info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Departure */}
              <div className="text-center sm:text-left">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{flight.departure}</p>
                <p className="text-xs text-muted-foreground font-mono">{flight.origin.code}</p>
              </div>

              {/* Route line */}
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <div className="flex-1 h-px bg-border relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Plane className="w-4 h-4 text-primary -rotate-12" />
                  </div>
                </div>
              </div>

              {/* Arrival */}
              <div className="text-center sm:text-right">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{flight.arrival}</p>
                <p className="text-xs text-muted-foreground font-mono">{flight.destination.code}</p>
              </div>
            </div>

            {/* Details row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3">
              <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                {flight.flightNumber}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {flight.duration}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" />
                {flight.seatsRemaining} seats left
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400/80">
                <Eye className="w-3 h-3" />
                <span className="pulse-dot inline-block w-1 h-1 rounded-full bg-amber-400 mr-1" />
                {viewers} viewing
              </span>
            </div>
          </div>

          {/* Price and book */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 sm:gap-2 sm:ml-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/50">
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-black text-foreground">
                ${flight.price}
              </p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
            <Button
              onClick={() => onSelect(flight)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-semibold group-hover:glow-primary transition-all"
            >
              Select
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
