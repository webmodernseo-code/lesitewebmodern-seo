import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { publishToLinkedinPage } from '@/lib/linkedin';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const { content } = await request.json();
  if (!content || !content.trim()) {
    return NextResponse.json({ error: 'Contenu requis.' }, { status: 400 });
  }

  try {
    await publishToLinkedinPage(content);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('LinkedIn publish error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'La publication a échoué.' },
      { status: 502 }
    );
  }
}
