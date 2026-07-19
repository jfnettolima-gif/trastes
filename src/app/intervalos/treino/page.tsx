import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import IntervalTrainer from "@/components/IntervalTrainer";

export default async function IntervalosTreinoPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <Link href="/intervalos" className="text-sm text-amber-700">
        ← Intervalos
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">Treino de intervalos</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Duas notas vão tocar em sequência: a tônica e o intervalo. Identifique de
        ouvido qual intervalo é. Pode tocar de novo quantas vezes quiser antes de
        responder.
      </p>

      <div className="card p-6">
        <IntervalTrainer />
      </div>

      <div className="mt-6">
        <MarkComplete
          lessonKey="intervalos.treino"
          path="/intervalos/treino"
          label="Marcar treino de hoje como concluído"
        />
      </div>
    </AppShell>
  );
}
