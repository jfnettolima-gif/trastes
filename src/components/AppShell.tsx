import Link from "next/link";
import { logout } from "@/app/login/actions";

export default function AppShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string;
}) {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-[#241a12] text-amber-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-lg tracking-tight">
            🎸 Trastes
          </Link>
          <nav className="flex items-center gap-4 text-sm flex-wrap justify-end">
            <Link href="/dashboard" className="hover:text-amber-300">
              Painel
            </Link>
            <Link href="/braco" className="hover:text-amber-300">
              Braço interativo
            </Link>
            <Link href="/localizacao-notas" className="hover:text-amber-300">
              Localizar notas
            </Link>
            <Link href="/intervalos" className="hover:text-amber-300">
              Intervalos
            </Link>
            <Link href="/pentatonica-menor" className="hover:text-amber-300">
              Pentatônica menor
            </Link>
            <Link href="/pentatonica-maior" className="hover:text-amber-300">
              Pentatônica maior
            </Link>
            <Link href="/escala-blues" className="hover:text-amber-300">
              Escala blues
            </Link>
            <Link href="/escala-maior" className="hover:text-amber-300">
              Escala maior
            </Link>
            <Link href="/escalas-menores" className="hover:text-amber-300">
              Escalas menores
            </Link>
            <Link href="/metronomo" className="hover:text-amber-300">
              Metrônomo
            </Link>
            {userName && <span className="text-amber-300/80">{userName}</span>}
            <form action={logout}>
              <button className="hover:text-amber-300">Sair</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
