import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ScaleShapeView from "@/components/ScaleShapeView";

export default async function PentatonicaMaiorShapePage({
  params,
}: {
  params: Promise<{ shape: string }>;
}) {
  const { shape } = await params;
  const shapeNumber = Number(shape);
  if (!Number.isInteger(shapeNumber) || shapeNumber < 1 || shapeNumber > 5) notFound();

  const user = await requireUser();
  const lessonKey = `pentatonica-maior.desenho-${shapeNumber}`;
  const proximo = shapeNumber < 5 ? shapeNumber + 1 : null;

  return (
    <AppShell userName={user.name}>
      <Link href="/pentatonica-maior" className="text-sm text-amber-700">
        ← Pentatônica maior
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">
        Pentatônica maior · Desenho {shapeNumber}
      </h1>

      <div className="card p-6 mt-4">
        <ScaleShapeView
          shapeNumber={shapeNumber}
          scaleKey="pentatonicaMaior"
          rootLabel="maior"
        />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Exercícios</h2>
        <p>
          <strong>Ascendente:</strong> toque todas as notas marcadas deste desenho da
          corda mais grave para a mais aguda, uma de cada vez, com metrônomo em
          andamento lento.
        </p>
        <p>
          <strong>Descendente:</strong> faça o caminho inverso, da corda mais aguda
          para a mais grave.
        </p>
        <p>
          <strong>Grupos de 3 e de 4 notas:</strong> em vez de tocar nota por nota,
          agrupe em blocos de 3 e depois de 4, sempre voltando à tônica.
        </p>
        <p>
          <strong>Compare com a pentatônica menor:</strong> repare que este desenho
          usa exatamente as mesmas posições no braço que um desenho da pentatônica
          menor relativa, só muda qual nota você trata como "casa".
        </p>
        <p>
          <strong>Lick sugerido:</strong> toque a sequência tônica → 2 → 3 → 5 → 6 →
          5 → 3 → 2 → tônica, terminando sempre numa nota do acorde (a tônica é a
          escolha mais segura).
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={lessonKey} path={`/pentatonica-maior/${shapeNumber}`} />
        {proximo && (
          <Link href={`/pentatonica-maior/${proximo}`} className="btn-secondary">
            Próximo desenho →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
