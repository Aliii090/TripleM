import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ROWS = 12;
const COLS = ['A', 'B', 'C', '', 'D', 'E', 'F'];

export default function SeatMap({ onSelect, selectedSeat }) {
  const occupied = useMemo(() => {
    const set = new Set();
    for (let r = 1; r <= ROWS; r++) {
      for (const c of ['A', 'B', 'C', 'D', 'E', 'F']) {
        if (Math.random() > 0.6) set.add(`${r}${c}`);
      }
    }
    return set;
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Airplane nose */}
      <div className="flex justify-center mb-4">
        <div className="w-32 h-16 bg-gradient-to-b from-secondary/80 to-secondary/30 rounded-t-full border border-border/50 flex items-end justify-center pb-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Front</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-2 px-2">
        {COLS.map((col, i) => (
          <div key={i} className="text-center text-xs text-muted-foreground font-mono">
            {col}
          </div>
        ))}
      </div>

      {/* Seat rows */}
      <div className="space-y-1.5 px-2">
        {Array.from({ length: ROWS }, (_, row) => {
          const rowNum = row + 1;
          return (
            <div key={rowNum} className="grid grid-cols-7 gap-1.5 items-center">
              {COLS.map((col, colIdx) => {
                if (col === '') {
                  return (
                    <div key={colIdx} className="flex items-center justify-center">
                      <span className="text-xs text-muted-foreground/50 font-mono">{rowNum}</span>
                    </div>
                  );
                }
                const seatId = `${rowNum}${col}`;
                const isOccupied = occupied.has(seatId);
                const isSelected = selectedSeat === seatId;

                return (
                  <motion.button
                    key={seatId}
                    whileHover={!isOccupied ? { scale: 1.15 } : {}}
                    whileTap={!isOccupied ? { scale: 0.95 } : {}}
                    disabled={isOccupied}
                    onClick={() => onSelect(seatId)}
                    className={cn(
                      'w-full aspect-square rounded-md text-[10px] font-mono font-semibold transition-all',
                      isOccupied && 'bg-secondary/40 text-muted-foreground/30 cursor-not-allowed',
                      !isOccupied && !isSelected && 'bg-secondary hover:bg-accent/20 text-muted-foreground hover:text-foreground border border-border/50 cursor-pointer',
                      isSelected && 'bg-primary text-primary-foreground glow-primary border-primary'
                    )}
                  >
                    {isOccupied ? '×' : col}
                  </motion.button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary border border-border/50" />
          <span className="text-xs text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-xs text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary/40" />
          <span className="text-xs text-muted-foreground">Occupied</span>
        </div>
      </div>
    </div>
  );
}
