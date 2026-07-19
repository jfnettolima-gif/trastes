import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import Metronome from "@/components/Metronome";
import { LICOES_RITMO } from "@/content/ritmo";

export default async function RitmoLicaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await requireUser();
  const licao = LICOES_RITMO.find((l) => l.slug === slug);
  if (!licao) notFound();

  const idx = LICOES_RITMO.findIndex((l) => l.slug === slug);
  const proxima = LICOES_RITMO[idx + 1];

  return (
    <AppShell userName={user.name}>
      <Link href="/ritmo" className="text-sm text-amber-700">
        ← Ritmo e leitura
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">{licao.titulo}</h1>

      <div className="card p-6 mt-4 space-y-4">
        {licao.paragrafos.map((p, i) => (
          <p key={i} className="text-neutral-700 whitespace-pre-line leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {licao.usarMetronomo && (
        <div className="card p-6 mt-6">
          <Metronome />
        </div>
      )}

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={licao.lessonKey} path={`/ritmo/${slug}`} />
        {proxima && (
          <Link href={`/ritmo/${proxima.slug}`} className="btn-secondary">
            Próxima aula: {proxima.titulo} →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
