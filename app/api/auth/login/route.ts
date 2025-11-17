import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = body?.token
  const expected = process.env.LOGIN_TOKEN
  if (!token || !expected || token !== expected) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('session', '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 21600
  })
  return res
}