'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

// --- Types ---
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data en Français & adapté au branding WebModernSEO ---
const testimonials: Testimonial[] = [
  {
    text: "WebModernSEO a entièrement métamorphosé notre visibilité Google. Notre trafic SEO qualifié et notre chiffre d'affaires ont triplé en 4 mois.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Directrice des Opérations",
  },
  {
    text: "La refonte web et l'architecture SEO prédictive ont été livrées en temps record. Notre taux de conversion a bondi de +340%.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "Responsable Data & IT",
  },
  {
    text: "L'accompagnement stratégique et les automatisations IA de WebModernSEO sont exceptionnels. Une équipe d'experts dédiée et réactive.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Head of Customer Growth",
  },
  {
    text: "Grâce au reciblage intelligent et au ciblage B2B sur-mesure, notre coût d'acquisition client a chuté de 54%. Recommandé à 100% !",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "Fondateur & CEO",
  },
  {
    text: "Des tableaux de bord de télémétrie ultra-précis et des playbooks de croissance qui génèrent des leads qualifiés au quotidien.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Chef de Projet Digital",
  },
  {
    text: "Une approche data-driven qui dépasse toutes nos attentes. Nos processus de génération de leads sont désormais totalement automatisés.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Analyste Stratégie SaaS",
  },
  {
    text: "Notre positionnement SEO sur Google et la perception de notre marque ont été démultipliés dès les 60 premiers jours.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Directeur Marketing",
  },
  {
    text: "Leur squad d'experts a développé une stratégie d'acquisition sur-mesure qui a surpassé nos objectifs de ventes annuels.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "VP Sales Enterprise",
  },
  {
    text: "Grâce aux tunnels de conversion optimisés par WebModernSEO, notre plateforme e-commerce enregistre des records de ventes mensuels.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Responsable E-commerce",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 md:p-10 rounded-3xl border border-zinc-200/80 shadow-lg shadow-black/5 max-w-xs w-full bg-white backdrop-blur-md transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-orange-500/30" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-zinc-700 leading-relaxed font-normal text-sm md:text-base m-0 transition-colors duration-300">
                      &quot;{text}&quot;
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Photo de ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-500/20 group-hover:ring-orange-500/50 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-bold not-italic tracking-tight leading-5 text-zinc-900 transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-xs leading-5 tracking-tight text-zinc-500 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section 
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 relative overflow-hidden bg-transparent border-t border-b border-zinc-200/80 transition-colors duration-400 font-sans"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 1.0, 
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 }
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-16 text-center">
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center gap-2 border border-orange-500/30 py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-orange-600 bg-orange-500/10 transition-colors">
              <Quote className="w-3.5 h-3.5" />
              <span>Témoignages Clients</span>
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 text-center text-zinc-900 transition-colors">
            Ce que nos clients <span className="orange-gradient-text">disent</span>
          </h2>
          <p className="text-center mt-4 text-zinc-600 text-base leading-relaxed max-w-md transition-colors">
            Découvrez comment WebModernSEO propulse la croissance et les conversions des entreprises leaders.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Témoignages défilants"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;
