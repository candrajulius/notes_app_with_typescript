import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const authPages = ["/login", "/register"];
  const protectedPages = ["/notes"];

  // ROOT
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/notes" : "/login", request.url)
    );
  }

  // AUTH PAGES (login, register)
  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }

  // PROTECTED PAGES
  if (
    protectedPages.some((page) => pathname.startsWith(page)) &&
    !token
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/notes/:path*"],
};
