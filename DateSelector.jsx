import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addDays, isSameDay, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

export default function DateSelector({ selectedDate, onSelect }) {
  const [startDate, setStartDate] = React.useState(new Date());
  const today = startOfDay(new Date());

  const days = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  const goBack = () => setStartDate(prev => {
    const newDate = addDays(prev, -7);
    return isBefore(newDate, today) ? today : newDate;
  });

  const goForward = () => setStartDate(prev => addDays(prev, 7));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={goBack} className="p-2 rounded-lg glass hover:bg-secondary transition-colors">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <span className="text-sm text-muted-foreground">
          {format(days[0], 'MMM yyyy')}
        </span>
        <button onClick={goForward} className="p-2 rounded-lg glass hover:bg-secondary transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          const isPast = isBefore(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const priceVariant = Math.floor(Math.random() * 3);

          return (
            <motion.button
              key={i}
              whileHover={!isPast ? { scale: 1.05 } : {}}
              whileTap={!isPast ? { scale: 0.95 } : {}}
              disabled={isPast}
              onClick={() => onSelect(day)}
              className={cn(
                'flex flex-col items-center p-2 sm:p-3 rounded-xl transition-all',
                isPast && 'opacity-30 cursor-not-allowed',
                !isPast && !isSelected && 'glass hover:border-primary/30 cursor-pointer',
                isSelected && 'bg-primary text-primary-foreground glow-primary'
              )}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-60">
                {format(day, 'EEE')}
              </span>
              <span className="text-lg font-bold mt-1">{format(day, 'd')}</span>
              {!isPast && (
                <span className={cn(
                  'text-[10px] mt-1',
                  isSelected ? 'text-primary-foreground/70' :
                  priceVariant === 0 ? 'text-emerald-400' :
                  priceVariant === 1 ? 'text-muted-foreground' :
                  'text-amber-400'
                )}>
                  {priceVariant === 0 ? 'Low' : priceVariant === 1 ? 'Med' : 'High'}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
