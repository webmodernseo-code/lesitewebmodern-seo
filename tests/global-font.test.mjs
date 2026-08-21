import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(target);
    return /\.(ts|tsx|css)$/.test(entry.name) ? [target] : [];
  }));
  return nested.flat();
}

test('loads only Bricolage Grotesque as the application font', async () => {
  const layout = await readFile('src/app/layout.tsx', 'utf8');
  const tailwind = await readFile('tailwind.config.ts', 'utf8');
  assert.doesNotMatch(layout, /\bInter\b|--font-inter/);
  assert.match(layout, /Bricolage_Grotesque/);
  assert.match(layout, /variable: "--font-sans"/);
  assert.match(layout, /variable: "--font-display"/);
  assert.match(tailwind, /sans: \["var\(--font-sans\)"/);
  assert.match(tailwind, /display: \["var\(--font-display\)"/);
});

test('contains no local Inter font override in src', async () => {
  const files = await sourceFiles('src');
  const offenders = [];
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    if (/font-family:\s*['"]Inter['"]|--font-inter/.test(source)) offenders.push(file);
  }
  assert.deepEqual(offenders, []);
});
