import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getProgressMap } from "@/lib/progress";

const DESENHOS = [1, 2, 3, 4, 5];

export default async function EscalaBluesIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Escala blues</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          A escala blues é a pentatônica menor com uma nota extra: a{" "}
          <strong>b5 ("blue note")</strong>, uma nota de passagem bem dissonante que
          dá aquele tempero característico do blues, rock e jazz. A fórmula é{" "}
          <strong>1 - b3 - 4 - b5 - 5 - b7</strong>.
        </p>
        <p>
          A b5 funciona melhor como nota de passagem rápida entre a 4 e a 5, não
          como um lugar para parar. Ela também combina muito bem com bends
          (puxar a corda) partindo da 4 em direção à 5.
        </p>
        <p>
          Os 5 desenhos abaixo usam exatamente as mesmas posições no braço da
          pentatônica menor, só que agora com a b5 marcada dentro de cada desenho.
          Se você já estudou a pentatônica menor, vai reconhecer o formato na hora.
        </p>
      </div>

      <div className="grid sm:grid-cols-5 gap-3 mt-6">
        {DESENHOS.map((n) => {
          const key = `escala-blues.desenho-${n}`;
          const concluida = progressMap.get(key)?.status === "concluido";
          return (
            <Link key={n} href={`/escala-blues/${n}`} className="card p-5 text-center">
              <p className="text-xs text-neutral-500">Desenho</p>
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
