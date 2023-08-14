import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { homeRoute } from "./lib/constants";

export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get("myhelptoken");
  const userType = request.cookies.get("user_type");

  if (
    (!userToken || !userType) &&
    !request.nextUrl.pathname.includes("/login")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    userToken &&
    userType &&
    !request.nextUrl.href.includes(`/${userType}/`)
  ) {
    return NextResponse.redirect(
      new URL("" + homeRoute[userType], request.url)
    );
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/patient/:path*",
    "/admin/:path*",
    "/therapist/:path*",
  ],
};
