import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ScaleShapeView from "@/components/ScaleShapeView";
import GuiaEscala from "@/components/GuiaEscala";

export default async function PentatonicShapePage({
  params,
}: {
  params: Promise<{ shape: string }>;
}) {
  const { shape } = await params;
  const shapeNumber = Number(shape);
  if (!Number.isInteger(shapeNumber) || shapeNumber < 1 || shapeNumber > 5) notFound();

  const user = await requireUser();
  const lessonKey = `pentatonica-menor.desenho-${shapeNumber}`;
  const proximo = shapeNumber < 5 ? shapeNumber + 1 : null;

  return (
    <AppShell userName={user.name}>
      <Link href="/pentatonica-menor" className="text-sm text-amber-700">
        ← Pentatônica menor
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">
        Pentatônica menor · Desenho {shapeNumber}
      </h1>

      <div className="card p-6 mt-4">
        <ScaleShapeView shapeNumber={shapeNumber} scaleKey="pentatonicaMenor" />
      </div>

      <GuiaEscala sistema="caixa" />

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Ideias para este desenho</h2>
        <p>
          <strong>Memorização:</strong> tente tocar o desenho de olhos fechados ou sem
          olhar para as mãos, só de ouvido.
        </p>
        <p>
          <strong>Lick sugerido:</strong> toque a sequência tônica → b3 → 4 → 5 → b7 →
          5 → 4 → b3 → tônica, terminando sempre numa nota do acorde (a tônica é a
          escolha mais segura).
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={lessonKey} path={`/pentatonica-menor/${shapeNumber}`} />
        {proximo && (
          <Link href={`/pentatonica-menor/${proximo}`} className="btn-secondary">
            Próximo desenho →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
