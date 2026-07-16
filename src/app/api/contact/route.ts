import { NextResponse } from 'next/server';
import { dbService } from '@/lib/supabase-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Le nom et l\'adresse email sont requis.' },
        { status: 400 }
      );
    }

    const lead = await dbService.createLead({
      name,
      email,
      phone: phone || '',
      company: company || '',
      message: message || '',
      status: 'new'
    });

    return NextResponse.json(
      { success: true, lead },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('API Contact error:', err);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue.' },
      { status: 500 }
    );
  }
}
