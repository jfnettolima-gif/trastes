import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import CampoHarmonicoView from "@/components/CampoHarmonicoView";

export default async function CampoHarmonicoPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Campo harmônico</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Campo harmônico é o conjunto de acordes que nasce de uma escala. A ideia é
          simples: sobre cada nota da escala, empilhamos terças usando{" "}
          <strong>só as notas da própria escala</strong>. Isso dá 7 acordes, um para
          cada grau.
        </p>
        <p>
          O mais importante: a "qualidade" de cada acorde (maior, menor ou diminuto)
          não é escolhida, ela <strong>cai naturalmente</strong> dos intervalos da
          escala. Na escala maior a ordem é sempre a mesma:{" "}
          <strong>maior, menor, menor, maior, maior, menor, diminuto</strong> (I ii
          iii IV V vi vii°). Isso vale para qualquer tom.
        </p>
        <p>
          É por isso que, sabendo o tom de uma música, você já sabe quais acordes
          provavelmente vão aparecer nela, e qual escala usar para improvisar por cima.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <CampoHarmonicoView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como usar</h2>
        <p>
          <strong>Progressões prontas:</strong> a maioria das músicas usa os graus I,
          IV, V e vi. Experimente tocar, em Dó maior, a sequência C - G - Am - F: é uma
          das progressões mais comuns da música pop.
        </p>
        <p>
          <strong>Relativa menor:</strong> troque a escala para "Menor natural" com a
          tônica Lá e compare, são os mesmos 7 acordes de Dó maior, só que começando
          por outro grau. Dó maior e Lá menor são relativos.
        </p>
        <p>
          <strong>Improviso:</strong> se todos os acordes de uma música vêm do campo
          harmônico de Dó maior, você pode improvisar com a escala de Dó maior (ou a
          pentatônica de Lá menor) sobre a música inteira.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="campo-harmonico.teoria" path="/campo-harmonico" />
      </div>
    </AppShell>
  );
}
