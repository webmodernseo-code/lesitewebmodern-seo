import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { dbService } from '@/lib/supabase-db';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const task = await dbService.updateProjectTask(params.id, payload);
    return NextResponse.json({ task });
  } catch (err) {
    console.error('Update task error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
