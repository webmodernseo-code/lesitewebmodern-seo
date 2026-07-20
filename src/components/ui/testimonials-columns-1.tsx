'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 rounded-3xl card-theme max-w-xs w-full hover:border-orange-500/50 transition-all font-sans"
                  key={i}
                >
                  <div className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{text}</div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-zinc-200 dark:border-zinc-800/60">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border border-orange-500/40"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold tracking-tight leading-5 text-zinc-900 dark:text-white text-sm">
                        {name}
                      </div>
                      <div className="leading-5 text-orange-600 dark:text-orange-400 text-xs font-semibold">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
