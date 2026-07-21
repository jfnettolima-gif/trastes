import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { LICOES_PALHETADA } from "@/content/palhetada";
import { getProgressMap } from "@/lib/progress";

export default async function PalhetadaIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Palhetada e mão direita</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        A mão que toca as cordas define o ritmo, a articulação e boa parte da velocidade:
        palhetada alternada, de economia, sweep, tapping e dedilhado.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {LICOES_PALHETADA.map((l, i) => {
          const concluida = progressMap.get(l.lessonKey)?.status === "concluido";
          return (
            <Link key={l.slug} href={`/palhetada/${l.slug}`} className="card p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-500">Lição {i + 1}</p>
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
