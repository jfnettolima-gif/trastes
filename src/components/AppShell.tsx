import Link from "next/link";
import { logout } from "@/app/login/actions";
import { getCurrentUser } from "@/lib/auth";

export default async function AppShell({
  children,
  userName,
  isAdmin,
}: {
  children: React.ReactNode;
  userName?: string;
  isAdmin?: boolean;
}) {
  // Se a página não informar explicitamente, descobrimos aqui se o usuário
  // logado é admin, para o link "Contas" aparecer em qualquer página.
  const showAdmin = isAdmin ?? (await getCurrentUser())?.isAdmin ?? false;
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
            <Link href="/campo-harmonico" className="hover:text-amber-300">
              Campo harmônico
            </Link>
            <Link href="/modos-gregos" className="hover:text-amber-300">
              Modos gregos
            </Link>
            <Link href="/arpejos" className="hover:text-amber-300">
              Arpejos
            </Link>
            <Link href="/triades" className="hover:text-amber-300">
              Tríades no braço
            </Link>
            <Link href="/caged" className="hover:text-amber-300">
              CAGED
            </Link>
            <Link href="/acordes-abertos" className="hover:text-amber-300">
              Acordes abertos
            </Link>
            <Link href="/pestana" className="hover:text-amber-300">
              Pestana
            </Link>
            <Link href="/dicionario-acordes" className="hover:text-amber-300">
              Dicionário de acordes
            </Link>
            <Link href="/identificador" className="hover:text-amber-300">
              Identificador reverso
            </Link>
            <Link href="/afinacoes" className="hover:text-amber-300">
              Afinações
            </Link>
            <Link href="/circulo-de-quintas" className="hover:text-amber-300">
              Círculo das quintas
            </Link>
            <Link href="/progressoes-harmonicas" className="hover:text-amber-300">
              Progressões
            </Link>
            <Link href="/assistente-improviso" className="hover:text-amber-300">
              Assistente de improviso
            </Link>
            <Link href="/repertorio" className="hover:text-amber-300">
              Repertório
            </Link>
            <Link href="/play-along" className="hover:text-amber-300">
              Play-along de licks
            </Link>
            <Link href="/treino-acordes" className="hover:text-amber-300">
              Treino de acordes
            </Link>
            <Link href="/tecnicas" className="hover:text-amber-300">
              Técnicas
            </Link>
            <Link href="/palhetada" className="hover:text-amber-300">
              Palhetada e mão direita
            </Link>
            <Link href="/ritmo" className="hover:text-amber-300">
              Ritmo
            </Link>
            <Link href="/backing-tracks" className="hover:text-amber-300">
              Backing tracks
            </Link>
            <Link href="/metronomo" className="hover:text-amber-300">
              Metrônomo
            </Link>
            <Link href="/speed-trainer" className="hover:text-amber-300">
              Speed trainer
            </Link>
            {showAdmin && (
              <Link href="/admin/usuarios" className="hover:text-amber-300 font-medium text-amber-300">
                Contas
              </Link>
            )}
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
