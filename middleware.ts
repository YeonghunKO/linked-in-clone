// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  if (pathname === '/') {
    const session = await getToken({
      req: request,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === 'production',
    });

    console.log('session', session);

    if (!session) {
      return NextResponse.redirect(`${origin}/home`);
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/home'],
};
