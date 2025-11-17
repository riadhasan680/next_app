import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get('session')?.value === '1'
  if (!isAuth && (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/flag')) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }
  if (isAuth && req.nextUrl.pathname === '/auth') {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = { matcher: ['/', '/auth', '/flag'] }