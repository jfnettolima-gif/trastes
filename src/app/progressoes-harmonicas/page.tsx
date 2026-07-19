import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ProgressionView from "@/components/ProgressionView";

export default async function ProgressoesHarmonicasPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Progressões harmônicas</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Uma progressão é uma sequência de acordes que se repete e sustenta uma
          música. Em vez de decorar acordes soltos, pensamos em <strong>graus</strong>{" "}
          (I, ii, iii, IV, V, vi, vii°), os acordes que nascem do campo harmônico do
          tom. Assim a mesma progressão funciona em qualquer tonalidade: muda o nome dos
          acordes, mas a relação entre eles é sempre a mesma.
        </p>
        <p>
          O <strong>I</strong> é o repouso (a casa), o <strong>V</strong> é a maior
          tensão (quer voltar pro I) e o <strong>IV</strong> é o movimento intermediário.
          Quase toda a música popular ocidental é feita com combinações desses três,
          mais a relativa menor (<strong>vi</strong>).
        </p>
      </div>

      <div className="card p-6 mt-4">
        <ProgressionView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como treinar</h2>
        <p>
          Escolha um tom, toque a progressão para ouvir a relação entre os acordes e
          depois tente tocá-la no braço usando as formas do CAGED. Troque o tom e repita:
          perceba que a sensação (repouso, tensão, resolução) continua igual mesmo com
          acordes de nomes diferentes.
        </p>
        <p>
          <strong>ii - V - I</strong> é a cadência mais importante do jazz e{" "}
          <strong>I - V - vi - IV</strong> é a base de milhares de músicas pop. Domine
          essas duas e você reconhece a estrutura da maioria das canções.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete
          lessonKey="progressoes-harmonicas.teoria"
          path="/progressoes-harmonicas"
        />
      </div>
    </AppShell>
  );
}
