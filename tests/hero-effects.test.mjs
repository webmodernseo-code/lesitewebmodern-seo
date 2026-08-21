import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const effectsPath = new URL('../src/components/public/HeroEffects.tsx', import.meta.url);

async function effectsSource() {
  return readFile(effectsPath, 'utf8');
}

test('exports the canvas background and rotating word components', async () => {
  const source = await effectsSource();
  assert.match(source, /export function BubbleBackground/);
  assert.match(source, /export function RotatingWord/);
});

test('reacts to reduced-motion preference changes and exposes a decorative canvas', async () => {
  const source = await effectsSource();
  const bubbleSource = source.split('export function RotatingWord')[0];
  assert.match(bubbleSource, /const reducedMotion = useReducedMotion\(\)/);
  assert.doesNotMatch(bubbleSource, /window\.matchMedia/);
  assert.match(source, /aria-hidden="true"/);
  assert.match(source, /pointer-events-none/);
});

test('observes hero size changes that are not window resizes', async () => {
  const source = await effectsSource();
  assert.match(source, /new ResizeObserver\(resize\)/);
  assert.match(source, /resizeObserver\.observe\(parent\)/);
  assert.match(source, /resizeObserver\.disconnect\(\)/);
});

test('cleans up animation frame and browser listeners', async () => {
  const source = await effectsSource();
  assert.match(source, /cancelAnimationFrame/);
  assert.match(source, /removeEventListener/);
});
