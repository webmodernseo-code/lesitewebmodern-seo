'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Bubble {
  x: number;
  y: number;
  currentOpacity: number;
  opacitySpeed: number;
}

const BUBBLE_SPACING = 24;
const BASE_RADIUS = 1.2;
const INTERACTION_RADIUS = 150;
const OPACITY_MIN = 0.08;
const OPACITY_MAX = 0.18;

export function BubbleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const frameRef = useRef<number | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  const createBubbles = useCallback(() => {
    const { width, height } = sizeRef.current;
    const bubbles: Bubble[] = [];

    for (let x = BUBBLE_SPACING / 2; x < width; x += BUBBLE_SPACING) {
      for (let y = BUBBLE_SPACING / 2; y < height; y += BUBBLE_SPACING) {
        const opacity = Math.random() * (OPACITY_MAX - OPACITY_MIN) + OPACITY_MIN;
        bubbles.push({
          x,
          y,
          currentOpacity: opacity,
          opacitySpeed: Math.random() * 0.004 + 0.0015,
        });
      }
    }

    bubblesRef.current = bubbles;
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const width = parent.clientWidth;
    const height = parent.clientHeight;

    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.getContext('2d')?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    sizeRef.current = { width, height };
    createBubbles();
  }, [createBubbles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const draw = () => {
      const { width, height } = sizeRef.current;
      context.clearRect(0, 0, width, height);

      for (const bubble of bubblesRef.current) {
        if (!reducedMotion) {
          bubble.currentOpacity += bubble.opacitySpeed;
          if (bubble.currentOpacity >= OPACITY_MAX || bubble.currentOpacity <= OPACITY_MIN) {
            bubble.opacitySpeed *= -1;
          }
        }

        let interaction = 0;
        const { x: mouseX, y: mouseY } = mouseRef.current;

        if (!reducedMotion && mouseX !== null && mouseY !== null) {
          const distance = Math.hypot(bubble.x - mouseX, bubble.y - mouseY);
          if (distance < INTERACTION_RADIUS) {
            interaction = Math.pow(1 - distance / INTERACTION_RADIUS, 2);
          }
        }

        context.beginPath();
        context.fillStyle = `rgba(10, 10, 10, ${Math.min(0.65, bubble.currentOpacity + interaction * 0.4)})`;
        context.arc(bubble.x, bubble.y, BASE_RADIUS + interaction * 1.8, 0, Math.PI * 2);
        context.fill();
      }

      if (!reducedMotion) {
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    if (!reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [resize]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(255,255,255,0.92)_98%)]" />
    </div>
  );
}

export function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [reducedMotion, words.length]);

  return (
    <span className="relative inline-flex min-h-[1.15em] max-w-full overflow-hidden align-bottom text-brand-orange">
      <motion.span
        key={words[index]}
        initial={reducedMotion ? false : { y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        className="inline-block max-w-full whitespace-normal sm:whitespace-nowrap"
      >
        {words[index]}
      </motion.span>
    </span>
  );
}
