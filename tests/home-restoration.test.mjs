import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('home no longer composes the orange portfolio showcase', async () => {
  const source = await readFile('src/app/page.tsx', 'utf8');
  assert.doesNotMatch(source, /PortfolioShowcase|portfolio-showcase/);
  assert.match(source, /import \{ HomePortfolioMarquee \}/);
  const hero = source.indexOf('<HeroPublic />');
  const portfolio = source.indexOf('<HomePortfolioMarquee />');
  const services = source.indexOf('<ServicesPublic />');
  assert.ok(hero >= 0 && portfolio > hero && services > portfolio);
});

test('partner slider contains the historical logos and accessible duplicate group', async () => {
  const source = await readFile('src/components/public/PartnerLogoSlider.tsx', 'utf8');
  for (const asset of ['/logo/meta.jpg', '/logo/n8n.jpg', '/logo/o2switch.jpeg']) {
    assert.match(source, new RegExp(asset.replaceAll('/', '\\/')));
  }
  assert.match(source, /Technologies &amp; Partenaires clés/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /motion-reduce:animate-none/);
  assert.match(source, /group-hover:\[animation-play-state:paused\]/);
});

test('hero composes the partner slider after the social proof', async () => {
  const source = await readFile('src/components/public/HeroPublic.tsx', 'utf8');
  assert.match(source, /<HeroSocialProof\s*\/>[\s\S]*<PartnerLogoSlider\s*\/>/);
});
