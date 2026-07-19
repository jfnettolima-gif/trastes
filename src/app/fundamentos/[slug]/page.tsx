import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import Fretboard from "@/components/Fretboard";
import MarkComplete from "@/components/MarkComplete";
import { LICOES_FUNDAMENTOS } from "@/content/fundamentos";

export default async function FundamentosLicaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await requireUser();
  const licao = LICOES_FUNDAMENTOS.find((l) => l.slug === slug);
  if (!licao) notFound();

  const idx = LICOES_FUNDAMENTOS.findIndex((l) => l.slug === slug);
  const proxima = LICOES_FUNDAMENTOS[idx + 1];

  return (
    <AppShell userName={user.name}>
      <Link href="/fundamentos" className="text-sm text-amber-700">
        ← Fundamentos
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">{licao.titulo}</h1>

      <div className="card p-6 mt-4 space-y-4">
        {licao.paragrafos.map((p, i) => (
          <p key={i} className="text-neutral-700 whitespace-pre-line leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {licao.mostrarBraco && (
        <div className="mt-6">
          <Fretboard scaleKey="nenhuma" fretStart={0} fretEnd={12} />
        </div>
      )}

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={licao.lessonKey} path={`/fundamentos/${slug}`} />
        {proxima && (
          <Link href={`/fundamentos/${proxima.slug}`} className="btn-secondary">
            Próxima aula: {proxima.titulo} →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
