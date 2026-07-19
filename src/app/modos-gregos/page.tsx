import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getProgressMap } from "@/lib/progress";

export const MODOS = [
  {
    slug: "jonio",
    grau: "I",
    titulo: "Jônio",
    resumo: "É a própria escala maior. Som alegre e resolvido.",
    cor: "menor",
  },
  {
    slug: "dorico",
    grau: "II",
    titulo: "Dórico",
    resumo: "Menor com a 6ª maior. Som menor mais brilhante, usado no rock e funk.",
    cor: "menor",
  },
  {
    slug: "frigio",
    grau: "III",
    titulo: "Frígio",
    resumo: "Menor com a b2. Som espanhol/flamenco e metal.",
    cor: "menor",
  },
  {
    slug: "lidio",
    grau: "IV",
    titulo: "Lídio",
    resumo: "Maior com a #4. Som sonhador, de trilha de filme.",
    cor: "maior",
  },
  {
    slug: "mixolidio",
    grau: "V",
    titulo: "Mixolídio",
    resumo: "Maior com a b7. Som de blues, rock e dominante.",
    cor: "maior",
  },
  {
    slug: "eolio",
    grau: "VI",
    titulo: "Eólio",
    resumo: "É a própria menor natural. O som menor padrão.",
    cor: "menor",
  },
  {
    slug: "locrio",
    grau: "VII",
    titulo: "Lócrio",
    resumo: "O mais tenso: b2 e b5. Instável, raro, meio diminuto.",
    cor: "diminuto",
  },
] as const;

export default async function ModosGregosIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Modos gregos</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Os 7 modos gregos são a escala maior tocada a partir de cada um dos seus 7
          graus. As notas são as mesmas, mas o <strong>centro muda</strong>, e com ele
          muda a cor da escala. Tocar Dó maior começando em Ré dá o modo dórico de Ré.
        </p>
        <p>
          O segredo para <em>ouvir</em> um modo é comparar sempre com a escala maior ou
          menor de mesma tônica, prestando atenção na nota característica de cada um (a
          #4 do lídio, a b2 do frígio, a b7 do mixolídio, e assim por diante).
        </p>
        <p>
          Todos usam o mesmo sistema de <strong>3 notas por corda</strong> que você já
          conhece das escalas de 7 notas.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {MODOS.map((m) => {
          const key = `modos-gregos.${m.slug}`;
          const concluida = progressMap.get(key)?.status === "concluido";
          return (
            <Link key={m.slug} href={`/modos-gregos/${m.slug}`} className="card p-5">
              <div className="flex items-baseline justify-between">
                <p className="text-lg font-bold text-amber-800">
                  {concluida ? "✓ " : ""}
                  {m.titulo}
                </p>
                <span className="text-xs text-neutral-400">grau {m.grau}</span>
              </div>
              <p className="text-sm text-neutral-600 mt-1">{m.resumo}</p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
