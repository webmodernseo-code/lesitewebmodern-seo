import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Reveal exposes four motion variants with up as the default', async () => {
  const source = await readFile('src/components/Reveal.tsx', 'utf8');
  assert.match(source, /type RevealVariant = 'up' \| 'left' \| 'right' \| 'scale'/);
  assert.match(source, /variant = 'up'/);
  for (const marker of ['translate-y-6', '-translate-x-8', 'translate-x-8', 'scale-[0.97]']) {
    assert.ok(source.includes(marker), `missing ${marker}`);
  }
  assert.match(source, /prefers-reduced-motion/);
  assert.match(source, /opacity-100 translate-x-0 translate-y-0 scale-100/);
});
