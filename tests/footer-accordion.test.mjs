import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { getNextFooterSection } from '../src/components/public/footer-accordion.ts';

test('the mobile footer keeps at most one section open', () => {
  assert.equal(getNextFooterSection(null, 'services'), 'services');
  assert.equal(getNextFooterSection('services', 'navigation'), 'navigation');
  assert.equal(getNextFooterSection('navigation', 'navigation'), null);
});

test('the footer exposes three accessible accordion controls without raw HTML', async () => {
  const source = await readFile(new URL('../src/components/public/FooterPublic.tsx', import.meta.url), 'utf8');

  assert.match(source, /^'use client';/);
  assert.equal((source.match(/<FooterColumn id=/g) ?? []).length, 3);
  assert.match(source, /aria-expanded=/);
  assert.match(source, /footer-services/);
  assert.match(source, /footer-navigation/);
  assert.match(source, /footer-contact/);
  assert.match(source, /Mentions légales/);
  assert.match(source, /Politique de confidentialité/);
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
});
