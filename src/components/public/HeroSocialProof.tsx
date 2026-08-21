import Image from 'next/image';
import { Star } from 'lucide-react';

const portraits = [1, 2, 3] as const;

export function HeroSocialProof() {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-black/10 bg-white/90 py-2 pl-2 pr-4 shadow-soft backdrop-blur-sm">
      <div className="flex shrink-0" aria-hidden="true">
        {portraits.map((portrait, index) => (
          <Image
            key={portrait}
            src={`/images/avatars/client-portrait-${portrait}.jpg`}
            alt=""
            width={40}
            height={40}
            className={`h-9 w-9 rounded-full border-2 border-white object-cover sm:h-10 sm:w-10 ${index ? '-ml-2.5' : ''}`}
          />
        ))}
      </div>
      <div className="min-w-0 text-left">
        <div className="flex gap-0.5 text-brand-orange" aria-label="5 étoiles">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          ))}
        </div>
        <p className="mt-1 text-xs font-semibold leading-tight text-black sm:text-sm">
          Des clients satisfaits partout en France
        </p>
      </div>
    </div>
  );
}
