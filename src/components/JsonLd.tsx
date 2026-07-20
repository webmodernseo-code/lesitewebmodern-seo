import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injecte un bloc <script type="application/ld+json">.
 * L'échappement de "<" évite toute injection si un champ dynamique
 * (ex: titre d'article) contenait la séquence "</script>".
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
