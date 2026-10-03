'use client';

import React, { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

export interface CalBookingWidgetProps {
  namespace?: string;
  calLink?: string;
  theme?: 'light' | 'dark' | 'auto';
  className?: string;
}

export const CalBookingWidget: React.FC<CalBookingWidgetProps> = ({
  namespace = '30min',
  calLink = 'jean-prosper-dsljpi/30min',
  theme = 'light',
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace });
        cal('ui', {
          theme,
          cssVarsPerTheme: {
            dark: { 'cal-brand': '#c8724a' },
            light: { 'cal-brand': '#ff4d00' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        setIsLoaded(true);
      } catch (err) {
        console.error('Erreur chargement Cal.com API:', err);
        setIsLoaded(true);
      }
    })();
  }, [namespace, theme]);

  return (
    <div
      className={`relative w-full max-w-[1000px] mx-auto rounded-3xl bg-white border border-gray-200/90 shadow-xl overflow-hidden min-h-[660px] sm:min-h-[700px] flex flex-col justify-center ${className}`}
    >
      {/* Placeholder / Indicateur de chargement élégant */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white gap-4 pointer-events-none transition-opacity duration-300">
          <div className="w-10 h-10 border-3 border-orange-100 border-t-brand-orange rounded-full animate-spin" />
          <p className="text-xs font-semibold text-gray-500 animate-pulse">
            Chargement de l&apos;agenda sécurisé Cal.com...
          </p>
        </div>
      )}

      {/* Intégration officielle du calendrier Cal.com */}
      <Cal
        namespace={namespace}
        calLink={calLink}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '660px',
          overflow: 'auto',
        }}
        config={{
          layout: 'month_view',
          useSlotsViewOnSmallScreen: 'true',
          theme,
        }}
      />
    </div>
  );
};

export default CalBookingWidget;
