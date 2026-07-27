import React from 'react';
import Image from 'next/image';

interface PortfolioShowcaseProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ title, imageSrc, imageAlt }) => {
  return (
    <section className="w-full bg-gradient-to-br from-brand-orange to-brand-charcoal">
      <div className="mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <h2 className="mb-14 font-display text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <div className="mx-auto max-w-3xl">
          {/* Écran du laptop */}
          <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl border-[10px] border-black bg-black shadow-2xl sm:border-[14px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          {/* Charnière */}
          <div className="mx-auto h-2 w-full rounded-b-sm bg-zinc-800" />

          {/* Socle */}
          <div className="relative mx-auto -mt-px h-4 w-[92%] rounded-b-2xl bg-gradient-to-b from-zinc-300 to-zinc-400 shadow-xl sm:h-5">
            <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-zinc-500/60" />
          </div>
        </div>
      </div>
    </section>
  );
};
