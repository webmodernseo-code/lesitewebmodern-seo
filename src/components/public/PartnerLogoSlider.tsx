import Image from 'next/image';

const PARTNERS = [
  { src: '/logo/meta.jpg', alt: 'Meta', width: 52, height: 38 },
  { src: '/logo/n8n.jpg', alt: 'n8n', width: 64, height: 38 },
  { src: '/logo/o2switch.jpeg', alt: 'o2switch', width: 50, height: 50 },
] as const;

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  const logos = PARTNERS.map((partner) => (
        <span
          key={partner.alt}
          className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
        >
          <Image
            src={partner.src}
            alt={duplicate ? '' : `${partner.alt} logo`}
            width={partner.width}
            height={partner.height}
            className="max-h-[50px] w-auto object-contain mix-blend-multiply"
          />
        </span>
  ));

  if (duplicate) {
    return (
      <div className="flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20" aria-hidden="true">
        {logos}
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center gap-16 pr-16 sm:gap-20 sm:pr-20">
      {logos}
    </div>
  );
}

export function PartnerLogoSlider() {
  return (
    <div className="mt-14 w-full sm:mt-16">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-charcoal/70">
        Technologies &amp; Partenaires clés
      </p>
      <div className="group mx-auto max-w-xl overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-[partnerLogos_25s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          <LogoGroup />
          <LogoGroup duplicate />
        </div>
      </div>
    </div>
  );
}
