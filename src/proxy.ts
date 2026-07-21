import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Segunda camada de proteção (além do requireUser em cada página): barra
// qualquer rota privada na borda, antes mesmo de renderizar. Roda no Edge,
// então validamos o JWT direto com jose (não dá para usar o session.ts, que
// é "server-only" e depende de next/headers).

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

// Rotas que qualquer visitante pode ver sem estar logado.
const ROTAS_PUBLICAS = new Set(["/", "/login"]);

async function temSessaoValida(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("session")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const autenticado = await temSessaoValida(req);
  const publica = ROTAS_PUBLICAS.has(pathname);

  // Não logado tentando acessar área privada -> manda para o login.
  if (!autenticado && !publica) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Já logado não precisa ver a landing nem o login -> vai para o painel.
  if (autenticado && publica) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Aplica a tudo, menos assets estáticos, imagens e o robots.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img/|robots.txt).*)"],
};
