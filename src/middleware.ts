import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionExpiration = req.cookies.get("session_expiration");

  if (sessionExpiration) {
    const expirationDate = new Date(sessionExpiration.value);

    if (new Date() > expirationDate) {
      const response = NextResponse.redirect(new URL("/", req.url));
      response.cookies.set("token", "", { maxAge: -1 }); // Remove token
      return response;
    }
  } else {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/composepost/:path*"],
};
