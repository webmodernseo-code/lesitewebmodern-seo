import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('hero uses compact spacing and the verified social proof', async () => {
  const hero = await readFile(new URL('../src/components/public/HeroPublic.tsx', import.meta.url), 'utf8');
  const proof = await readFile(new URL('../src/components/public/HeroSocialProof.tsx', import.meta.url), 'utf8');
  const sources = await readFile(new URL('../public/images/avatars/SOURCES.md', import.meta.url), 'utf8');

  assert.doesNotMatch(hero, /HERO_PROOF_STAT|1 482 leads/);
  assert.match(hero, /pt-12 pb-24/);
  assert.match(hero, /sm:pt-16 sm:pb-32/);
  assert.match(hero, /<HeroSocialProof \/>/);
  assert.match(proof, /Des clients satisfaits partout en France/);
  assert.match(proof, /const portraits = \[1, 2, 3\] as const/);
  assert.match(proof, /client-portrait-\$\{portrait\}\.jpg/);
  assert.match(proof, /import \{ Star \} from 'lucide-react'/);
  assert.match(proof, /Array\.from\(\{ length: 5 \}/);
  assert.match(hero, /rounded-full border border-black\/\[0\.08\] bg-black\/\[0\.03\]/);
  assert.match(hero, /text-\[#0FAC71\]/);
  assert.match(proof, /h-7 w-7/);
  assert.match(proof, /sm:h-\[30px\] sm:w-\[30px\]/);
  assert.match(proof, /text-\[#0FAC71\]/);
  assert.doesNotMatch(proof, /text-brand-orange/);
  assert.equal((sources.match(/https:\/\//g) ?? []).length >= 3, true);
  assert.equal((sources.match(/Licence/g) ?? []).length, 3);
});
