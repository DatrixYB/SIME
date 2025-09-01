// app/api/auth/error/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const err = url.searchParams.get('error') ?? '';
  return NextResponse.redirect(`/auth/error?error=${encodeURIComponent(err)}`);
}
