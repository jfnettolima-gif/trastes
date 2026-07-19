import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ThreeNpsExplorer from "@/components/ThreeNpsExplorer";
import GuiaEscala from "@/components/GuiaEscala";
import { ScaleKey } from "@/lib/music";

const TIPOS: Record<
  string,
  { titulo: string; scaleKey: ScaleKey; formula: string; texto: string[] }
> = {
  natural: {
    titulo: "Menor natural",
    scaleKey: "menorNatural",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - b7",
    texto: [
      "É a escala menor mais comum, a base do rock e do pop em tom menor. É também o 6º modo da escala maior (o modo eólio): a menor natural de Lá tem exatamente as mesmas notas que a maior de Dó.",
      "Compare com a pentatônica menor: a menor natural é a pentatônica menor com duas notas a mais (a 2ª e a b6). Se você já conhece a pentatônica, foque em ouvir essas duas notas novas.",
    ],
  },
  harmonica: {
    titulo: "Menor harmônica",
    scaleKey: "menorHarmonica",
    formula: "1 - 2 - b3 - 4 - 5 - b6 - 7",
    texto: [
      "Pegue a menor natural e suba a sétima em um semitom (de b7 para 7). Essa 7ª maior cria um forte puxão de volta para a tônica, o que a torna ideal sobre o acorde dominante em tons menores.",
      "O intervalo de um tom e meio entre a b6 e a 7 dá aquele sabor exótico, meio árabe/flamenco, que é a marca registrada dessa escala.",
    ],
  },
  melodica: {
    titulo: "Menor melódica",
    scaleKey: "menorMelodica",
    formula: "1 - 2 - b3 - 4 - 5 - 6 - 7",
    texto: [
      "É quase uma escala maior: só muda a terça, que é menor (b3). Por isso soa ao mesmo tempo menor e moderna, muito usada no jazz.",
      "Na teoria clássica ela sobe assim e desce como menor natural, mas no improviso moderno costuma-se usar essa mesma forma subindo e descendo.",
    ],
  },
};

export default async function EscalaMenorPage({
  params,
}: {
  params: Promise<{ tipo: string }>;
}) {
  const { tipo } = await params;
  const info = TIPOS[tipo];
  if (!info) notFound();

  const user = await requireUser();
  const lessonKey = `escalas-menores.${tipo}`;

  return (
    <AppShell userName={user.name}>
      <Link href="/escalas-menores" className="text-sm text-amber-700">
        ← Escalas menores
      </Link>
      <h1 className="text-2xl font-bold text-amber-900 mt-2">{info.titulo}</h1>
      <p className="text-sm text-neutral-500 mt-1">
        Fórmula: <strong>{info.formula}</strong>
      </p>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        {info.texto.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="card p-6 mt-4">
        <ThreeNpsExplorer scaleKey={info.scaleKey} defaultRoot="A" rootLabel="menor" />
      </div>

      <GuiaEscala sistema="3nps" />

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Ideias para esta escala</h2>
        <p>
          <strong>Percorra as 7 posições:</strong> use os botões de posição acima para
          tocar a mesma escala em diferentes pontos do braço, sempre da mais grave para
          a mais aguda, conectando uma na outra.
        </p>
        <p>
          <strong>Ouça a diferença:</strong> toque a menor natural e depois esta escala
          na mesma tônica, prestando atenção só na nota que muda. É ela que dá a cor.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey={lessonKey} path={`/escalas-menores/${tipo}`} />
      </div>
    </AppShell>
  );
}
