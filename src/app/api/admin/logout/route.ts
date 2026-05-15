import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Use status 303 (See Other) to ensure the redirect uses GET
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
  return response;
}
