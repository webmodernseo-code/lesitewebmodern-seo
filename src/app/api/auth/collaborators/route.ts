import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME, SessionPayload } from '@/lib/session';
import { hashPassword } from '@/lib/password';
import { usersDb } from '@/lib/users-db';

async function requireSuperAdmin(): Promise<SessionPayload | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session || session.role !== 'super_admin') return null;
  return session;
}

export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 403 });
  }

  const users = await usersDb.findAll();
  return NextResponse.json({
    collaborators: users.map((u) => ({ email: u.email, role: u.role, permissions: u.permissions })),
  });
}

export async function POST(request: Request) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé.' }, { status: 403 });
  }

  try {
    const { email, password, role, permissions } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    const hash = await hashPassword(password);
    const user = await usersDb.create({
      email,
      password_hash: hash,
      role: role || 'collaborator',
      permissions: permissions || ['content', 'calendar', 'projects', 'leads', 'crm', 'settings'],
    });

    return NextResponse.json(
      { collaborator: { email: user.email, role: user.role, permissions: user.permissions } },
      { status: 201 }
    );
  } catch (err: any) {
    if (err?.code === '23505') {
      return NextResponse.json({ error: 'Cet email existe déjà.' }, { status: 409 });
    }
    console.error('Add collaborator error:', err);
    return NextResponse.json({ error: 'Une erreur est survenue.' }, { status: 500 });
  }
}
