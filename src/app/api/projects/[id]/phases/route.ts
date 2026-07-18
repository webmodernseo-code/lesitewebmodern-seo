import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { dbService } from '@/lib/supabase-db';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const phase = await dbService.createProjectPhase({ ...payload, project_id: params.id });
    return NextResponse.json({ phase }, { status: 201 });
  } catch (err) {
    console.error('Create phase error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
