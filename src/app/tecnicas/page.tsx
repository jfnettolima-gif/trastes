import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { LICOES_TECNICAS } from "@/content/tecnicas";
import { getProgressMap } from "@/lib/progress";

export default async function TecnicasIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Técnicas de mão</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Os recursos de expressão que transformam notas em música: ligados, bends,
        vibrato, slides e abafado.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {LICOES_TECNICAS.map((l, i) => {
          const concluida = progressMap.get(l.lessonKey)?.status === "concluido";
          return (
            <Link key={l.slug} href={`/tecnicas/${l.slug}`} className="card p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500">Técnica {i + 1}</p>
                <span className="text-xs font-mono text-amber-700">{l.simbolo}</span>
              </div>
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
