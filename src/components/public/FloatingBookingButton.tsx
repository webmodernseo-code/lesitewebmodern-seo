'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

export const FloatingBookingButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Révélation progressive après un léger défilement (120px) ou après 2 secondes
    const handleScroll = () => {
      if (window.scrollY > 120) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Prendre rendez-vous"
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 transition-all duration-500 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Halo lumineux discret au survol */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-orange to-[#0fac71] opacity-25 blur-md group-hover:opacity-40 transition duration-300 pointer-events-none" />

        {/* Bouton Capsule Flottant */}
        <button
          type="button"
          data-cal-namespace="30min"
          data-cal-link="jean-prosper-dsljpi/30min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
          className="relative flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gray-950 text-white border border-white/15 shadow-2xl hover:bg-black hover:border-white/25 active:scale-95 transition-all duration-200 cursor-pointer select-none"
        >
          {/* Indicateur de disponibilité verte animé */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0fac71] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0fac71]" />
          </span>

          {/* Icône Calendrier */}
          <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-brand-orange text-white shrink-0 shadow-sm">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </span>

          {/* Libellé typographie soignée (Apple / Stripe) */}
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight flex items-center gap-1.5">
              Prendre RDV
              <span className="hidden sm:inline-block text-[10px] font-semibold text-brand-orange bg-brand-orange/15 px-1.5 py-0.5 rounded border border-brand-orange/20">
                Offert
              </span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium hidden sm:inline leading-tight">
              30 min • Visioconférence
            </span>
          </div>
        </button>

        {/* Bouton de fermeture discret au survol */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm cursor-pointer"
          aria-label="Masquer le bouton flottant"
          title="Fermer"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};

export default FloatingBookingButton;
