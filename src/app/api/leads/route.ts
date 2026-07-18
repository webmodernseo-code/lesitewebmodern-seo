import { NextResponse } from 'next/server';
import { getSession } from '@/lib/require-session';
import { dbService } from '@/lib/supabase-db';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié.' }, { status: 401 });
  }

  const leads = await dbService.getLeads();
  return NextResponse.json({ leads });
}
