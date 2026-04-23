import React from 'react';
import { motion } from 'framer-motion';
import { Plane, QrCode } from 'lucide-react';
import { format } from 'date-fns';

export default function BoardingPassCard({ booking }) {
  const { flight, date, seat, passenger } = booking;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="glass-strong rounded-2xl overflow-hidden glow-primary">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-amber-500/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Plane className="w-5 h-5 text-primary -rotate-45" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">TRIPLE M FOR FLYING</p>
              <p className="text-[10px] text-muted-foreground">× Jordanian Airlines</p>
            </div>
          </div>
          <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full">
            {flight.flightNumber}
          </span>
        </div>

        {/* Main content */}
        <div className="px-6 py-6">
          {/* Route */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-3xl font-black text-foreground">{flight.origin.code}</p>
              <p className="text-xs text-muted-foreground mt-1">{flight.origin.city}</p>
            </div>
            <div className="flex-1 flex items-center mx-4">
              <div className="flex-1 h-px bg-border" />
              <div className="mx-3">
                <Plane className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-foreground">{flight.destination.code}</p>
              <p className="text-xs text-muted-foreground mt-1">{flight.destination.city}</p>
            </div>
          </div>

          {/* Tear line */}
          <div className="relative my-6">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-background" />
            <div className="border-t-2 border-dashed border-border/50" />
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Passenger</p>
              <p className="text-sm font-semibold text-foreground mt-1">{passenger}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Date</p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {format(new Date(date), 'dd MMM yyyy')}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Seat</p>
              <p className="text-sm font-semibold text-primary mt-1">{seat}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Gate</p>
              <p className="text-sm font-semibold text-foreground mt-1">
                {String.fromCharCode(65 + Math.floor(Math.random() * 8))}{Math.floor(Math.random() * 20) + 1}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Departure</p>
              <p className="text-sm font-semibold text-foreground mt-1">{flight.departure}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Arrival</p>
              <p className="text-sm font-semibold text-foreground mt-1">{flight.arrival}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Duration</p>
              <p className="text-sm font-semibold text-foreground mt-1">{flight.duration}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Class</p>
              <p className="text-sm font-semibold text-foreground mt-1">Economy</p>
            </div>
          </div>

          {/* QR Code placeholder */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/30">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-foreground/90 flex items-center justify-center">
              <QrCode className="w-10 h-10 sm:w-14 sm:h-14 text-background" />
            </div>
            <div className="text-right">
              <p className="text-2xl sm:text-3xl font-black text-primary">${flight.price}</p>
              <p className="text-[10px] text-muted-foreground">BOARDING PASS</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
