import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { dbService } from '@/lib/supabase-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const projects = await dbService.getProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const project = await dbService.createProject(payload);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error('Create project error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
