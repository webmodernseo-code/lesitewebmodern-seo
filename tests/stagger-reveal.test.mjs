import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('StaggerReveal prepares selected descendants and remains accessible', async () => {
  const source = await readFile('src/components/StaggerReveal.tsx', 'utf8');

  assert.match(source, /querySelectorAll<HTMLElement>\(selector\)/);
  assert.match(source, /--stagger-index/);
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /observer\?\.disconnect\(\)/);
  assert.match(source, /removeProperty\('--stagger-index'\)/);
});

test('stagger styles expose directional variants and a reduced-motion fallback', async () => {
  const source = await readFile('src/app/globals.css', 'utf8');

  for (const marker of [
    '.stagger-reveal-item',
    '[data-stagger-variant="left"]',
    '[data-stagger-variant="right"]',
    '[data-stagger-variant="scale"]',
    '.stagger-reveal.is-visible',
    'prefers-reduced-motion: reduce',
  ]) {
    assert.ok(source.includes(marker), `missing ${marker}`);
  }

  assert.match(source, /:where\(\.stagger-reveal\.is-visible\) \.stagger-reveal-item/);
  assert.doesNotMatch(source, /\.stagger-reveal\.is-visible \.stagger-reveal-item/);
});
