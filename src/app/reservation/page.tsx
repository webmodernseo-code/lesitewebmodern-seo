import type { Metadata } from 'next';
import { HeaderPublic } from '@/components/public/HeaderPublic';
import { FooterPublic } from '@/components/public/FooterPublic';
import { CalBookingWidget } from '@/components/public/CalWidget';
import { ShieldCheck, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Réserver un appel stratégique SEO & Web gratuit (30 min)',
  description:
    'Réservez 30 minutes de consultation gratuite avec notre agence pour analyser votre visibilité SEO et votre projet web.',
  alternates: { canonical: '/reservation' },
};

export default function ReservationPage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      <HeaderPublic />

      <main className="w-full pt-28 sm:pt-36 pb-20">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* En-tête de la page de réservation */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-gray-50/80 shadow-2xs mb-4">
              <Calendar className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-xs font-semibold text-gray-800 tracking-wide">
                ✦ Consultation Offerte • 30 Minutes
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
              Réservez votre appel stratégique <span className="text-brand-orange">offert</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              Choisissez le créneau qui vous arrange dans notre agenda en direct. Nous analysons ensemble
              vos enjeux web, votre positionnement sur Google et vos opportunités de croissance.
            </p>

            {/* Puces de réassurance discrètes */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0fac71]" />
                Durée : 30 minutes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0fac71]" />
                Visioconférence Google Meet
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0fac71]" />
                100% sans engagement
              </span>
            </div>
          </div>

          {/* Intégration Cal.com en ligne */}
          <div className="w-full">
            <CalBookingWidget
              namespace="30min"
              calLink="jean-prosper-dsljpi/30min"
            />

            <noscript>
              <p className="text-center text-sm text-gray-500 mt-6">
                JavaScript est requis pour afficher l&apos;agenda interactif. Vous pouvez réserver
                directement via{' '}
                <a
                  href="https://cal.com/jean-prosper-dsljpi/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-orange underline font-semibold"
                >
                  ce lien Cal.com direct
                </a>
                .
              </p>
            </noscript>
          </div>
        </section>
      </main>

      <FooterPublic />
    </div>
  );
}
