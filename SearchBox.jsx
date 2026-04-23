import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowRight, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations } from '@/lib/flightData';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const filtered = query.length > 0
    ? destinations.filter(d =>
        d.city.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase()) ||
        d.code.toLowerCase().includes(query.toLowerCase())
      )
    : destinations.slice(0, 6);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (dest) => {
    if (dest) {
      navigate(`/search?dest=${encodeURIComponent(dest.city)}`);
    } else if (query.trim()) {
      navigate(`/search?dest=${encodeURIComponent(query)}`);
    } else {
      navigate('/search');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filtered[selectedIndex]) {
        handleSearch(filtered[selectedIndex]);
      } else {
        handleSearch(null);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-2xl mx-auto px-4"
      ref={wrapperRef}
    >
      <div className="glass-strong rounded-2xl p-2 glow-primary">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Origin (fixed) */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-secondary/50 sm:w-44 shrink-0">
            <Plane className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">From</p>
              <p className="text-sm font-semibold text-foreground">Amman (AMM)</p>
            </div>
          </div>

          {/* Destination input */}
          <div className="relative flex-1">
            <div className="flex items-center gap-2 px-4 py-3">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">To</p>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                    setSelectedIndex(-1);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
              </div>
            </div>

            {/* Autocomplete dropdown */}
            <AnimatePresence>
              {showSuggestions && filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl overflow-hidden z-50 max-h-72 overflow-y-auto"
                >
                  {filtered.map((dest, i) => (
                    <button
                      key={dest.code}
                      onClick={() => handleSearch(dest)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                        i === selectedIndex ? 'bg-primary/10' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                          <span className="text-xs font-mono font-semibold text-primary">{dest.code}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{dest.city}</p>
                          <p className="text-xs text-muted-foreground">{dest.country}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">${dest.basePrice}+</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search button */}
          <Button
            onClick={() => handleSearch(null)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 h-auto font-semibold sm:w-auto"
          >
            <Search className="w-4 h-4 sm:mr-2" />
            <span className="sm:inline hidden">Search</span>
          </Button>
        </div>
      </div>

      {/* Quick destinations */}
      <div className="flex flex-wrap gap-2 justify-center mt-6">
        {['Dubai', 'London', 'Istanbul', 'Paris', 'Cairo'].map(city => (
          <button
            key={city}
            onClick={() => {
              const dest = destinations.find(d => d.city === city);
              if (dest) handleSearch(dest);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
          >
            <ArrowRight className="w-3 h-3" />
            {city}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
