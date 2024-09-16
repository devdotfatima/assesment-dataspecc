import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const sessionExpiration = req.cookies.get("session_expiration");
  console.log({ sessionExpiration });

  if (sessionExpiration) {
    const expirationDate = new Date(sessionExpiration.value);

    if (new Date() > expirationDate) {
      if (req.nextUrl.pathname.startsWith("/api")) {
        // Handle API routes - return JSON response
        return NextResponse.json(
          { message: "Session expired. Please log in again." },
          { status: 401 }
        );
      } else {
        // Handle page routes - redirect to
        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.set("token", "", { maxAge: -1 }); // Remove token
        return response;
      }
    }
  } else {
    if (req.nextUrl.pathname.startsWith("/api")) {
      // Handle API routes - return JSON response
      return NextResponse.json(
        { message: "Session not found. Please log in." },
        { status: 401 }
      );
    } else {
      // Handle page routes - redirect to
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Proceed to next middleware or the requested page
  return NextResponse.next();
}

// Apply middleware to both API and page routes
export const config = {
  matcher: ["/api/tweet/:path*", "/composepost/:path*"], // Add both API and pages here
};
