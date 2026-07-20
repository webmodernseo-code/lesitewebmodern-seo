'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LiquidMetalButtonProps {
  label?: string;
  onClick?: () => void;
  viewMode?: 'text' | 'icon';
}

export function LiquidMetalButton({
  label = 'Démarrer',
  onClick,
  viewMode = 'text',
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      type="button"
      className={`relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl overflow-hidden font-sans cursor-pointer ${
        isPressed ? 'scale-95' : isHovered ? 'scale-105 shadow-orange-500/30' : 'scale-100 shadow-orange-500/15'
      } bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 text-white border border-orange-500/40 hover:border-orange-400`}
    >
      {/* Background Animated Gradient Glow */}
      <span className="absolute inset-0 bg-gradient-to-r from-orange-600/30 via-amber-500/20 to-orange-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

      {/* Button Shine effect */}
      <span className="absolute -left-16 top-0 h-full w-12 bg-white/20 skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-64 pointer-events-none" />

      <span className="relative z-10 flex items-center gap-2 text-white font-extrabold">
        {viewMode === 'icon' ? (
          <Sparkles className="w-4 h-4 text-orange-400" />
        ) : (
          <>
            <span>{label}</span>
            <div className="w-5 h-5 rounded-full bg-orange-500 text-black flex items-center justify-center font-black">
              <ArrowRight className="w-3 h-3 text-black stroke-[3]" />
            </div>
          </>
        )}
      </span>
    </button>
  );
}
