import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ScaleShapeView from "@/components/ScaleShapeView";
import GuiaEscala from "@/components/GuiaEscala";

export default async function EscalaBluesShapePage({
  params,
}: {
  params: Promise<{ shape: string }>;
}) {
  const { shape } = await params;
  const shapeNumber = Number(shape);
  if (!Number.isInteger(shapeNumber) || shapeNumber < 1 || shapeNumber > 5) notFound();

  const user = await requireUser();
  const lessonKey = `escala-blues.desenho-${shapeNumber}`;
  const proximo = shapeNumber < 5 ? shapeNumber + 1 : null;

  return (
    <AppShell userName={user.name}>
      <Link href="/escala-blues" className="text-sm text-amber-700">
        ← Escala blues
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">
        Escala blues · Desenho {shapeNumber}
      </h1>

      <div className="card p-6 mt-4">
        <ScaleShapeView
          shapeNumber={shapeNumber}
          scaleKey="blues"
          shapeReferenceScaleKey="pentatonicaMenor"
          rootLabel="(blues)"
        />
      </div>

      <GuiaEscala sistema="caixa" />

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Ideias para este desenho</h2>
        <p>
          <strong>Nota de passagem:</strong> encontre a b5 marcada no desenho e
          pratique tocá-la rapidamente entre a 4 e a 5, sem parar nela. É a "blue
          note" que dá o tempero, mas ela pede passagem, não repouso.
        </p>
        <p>
          <strong>Bend:</strong> na nota da 4ª (quarta), tente puxar a corda até o
          som chegar perto da 5ª (quinta), passando pela b5 no caminho.
        </p>
        <p>
          <strong>Lick sugerido:</strong> toque a sequência tônica → b3 → 4 → b5 → 5 →
          b7 → 5 → b5 → 4 → b3 → tônica, terminando sempre numa nota do acorde (a
          tônica é a escolha mais segura).
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={lessonKey} path={`/escala-blues/${shapeNumber}`} />
        {proximo && (
          <Link href={`/escala-blues/${proximo}`} className="btn-secondary">
            Próximo desenho →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
