import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { integrationsDb, IntegrationProvider } from '@/lib/integrations-db';
import { testProviderKey } from '@/lib/ai-providers';

const VALID_PROVIDERS: IntegrationProvider[] = ['claude', 'openai', 'linkedin'];

export async function POST(request: Request, { params }: { params: { provider: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const provider = params.provider as IntegrationProvider;
  if (!VALID_PROVIDERS.includes(provider)) {
    return NextResponse.json({ error: 'Fournisseur inconnu.' }, { status: 400 });
  }

  const { apiKey } = await request.json();
  if (!apiKey || !apiKey.trim()) {
    return NextResponse.json({ error: 'Clé API requise.' }, { status: 400 });
  }

  const valid = await testProviderKey(provider, apiKey.trim());
  if (!valid) {
    return NextResponse.json({ error: 'Clé API invalide ou refusée par le fournisseur.' }, { status: 400 });
  }

  const connection = await integrationsDb.save(provider, apiKey.trim());
  return NextResponse.json({ connection });
}

export async function DELETE(request: Request, { params }: { params: { provider: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const provider = params.provider as IntegrationProvider;
  if (!VALID_PROVIDERS.includes(provider)) {
    return NextResponse.json({ error: 'Fournisseur inconnu.' }, { status: 400 });
  }

  await integrationsDb.remove(provider);
  return NextResponse.json({ success: true });
}
