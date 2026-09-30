import React from 'react';
import { HeroSocialProof } from '@/components/public/HeroSocialProof';
import { PartnerLogoSlider } from '@/components/public/PartnerLogoSlider';

export function PartenairesPublic() {
  return (
    <section className="w-full bg-white py-12 sm:py-16 border-y border-black/[0.06] overflow-hidden" aria-label="Partenaires et avis clients">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Badge social proof */}
        <div className="mb-6">
          <HeroSocialProof />
        </div>

        {/* Slider des partenaires */}
        <div className="w-full max-w-4xl">
          <PartnerLogoSlider />
        </div>
      </div>
    </section>
  );
}

export default PartenairesPublic;
