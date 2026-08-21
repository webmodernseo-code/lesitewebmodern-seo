import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home portfolio marquee uses all captures with a tilted accessible loop', async () => {
  const source = await readFile(new URL('../src/components/public/HomePortfolioMarquee.tsx', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const images = [
    'Accueil-emypaul.opticafe.fr-emypaul.opticafe.fr_.png',
    'Capture-decran-2026-04-14-120331.png',
    'Capture-decran-2026-04-14-120629.png',
    'Capture-decran-2026-06-16-163553.png',
    'FireShot-Capture-008-Accueil-Epbomi-Europe-epbomi-europe.org-1.png',
    'he75ojuxofe.jpg',
    'Sinaihappycare-sinaihappycare.com_.png',
  ];

  for (const image of images) assert.match(source, new RegExp(image.replaceAll('.', '\\.')));
  assert.match(source, /-rotate-2/);
  assert.match(source, /rotate-2/);
  assert.match(source, /aria-hidden=\{duplicate \? 'true' : undefined\}/);
  assert.match(source, /<ProjectGroup duplicate \/>/);
  assert.match(source, /tabIndex=\{0\}/);
  assert.doesNotMatch(source, /portfolio-filter|project-tag|Visiter le site/);
  assert.match(css, /@keyframes homePortfolioMarquee/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(source, /py-6 sm:py-8/);
  assert.match(source, /py-5 sm:py-6/);
  assert.doesNotMatch(source, /py-12 sm:py-16|py-9/);
});
