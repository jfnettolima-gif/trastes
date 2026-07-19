import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ThreeNpsView from "@/components/ThreeNpsView";

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

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Exercícios</h2>
        <p>
          <strong>Ascendente e descendente:</strong> toque as 3 notas de cada corda,
          da corda mais grave para a mais aguda e depois de volta, com metrônomo em
          andamento lento.
        </p>
        <p>
          <strong>Ligados:</strong> como há 3 notas por corda, essa posição é perfeita
          para treinar hammer-on subindo e pull-off descendo, palhetando só a primeira
          nota de cada corda.
        </p>
        <p>
          <strong>Sequência de 3:</strong> toque as notas em grupos (1-2-3, 2-3-4,
          3-4-5...) para soltar os dedos e criar frases mais musicais.
        </p>
        <p>
          <strong>Ache a tônica:</strong> as bolinhas vermelhas são a tônica. Comece e
          termine sempre nelas para ouvir o "repouso" da escala maior.
        </p>
        <p>
          <strong>Conexão:</strong> depois de dominar esta posição, toque as últimas
          notas dela e emende direto na posição seguinte, sem parar.
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
