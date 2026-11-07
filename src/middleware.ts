import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/token";

const PUBLIC_ROUTES = ["/api/auth/login", "/api/auth/register"];

export async function middleware(request: NextRequest) {
  console.log(`[${request.method}] ${request.nextUrl.pathname}`);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);

    // repassa id e role para os Route Handlers via headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.sub as string);
    requestHeaders.set("x-user-role", payload.role as string);

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch {
    return NextResponse.json(
      { message: "Token inválido ou expirado" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: "/api/:path*",
};