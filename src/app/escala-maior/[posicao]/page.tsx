import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ThreeNpsView from "@/components/ThreeNpsView";
import GuiaEscala from "@/components/GuiaEscala";

export default async function EscalaMaiorPosicaoPage({
  params,
}: {
  params: Promise<{ posicao: string }>;
}) {
  const { posicao } = await params;
  const posNumber = Number(posicao);
  if (!Number.isInteger(posNumber) || posNumber < 1 || posNumber > 7) notFound();

  const user = await requireUser();
  const lessonKey = `escala-maior.posicao-${posNumber}`;
  const proximo = posNumber < 7 ? posNumber + 1 : null;

  return (
    <AppShell userName={user.name}>
      <Link href="/escala-maior" className="text-sm text-amber-700">
        ← Escala maior
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">
        Escala maior · Posição {posNumber} (3 notas por corda)
      </h1>

      <div className="card p-6 mt-4">
        <ThreeNpsView positionNumber={posNumber} scaleKey="escalaMaior" />
      </div>

      <GuiaEscala sistema="3nps" />

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Ideias para esta posição</h2>
        <p>
          <strong>Resolva nas notas do acorde:</strong> a escala maior forma o acorde
          maior com sétima maior (1 - 3 - 5 - 7). Ao improvisar, termine as frases numa
          dessas quatro notas, principalmente na tônica ou na 3ª, para o solo soar
          "encaixado".
        </p>
        <p>
          <strong>Ouça a sensível:</strong> o 7º grau (a sétima maior) fica a apenas um
          semitom da tônica e "puxa" fortemente para ela. Toque 7 → 1 algumas vezes
          para sentir essa resolução, que é a assinatura do som maior.
        </p>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <MarkComplete lessonKey={lessonKey} path={`/escala-maior/${posNumber}`} />
        {proximo && (
          <Link href={`/escala-maior/${proximo}`} className="btn-secondary">
            Próxima posição →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
