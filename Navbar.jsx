import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isHome ? 'glass' : 'glass-strong'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-primary -rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-wide text-foreground">TRIPLE M</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground tracking-widest">FOR FLYING</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Flights</Link>
            <span className="text-sm text-muted-foreground/50 cursor-default">Deals</span>
            <span className="text-sm text-muted-foreground/50 cursor-default">About</span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              Partner: Jordanian Airlines
            </div>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className="block text-sm text-foreground py-2" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/search" className="block text-sm text-foreground py-2" onClick={() => setMenuOpen(false)}>Flights</Link>
              <div className="flex items-center gap-2 py-2 text-xs text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                Partner: Jordanian Airlines
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
