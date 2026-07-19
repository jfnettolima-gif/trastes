import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import IntervalTable from "@/components/IntervalTable";

export default async function IntervalosPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Intervalos</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Intervalo é a distância entre duas notas. É a peça mais importante da teoria
        musical: toda escala, todo acorde e toda melodia são só combinações de
        intervalos. Antes de continuar para as escalas, vale a pena entender bem essa
        ideia.
      </p>

      <div className="card p-6 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          <strong>Semitom</strong> é a menor distância entre duas notas na guitarra:
          uma casa. <strong>Tom</strong> é a soma de dois semitons: duas casas.
        </p>
        <p>
          Todo intervalo é medido em semitons a partir da tônica (a nota de
          referência, contada como "distância 0"). Por exemplo, do Dó ao Mi há 4
          semitons, então esse intervalo se chama <strong>terça maior</strong>.
        </p>
        <p>
          Os intervalos que usam o número da escala maior (2, 3, 6, 7) podem ser
          maiores ou menores; os que não mudam entre escala maior e menor (4, 5,
          8/tônica) são chamados de <strong>justos</strong>.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <h2 className="font-semibold text-amber-900 mb-3">
          Os 12 intervalos, a partir de uma tônica
        </h2>
        <p className="text-sm text-neutral-500 mb-4">
          Clique em qualquer linha para ouvir a tônica seguida do intervalo.
        </p>
        <IntervalTable />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <MarkComplete lessonKey="intervalos.teoria" path="/intervalos" />
        <Link href="/intervalos/treino" className="btn-secondary">
          Ir para o treino de intervalos →
        </Link>
      </div>
    </AppShell>
  );
}
