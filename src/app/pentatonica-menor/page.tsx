import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getProgressMap } from "@/lib/progress";

const DESENHOS = [1, 2, 3, 4, 5];

export default async function PentatonicaMenorIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Pentatônica menor</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          A pentatônica menor é a escala mais usada para improvisar em rock, blues e
          pop. Ela tem só 5 notas por oitava (por isso "penta"), e a fórmula é:{" "}
          <strong>1 - b3 - 4 - 5 - b7</strong>.
        </p>
        <p>
          Ela combina muito bem com acordes menores: se a música está em Lá menor,
          a pentatônica menor de Lá encaixa quase sempre.
        </p>
        <p>
          Existem <strong>5 desenhos</strong> (posições) dessa escala espalhados pelo
          braço. Eles se conectam: o final de um desenho é o começo do próximo. Estude
          um de cada vez, mas o objetivo final é enxergar o braço inteiro conectado.
        </p>
      </div>

      <div className="grid sm:grid-cols-5 gap-3 mt-6">
        {DESENHOS.map((n) => {
          const key = `pentatonica-menor.desenho-${n}`;
          const concluida = progressMap.get(key)?.status === "concluido";
          return (
            <Link key={n} href={`/pentatonica-menor/${n}`} className="card p-5 text-center">
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
