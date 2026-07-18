import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { integrationsDb } from '@/lib/integrations-db';
import { generateImage } from '@/lib/ai-providers';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const { prompt } = await request.json();
  if (!prompt || !prompt.trim()) {
    return NextResponse.json({ error: 'Prompt requis.' }, { status: 400 });
  }

  const apiKey = await integrationsDb.getKey('openai');
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Connectez OpenAI dans Réglages pour générer une image.' },
      { status: 412 }
    );
  }

  try {
    const url = await generateImage(apiKey, prompt);
    return NextResponse.json({ url });
  } catch (err) {
    console.error('Generate image error:', err);
    return NextResponse.json(
      { error: "La génération d'image a échoué. Vérifiez votre clé OpenAI dans Réglages." },
      { status: 502 }
    );
  }
}
