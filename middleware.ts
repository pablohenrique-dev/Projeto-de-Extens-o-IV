import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/login", "/criar-conta"];

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // rotas públicas não exigem proteção
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const authToken = request.headers
    .get("cookie")
    ?.match(/auth_token=([^;]+)/)?.[1];

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // valida o token JWT
    await jwtVerify(
      authToken,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return NextResponse.next();
  } catch {
    // se token inválido -> vai para login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|public).*)"],
};
