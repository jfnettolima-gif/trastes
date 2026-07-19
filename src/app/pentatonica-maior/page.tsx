import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getProgressMap } from "@/lib/progress";

const DESENHOS = [1, 2, 3, 4, 5];

export default async function PentatonicaMaiorIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Pentatônica maior</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          A pentatônica maior tem as mesmas 5 notas por oitava da pentatônica menor,
          mas vistas a partir de outra tônica: são a mesma "família" de notas. A
          fórmula é <strong>1 - 2 - 3 - 5 - 6</strong> (sem a quarta e sem a sétima,
          por isso soa aberta e sem tensão).
        </p>
        <p>
          Ela combina muito bem com acordes maiores e é a base do som country,
          pop e de muitos solos alegres/melódicos. Se a música está em Dó maior,
          a pentatônica maior de Dó encaixa quase sempre.
        </p>
        <p>
          Curiosidade: a pentatônica maior de uma nota usa exatamente as mesmas
          notas da pentatônica menor da sua relativa (ex.: Dó maior pentatônica =
          Lá menor pentatônica). Aqui, porém, os 5 desenhos abaixo são numerados a
          partir da tônica maior, então cada desenho começa direto na fundamental.
        </p>
      </div>

      <div className="grid sm:grid-cols-5 gap-3 mt-6">
        {DESENHOS.map((n) => {
          const key = `pentatonica-maior.desenho-${n}`;
          const concluida = progressMap.get(key)?.status === "concluido";
          return (
            <Link key={n} href={`/pentatonica-maior/${n}`} className="card p-5 text-center">
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
