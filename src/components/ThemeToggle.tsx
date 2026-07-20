'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm ${
        isDark
          ? 'bg-zinc-900/90 text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:bg-zinc-800/90 hover:shadow-amber-500/20'
          : 'bg-white/90 text-amber-600 border border-orange-200 hover:border-orange-400 hover:bg-amber-50/90 hover:shadow-orange-500/15'
      } backdrop-blur-md ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-amber-300 fill-amber-300/20" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        )}
      </motion.div>
      <span className="hidden sm:inline font-medium">
        {isDark ? 'Mode Sombre' : 'Mode Clair'}
      </span>
    </button>
  );
}
