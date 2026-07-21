import type { NextConfig } from "next";

// Cabeçalhos de segurança aplicados a todas as respostas. O foco é deixar o
// sistema privado (noindex) e fechar vetores comuns: clickjacking, sniffing
// de MIME, vazamento de referer e uso indevido de APIs do navegador.
const securityHeaders = [
  // Impede o site de ser embutido em iframe de terceiros (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Reforço do anterior + trava base tag e destino de formulários.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  },
  // O navegador não "adivinha" o tipo do arquivo.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Não vaza a URL completa para outros sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Bloqueia acesso a câmera, microfone e localização.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Força HTTPS por 2 anos.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Sistema privado: buscadores não devem indexar nada.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
