import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { CalendlyWidget } from '@/components/public/CalendlyWidget';

export const metadata: Metadata = {
  title: 'Réserver un appel stratégique SEO & Web gratuit',
  description: 'Réservez 30 minutes de consultation gratuite avec Jean-Prosper MONE pour analyser votre visibilité SEO et votre projet web.',
  alternates: { canonical: '/reservation' },
};

export default function Page() {
  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-24 pb-16">
        <style dangerouslySetInnerHTML={{ __html: `
          /* --- ISOLATION TOTALE DU CSS RESERVATION --- */
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
          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            <div className="text-center mb-8 px-4">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black mb-3">
                Réservez votre appel stratégique <span className="text-[#ff4d00]">gratuit</span>
              </h1>
              <p className="text-sm md:text-base text-[#5c5c64] max-w-xl mx-auto leading-relaxed">
                30 minutes pour faire le point sur votre projet de site internet ou de référencement SEO : nous
                analysons votre situation actuelle et identifions ensemble les leviers prioritaires.
              </p>
            </div>
            <CalendlyWidget />
            <noscript>
              <p className="text-center text-sm text-[#5c5c64] mt-4">
                JavaScript est requis pour afficher l'agenda. Vous pouvez aussi réserver directement via{' '}
                <a href="https://calendly.com/webmodernseo/reunion" className="text-[#ff4d00] underline">
                  ce lien Calendly
                </a>.
              </p>
            </noscript>
          </div>
        </section>
      </main>

      <FooterPublic />
    </div>
  );
}
