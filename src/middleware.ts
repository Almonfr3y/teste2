import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(`[${request.method}] ${request.nextUrl.pathname}`);
  return NextResponse.next(); // deixa a requisição seguir normalmente
}

export const config = {
  matcher: "/api/:path*", // roda só para rotas que começam com /api
};