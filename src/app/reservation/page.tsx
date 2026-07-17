import React from 'react';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { CalendlyWidget } from '@/components/public/CalendlyWidget';

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION TOTALE DU CSS RESERVATION POUR WORDPRESS --- */
          .wm-booking-section {
            background: linear-gradient(180deg, #fdfbf7 0%, #faf6ee 100%);
            padding: 40px 16px;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            border-top: 1px solid rgba(15, 15, 17, 0.08);
            border-bottom: 1px solid rgba(15, 15, 17, 0.08);
          }

          .wm-booking-section::before {
            content: '';
            position: absolute;
            top: -10%;
            right: -10%;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(224, 83, 0, 0.04) 0%, transparent 65%);
            filter: blur(80px);
            pointer-events: none;
            z-index: 0;
          }

          .wm-booking-section::after {
            content: '';
            position: absolute;
            bottom: -10%;
            left: -10%;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(15, 172, 113, 0.03) 0%, transparent 65%);
            filter: blur(80px);
            pointer-events: none;
            z-index: 0;
          }

          @media (max-width: 768px) {
            .wm-booking-section {
              padding: 20px 12px;
            }
          }
        ` }} />

        <section className="wm-booking-section" id="reservation-calendly">
          <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
            <CalendlyWidget />
          </div>
        </section>
      </main>

      <FooterPublic />
    </div>
  );
}
