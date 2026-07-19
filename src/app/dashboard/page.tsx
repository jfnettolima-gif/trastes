import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { MODULOS } from "@/content/curriculo";
import { getOverallProgress, getProgressMap } from "@/lib/progress";
import AppShell from "@/components/AppShell";

export default async function DashboardPage() {
  const user = await requireUser();
  const [{ done, total, percent }, progressMap] = await Promise.all([
    getOverallProgress(user.id),
    getProgressMap(user.id),
  ]);

  const proximaLicao = MODULOS.flatMap((m) => m.licoes).find(
    (l) => progressMap.get(l.key)?.status !== "concluido"
  );

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Olá, {user.name.split(" ")[0]}!</h1>
      <p className="text-neutral-600 mt-1">
        Meta diária: {user.dailyMinutes ?? 30} minutos de estudo.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <div className="card p-5">
          <p className="text-sm text-neutral-500">Progresso geral</p>
          <p className="text-3xl font-bold text-amber-800">{percent}%</p>
          <p className="text-xs text-neutral-500 mt-1">
            {done} de {total} lições concluídas
          </p>
        </div>
        <div className="card p-5">
          <p className="text-sm text-neutral-500">Próxima atividade recomendada</p>
          {proximaLicao ? (
            <Link href={proximaLicao.href} className="text-amber-700 font-semibold">
              {proximaLicao.titulo} →
            </Link>
          ) : (
            <p className="text-amber-700 font-semibold">Tudo concluído por aqui! 🎉</p>
          )}
        </div>
        <div className="card p-5">
          <p className="text-sm text-neutral-500">Prática livre</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            <Link href="/braco" className="text-amber-700 text-sm font-medium">
              Braço interativo →
            </Link>
            <Link href="/metronomo" className="text-amber-700 text-sm font-medium">
              Metrônomo →
            </Link>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-amber-900 mt-10 mb-3">Sua trilha</h2>
      <div className="space-y-4">
        {MODULOS.map((modulo) => {
          const licoesConcluidas = modulo.licoes.filter(
            (l) => progressMap.get(l.key)?.status === "concluido"
          ).length;
          return (
            <div key={modulo.slug} className="card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-amber-900">{modulo.titulo}</h3>
                  <p className="text-sm text-neutral-500">{modulo.descricao}</p>
                </div>
                <span className="text-sm text-neutral-500">
                  {licoesConcluidas}/{modulo.licoes.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {modulo.licoes.map((l) => {
                  const concluida = progressMap.get(l.key)?.status === "concluido";
                  return (
                    <Link
                      key={l.key}
                      href={l.href}
                      className={`text-xs px-3 py-1.5 rounded-full border ${
                        concluida
                          ? "bg-amber-700 text-white border-amber-700"
                          : "border-amber-700 text-amber-700"
                      }`}
                    >
                      {concluida ? "✓ " : ""}
                      {l.titulo}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
