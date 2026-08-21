export type FooterSection = 'services' | 'navigation' | 'contact';

export function getNextFooterSection(
  current: FooterSection | null,
  requested: FooterSection,
): FooterSection | null {
  return current === requested ? null : requested;
}
