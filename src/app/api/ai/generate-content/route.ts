import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { integrationsDb } from '@/lib/integrations-db';
import { generateContent } from '@/lib/ai-providers';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const { type, title, brief, focusKeyword } = await request.json();
  if (!title || !title.trim()) {
    return NextResponse.json({ error: 'Titre requis.' }, { status: 400 });
  }

  const apiKey = await integrationsDb.getKey('claude');
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Connectez Claude API dans Réglages pour générer du contenu.' },
      { status: 412 }
    );
  }

  try {
    const content = await generateContent(apiKey, { type, title, brief, focusKeyword });
    return NextResponse.json({ content });
  } catch (err) {
    console.error('Generate content error:', err);
    return NextResponse.json(
      { error: 'La génération a échoué. Vérifiez votre clé Claude API dans Réglages.' },
      { status: 502 }
    );
  }
}
