import Image from 'next/image';
import { Star } from 'lucide-react';

const portraits = [1, 2, 3] as const;

export function HeroSocialProof() {
  return (
    <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-black/[0.08] bg-black/[0.03] py-1.5 pl-1.5 pr-3.5 shadow-soft backdrop-blur-sm">
      <div className="flex shrink-0" aria-hidden="true">
        {portraits.map((portrait, index) => (
          <Image
            key={portrait}
            src={`/images/avatars/client-portrait-${portrait}.jpg`}
            alt=""
            width={40}
            height={40}
            className={`h-7 w-7 rounded-full border-2 border-white object-cover sm:h-[30px] sm:w-[30px] ${index ? '-ml-2' : ''}`}
          />
        ))}
      </div>
      <div className="min-w-0 text-left">
        <div className="flex gap-0.5 text-[#0FAC71]" aria-label="5 étoiles">
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
