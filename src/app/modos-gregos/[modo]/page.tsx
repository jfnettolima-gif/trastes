import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ThreeNpsExplorer from "@/components/ThreeNpsExplorer";
import GuiaEscala from "@/components/GuiaEscala";
import { ScaleKey } from "@/lib/music";

const MODOS: Record<
  string,
  {
    titulo: string;
    grau: string;
    scaleKey: ScaleKey;
    caracteristica: string;
    texto: string[];
    rootLabel: string;
  }
> = {
  jonio: {
    titulo: "Jônio (maior)",
    grau: "I",
    scaleKey: "escalaMaior",
    caracteristica: "Nenhuma nota alterada, é a referência.",
    rootLabel: "maior",
    texto: [
      "O modo jônio é simplesmente a escala maior. É o ponto de partida: todos os outros modos são medidos em relação a ele.",
      "Som alegre, estável e resolvido. Combina com o acorde maior com sétima maior (7M) do grau I.",
    ],
  },
  dorico: {
    titulo: "Dórico",
    grau: "II",
    scaleKey: "dorico",
    caracteristica: "6ª maior sobre um acorde menor.",
    rootLabel: "dórico",
    texto: [
      "O dórico é uma escala menor (tem b3 e b7) mas com a 6ª maior, e é essa 6ª maior que dá o brilho característico, diferente da menor natural.",
      "Muito usado em rock, funk e jazz modal. Combina com acordes menores com sétima (m7), especialmente no grau ii.",
    ],
  },
  frigio: {
    titulo: "Frígio",
    grau: "III",
    scaleKey: "frigio",
    caracteristica: "b2, o meio-tom logo acima da tônica.",
    rootLabel: "frígio",
    texto: [
      "O frígio é menor com a segunda menor (b2). Essa nota logo acima da tônica cria a tensão espanhola/flamenca e é a marca do som de metal.",
      "Combina com acordes menores com sétima (m7) do grau iii. Toque a tônica e a b2 em sequência para ouvir a cor.",
    ],
  },
  lidio: {
    titulo: "Lídio",
    grau: "IV",
    scaleKey: "lidio",
    caracteristica: "#4, a quarta aumentada.",
    rootLabel: "lídio",
    texto: [
      "O lídio é maior com a quarta aumentada (#4). Essa nota flutuante dá o som sonhador e etéreo, muito usado em trilhas de cinema.",
      "Combina com acordes maiores com sétima maior (7M) do grau IV. A #4 é o que o distingue do jônio.",
    ],
  },
  mixolidio: {
    titulo: "Mixolídio",
    grau: "V",
    scaleKey: "mixolidio",
    caracteristica: "b7 sobre um acorde maior.",
    rootLabel: "mixolídio",
    texto: [
      "O mixolídio é maior com a sétima menor (b7). É o som do dominante: blues, rock e a base do improviso sobre acordes com sétima (7).",
      "Combina com acordes dominantes (7) do grau V. É provavelmente o modo mais útil no dia a dia depois do maior e do menor.",
    ],
  },
  eolio: {
    titulo: "Eólio (menor natural)",
    grau: "VI",
    scaleKey: "menorNatural",
    caracteristica: "Nenhuma alteração além do menor padrão.",
    rootLabel: "menor",
    texto: [
      "O eólio é exatamente a menor natural. É o som menor padrão, melancólico, do rock e do pop em tom menor.",
      "Combina com acordes menores com sétima (m7) do grau vi. É o relativo menor do jônio.",
    ],
  },
  locrio: {
    titulo: "Lócrio",
    grau: "VII",
    scaleKey: "locrio",
    caracteristica: "b2 e b5 ao mesmo tempo.",
    rootLabel: "lócrio",
    texto: [
      "O lócrio é o mais instável: tem b2 e, principalmente, b5. Como não tem quinta justa, soa tenso e sem repouso, por isso é raro como centro tonal.",
      "Combina com acordes meio-diminutos (m7b5) do grau vii. Use-o mais como cor de passagem do que como escala principal.",
    ],
  },
};

export default async function ModoPage({
  params,
}: {
  params: Promise<{ modo: string }>;
}) {
  const { modo } = await params;
  const info = MODOS[modo];
  if (!info) notFound();

  const user = await requireUser();
  const lessonKey = `modos-gregos.${modo}`;

  return (
    <AppShell userName={user.name}>
      <Link href="/modos-gregos" className="text-sm text-amber-700">
        ← Modos gregos
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">
        {info.titulo} <span className="text-neutral-400 text-lg">· grau {info.grau}</span>
      </h1>
      <p className="text-sm text-neutral-500 mt-1">
        Nota característica: <strong>{info.caracteristica}</strong>
      </p>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        {info.texto.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="card p-6 mt-4">
        <ThreeNpsExplorer scaleKey={info.scaleKey} defaultRoot="A" rootLabel={info.rootLabel} />
      </div>

      <GuiaEscala sistema="3nps" />

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Ideias para este modo</h2>
        <p>
          <strong>Ache a nota característica:</strong> toque a escala e pare na nota que
          dá nome ao modo. É ela que você precisa enfatizar para o modo "soar".
        </p>
        <p>
          <strong>Pedal:</strong> deixe a tônica soando (corda solta ou repetida) e
          toque a escala por cima. Assim o ouvido fixa a tônica e você ouve a cor do
          modo de verdade.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey={lessonKey} path={`/modos-gregos/${modo}`} />
      </div>
    </AppShell>
  );
}
