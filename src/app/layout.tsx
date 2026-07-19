import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trastes · Aprenda guitarra do jeito certo",
  description:
    "Plataforma de estudo de guitarra: escalas, braço interativo, teoria aplicada e improvisação.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
