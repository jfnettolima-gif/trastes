import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import { LICOES_PALHETADA } from "@/content/palhetada";

export default async function PalhetadaLicaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await requireUser();
  const licao = LICOES_PALHETADA.find((l) => l.slug === slug);
  if (!licao) notFound();

  const idx = LICOES_PALHETADA.findIndex((l) => l.slug === slug);
  const proxima = LICOES_PALHETADA[idx + 1];

  return (
    <AppShell userName={user.name}>
      <Link href="/palhetada" className="text-sm text-amber-700">
        ← Palhetada e mão direita
      </Link>
      <div className="flex items-center gap-3 mt-2">
        <h1 className="text-2xl font-bold text-amber-900">{licao.titulo}</h1>
        <span className="text-sm font-mono text-amber-700 bg-amber-100 rounded px-2 py-0.5">
          {licao.simbolo}
        </span>
      </div>

      <div className="card p-6 mt-4 space-y-4">
        {licao.paragrafos.map((p, i) => (
          <p key={i} className="text-neutral-700 whitespace-pre-line leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={licao.lessonKey} path={`/palhetada/${slug}`} />
        {proxima && (
          <Link href={`/palhetada/${proxima.slug}`} className="btn-secondary">
            Próxima: {proxima.titulo} →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
