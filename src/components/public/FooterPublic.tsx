'use client';

import { ChevronDown, Clock3, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

import { type FooterSection, getNextFooterSection } from './footer-accordion';

const linkClass = 'text-[0.95rem] text-[#5c5c64] transition hover:translate-x-1 hover:text-brand-orange';
const sectionClass = 'border-t border-black/10 py-1 md:border-0 md:py-0';

export function FooterPublic() {
  const [openSection, setOpenSection] = useState<FooterSection | null>(null);
  const toggle = (section: FooterSection) => setOpenSection((current) => getNextFooterSection(current, section));

  return (
    <footer className="mx-4 mb-5 mt-10 max-w-[1400px] rounded-3xl border border-black/[0.08] bg-[#faf6ee] px-5 pb-6 pt-8 text-[#5c5c64] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4),0_1px_3px_rgba(0,0,0,0.2)] md:mx-9 md:mb-10 md:mt-20 md:rounded-[32px] md:px-9 md:pb-8 md:pt-12 min-[1472px]:mx-auto">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 grid grid-cols-1 gap-0 md:mb-[60px] md:grid-cols-[2fr_1fr_1.2fr_1.3fr] md:gap-12">
          <div className="mb-8 flex flex-col gap-5 md:mb-0">
            <a href="/" className="inline-flex items-center gap-3" aria-label="Accueil">
              <svg width="28" height="28" viewBox="0 0 100 100" aria-hidden="true">
                <rect x="5" y="5" width="90" height="90" rx="22" fill="#ff4d00" />
                <polygon points="20,28 42,28 42,76 25,76 21,58 27,58" fill="#fff" />
                <polygon points="58,28 80,28 70,76 58,76" fill="#fff" />
                <polygon points="41,66 59,66 50,46" fill="#fff" />
              </svg>
              <span className="text-[1.4rem] font-extrabold tracking-[-0.03em] text-black">webmodern<span className="text-brand-orange">seo</span></span>
            </a>
            <p className="max-w-xs text-[0.95rem] leading-relaxed">Création de sites internet modernes (Next.js) et sur-mesure, optimisés pour le référencement (SEO) et automatisés pour générer des leads. Basés à Grenoble, intervention à Paris, Lyon, Saint-Étienne et à distance partout en France.</p>
            <div className="mt-2 flex gap-3">
              <SocialLink href="https://www.facebook.com/webmodernseo" label="Facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></SocialLink>
              <SocialLink href="https://www.instagram.com/webmodernseo" label="Instagram"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></SocialLink>
              <SocialLink href="https://www.tiktok.com/@webmodernseo" label="TikTok"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></SocialLink>
            </div>
          </div>

          <FooterColumn id="footer-services" title="Nos Services" open={openSection === 'services'} onToggle={() => toggle('services')} ariaExpanded={openSection === 'services'}>
            <FooterLink href="/services/creation-web">Création Web</FooterLink>
            <FooterLink href="/services/referencement-seo">Référencement SEO</FooterLink>
            <FooterLink href="/services/acquisition-clients">Acquisition Clients</FooterLink>
            <FooterLink href="/services/creation-web#maintenance-securite">Maintenance de site</FooterLink>
          </FooterColumn>
          <FooterColumn id="footer-navigation" title="Navigation" open={openSection === 'navigation'} onToggle={() => toggle('navigation')} ariaExpanded={openSection === 'navigation'}>
            <FooterLink href="/">Accueil</FooterLink><FooterLink href="/apropos">À propos</FooterLink><FooterLink href="/portfolio">Portfolio</FooterLink><FooterLink href="/blog">Blog</FooterLink>
          </FooterColumn>
          <FooterColumn id="footer-contact" title="Contact" open={openSection === 'contact'} onToggle={() => toggle('contact')} ariaExpanded={openSection === 'contact'}>
            <div className="flex items-start gap-3"><Phone className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-orange" /><a className={linkClass} href="tel:+33753887751">+33 7 53 88 77 51</a></div>
            <div className="flex items-start gap-3"><Mail className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-orange" /><a className={linkClass} href="mailto:contact@webmodernseo.co">contact@webmodernseo.co</a></div>
            <div className="flex items-start gap-3 text-[0.95rem]"><Clock3 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-orange" /><span>Lundi - Vendredi<br />09h00 - 18h00</span></div>
          </FooterColumn>
        </div>

        <div className="flex flex-col items-start gap-4 border-t border-black/10 pt-6 text-[0.88rem] md:flex-row md:items-center md:justify-between md:gap-5 md:pt-8">
          <p>© 2026 Webmodernseo. Tous droits réservés.</p>
          <nav className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-6" aria-label="Liens légaux">
            <a className="transition hover:text-brand-orange" href="/politique/mentions-legales">Mentions légales</a>
            <a className="transition hover:text-brand-orange" href="/politique/conditions-d-utilisation">Conditions d'utilisation</a>
            <a className="transition hover:text-brand-orange" href="/politique/gestion-des-cookies">Gestion des cookies</a>
            <a className="transition hover:text-brand-orange" href="/politique/politique-de-confidentialite">Politique de confidentialité</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ id, title, open, onToggle, ariaExpanded, children }: { id: string; title: string; open: boolean; onToggle: () => void; ariaExpanded: boolean; children: React.ReactNode }) {
  return (
    <section className={sectionClass}>
      <h2 className="hidden text-base font-bold uppercase tracking-[1.5px] text-black md:block">{title}</h2>
      <button type="button" className="flex min-h-12 w-full items-center justify-between py-3 text-left text-base font-bold uppercase tracking-[1.5px] text-black md:hidden" aria-expanded={ariaExpanded} aria-controls={id} onClick={onToggle}>
        {title}<ChevronDown className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div id={id} className={`${open ? 'flex' : 'hidden'} flex-col gap-3.5 pb-4 md:mt-6 md:flex md:pb-0`}>{children}</div>
    </section>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className={linkClass} href={href}>{children}</a>;
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-black/[0.08] transition hover:-translate-y-0.5 hover:border-brand-orange hover:bg-brand-orange hover:text-white"><svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg></a>;
}
