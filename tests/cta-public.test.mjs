import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('CTA uses the historical light rounded card and keeps its copy', async () => {
  const source = await readFile('src/components/public/CtaPublic.tsx', 'utf8');
  assert.doesNotMatch(source, /bg-brand-charcoal/);
  assert.match(source, /bg-gradient-to-br from-brand-sable/);
  assert.match(source, /rounded-\[32px\]/);
  assert.match(source, /Prêt à attirer de/);
  assert.match(source, /Lancer votre croissance/);
  assert.match(source, /Comment ça marche/);
  assert.match(source, /bg-black/);
  assert.match(source, /bg-white/);
});
