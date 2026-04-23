import React from 'react';
import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Plane className="w-4 h-4 text-primary -rotate-45" />
            </div>
            <div>
              <span className="text-sm font-bold text-foreground">TRIPLE M FOR FLYING</span>
              <span className="text-xs text-muted-foreground block">× Jordanian Airlines</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            This is a fictional demo application. No real bookings or payments are processed.
          </p>
          <p className="text-xs text-muted-foreground">© 2026 Triple M for Flying</p>
        </div>
      </div>
    </footer>
  );
}
