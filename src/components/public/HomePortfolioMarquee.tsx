import Image from 'next/image';

const PROJECTS = [
  {
    src: '/images/portfolio/Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png',
    alt: 'Aperçu du site du centre optique Emy Paul',
  },
  {
    src: '/images/portfolio/Capture-decran-2026-04-14-120331.png',
    alt: 'Aperçu d’une réalisation web Webmodernseo',
  },
  {
    src: '/images/portfolio/Capture-decran-2026-04-14-120629.png',
    alt: 'Aperçu d’un site client réalisé par Webmodernseo',
  },
  {
    src: '/images/portfolio/Capture-decran-2026-06-16-163553.png',
    alt: 'Aperçu récent d’une réalisation digitale Webmodernseo',
  },
  {
    src: '/images/portfolio/FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png',
    alt: 'Aperçu du portail EPBOMI Europe',
  },
  {
    src: '/images/portfolio/he75ojuxofe.jpg',
    alt: 'Aperçu du site Opticafé',
  },
  {
    src: '/images/portfolio/Sinaihappycare-sinaihappycare.com_.png',
    alt: 'Aperçu du site Sinai Happy Care',
  },
] as const;

function ProjectGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-5 pr-5" aria-hidden={duplicate ? 'true' : undefined}>
      {PROJECTS.map((project) => (
        <div
          key={`${duplicate ? 'duplicate-' : ''}${project.src}`}
          className="relative aspect-[16/10] w-[280px] shrink-0 rotate-2 overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-card sm:w-[380px] lg:w-[460px]"
        >
          <Image
            src={project.src}
            alt={duplicate ? '' : project.alt}
            fill
            sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
            className="object-cover object-top"
          />
        </div>
      ))}
    </div>
  );
}

export function HomePortfolioMarquee() {
  return (
    <section className="w-full overflow-hidden bg-white py-12 sm:py-16" aria-label="Aperçu de nos réalisations">
      <div
        className="home-portfolio-viewport -mx-8 -rotate-2 overflow-hidden py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-4"
        tabIndex={0}
        aria-label="Portfolio défilant, mettre au point pour suspendre l’animation"
      >
        <div className="home-portfolio-track flex w-max will-change-transform">
          <ProjectGroup />
          <ProjectGroup duplicate />
        </div>
      </div>
    </section>
  );
}
