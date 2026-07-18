import { IntegrationProvider } from './integrations-db';

export async function testProviderKey(provider: IntegrationProvider, apiKey: string): Promise<boolean> {
  try {
    if (provider === 'claude') {
      const res = await fetch('https://api.anthropic.com/v1/models', {
        headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      });
      return res.ok;
    }
    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      return res.ok;
    }
    return false;
  } catch {
    return false;
  }
}

interface GenerateContentOptions {
  type: 'blog' | 'linkedin';
  title: string;
  brief?: string;
  focusKeyword?: string;
}

export async function generateContent(apiKey: string, opts: GenerateContentOptions): Promise<string> {
  const prompt =
    opts.type === 'blog'
      ? `Rédige un article de blog SEO complet en français, au format HTML simple (balises h2, p, strong uniquement), sur le sujet : "${opts.title}".
Mot-clé principal à intégrer naturellement : "${opts.focusKeyword || opts.title}".
Brief de l'auteur : ${opts.brief || "aucun brief particulier, utilise ton expertise SEO."}
Contraintes : environ 400-600 mots, 2 à 3 sous-titres H2, un encadré "À retenir" mis en valeur, une conclusion courte.
Réponds uniquement avec le HTML de l'article (sans balises html/body/head), sans commentaire ni explication.`
      : `Rédige un post LinkedIn percutant en français sur le sujet : "${opts.title}".
Brief de l'auteur : ${opts.brief || 'aucun brief particulier'}.
Format attendu : un hook de 2-3 lignes, 3-4 points clés en liste à puces courtes, une question ouverte à la fin, quelques hashtags pertinents.
Réponds uniquement avec le texte du post, sans introduction ni commentaire.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text || '';
  return text.trim();
}

export async function generateImage(apiKey: string, prompt: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  const url = data.data?.[0]?.url;
  if (!url) throw new Error('Aucune image retournée par OpenAI.');
  return url;
}
