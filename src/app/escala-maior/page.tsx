import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getProgressMap } from "@/lib/progress";

const POSICOES = [1, 2, 3, 4, 5, 6, 7];

export default async function EscalaMaiorIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Escala maior</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          A escala maior é a mãe de toda a teoria musical ocidental: é dela que saem
          os intervalos, os acordes e os modos. Ela tem <strong>7 notas</strong> por
          oitava, com a fórmula <strong>1 - 2 - 3 - 4 - 5 - 6 - 7</strong>. É o som
          alegre e resolvido do "dó, ré, mi, fá, sol, lá, si".
        </p>
        <p>
          Como são 7 notas (e não 5 como na pentatônica), o sistema de desenhos aqui é
          diferente: usamos o método <strong>3 notas por corda</strong>. Em cada corda
          você toca exatamente 3 notas da escala e passa para a próxima. Isso gera{" "}
          <strong>7 posições</strong> que percorrem o braço inteiro, ideais para
          velocidade e para ligados (hammer-on / pull-off).
        </p>
        <p>
          As 7 posições se conectam: cada uma começa onde a anterior está terminando.
          Estude uma de cada vez, sempre com metrônomo, até enxergar o braço todo
          conectado.
        </p>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 mt-6">
        {POSICOES.map((n) => {
          const key = `escala-maior.posicao-${n}`;
          const concluida = progressMap.get(key)?.status === "concluido";
          return (
            <Link key={n} href={`/escala-maior/${n}`} className="card p-5 text-center">
              <p className="text-xs text-neutral-500">Posição</p>
              <p className="text-2xl font-bold text-amber-800">
                {concluida ? "✓" : n}
              </p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
