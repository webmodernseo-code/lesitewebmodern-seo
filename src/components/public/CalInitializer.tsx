'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';

export function CalInitializer() {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: '30min' });
        cal('ui', {
          theme: 'light',
          cssVarsPerTheme: {
            dark: { 'cal-brand': '#c8724a' },
            light: { 'cal-brand': '#ff4d00' },
          },
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
      } catch (err) {
        console.error('Erreur initialisation Cal.com globale:', err);
      }
    })();
  }, []);

  return null;
}
