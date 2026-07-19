import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { LICOES_RITMO } from "@/content/ritmo";
import { getProgressMap } from "@/lib/progress";

export default async function RitmoIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Ritmo e leitura</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        O lado do tempo: duração das notas, compasso, andamento e as levadas da mão
        direita.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {LICOES_RITMO.map((l, i) => {
          const concluida = progressMap.get(l.lessonKey)?.status === "concluido";
          return (
            <Link key={l.slug} href={`/ritmo/${l.slug}`} className="card p-5">
              <p className="text-xs text-neutral-500">Aula {i + 1}</p>
              <h3 className="font-semibold text-amber-900 mt-1">
                {concluida ? "✓ " : ""}
                {l.titulo}
              </h3>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
