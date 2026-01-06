import { NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value || "";
  const {pathname} = request.nextUrl;

  // ROOT
  if (pathname === "/") {
    if(token){
      return NextResponse.redirect(new URL("/notes", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // LOGIN PAGE
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }
  // PROTECTED PAGE
  if (pathname.startsWith("/notes") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/notes/:path*"],
};