import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const heroPath = new URL('../src/components/public/HeroPublic.tsx', import.meta.url);

test('composes the background and exact rotating title words', async () => {
  const source = await readFile(heroPath, 'utf8');
  assert.match(source, /<BubbleBackground\s*\/>/);
  assert.match(source, /On développe votre/);
  for (const word of ['visibilité', 'trafic', 'notoriété', 'chiffre d’affaires']) {
    assert.match(source, new RegExp(word));
  }
});

test('keeps the commercial content and uses a rounded clipped shell', async () => {
  const source = await readFile(heroPath, 'utf8');
  assert.match(source, /Prendre un RDV offert/);
  assert.match(source, /Découvrir nos services/);
  assert.match(source, /<HeroSocialProof \/>/);
  assert.match(source, /rounded-\[32px\]/);
  assert.match(source, /overflow-hidden/);
});
