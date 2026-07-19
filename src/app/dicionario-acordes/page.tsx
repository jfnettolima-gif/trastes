import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ChordDictionaryView from "@/components/ChordDictionaryView";

export default async function DicionarioAcordesPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Dicionário de acordes</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Escolha uma <strong>tônica</strong> e um <strong>tipo de acorde</strong> e
          veja como montá-lo no braço. Assim como no resto do Trastes, os desenhos não
          são decorados: cada forma é calculada pela teoria, então funciona para
          qualquer um dos 12 tons.
        </p>
        <p>
          Para a maioria dos acordes você verá duas formas móveis, a com{" "}
          <strong>tônica na 6ª corda</strong> (família do Mi) e a com{" "}
          <strong>tônica na 5ª corda</strong> (família do Lá). São as duas pegadas de
          pestana que, movidas pelo braço, tocam qualquer acorde daquele tipo.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <ChordDictionaryView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Ligue com o CAGED:</strong> a forma de tônica na 6ª corda é a pestana
          de Mi; a de 5ª corda é a pestana de Lá. Reconhecer isso conecta o dicionário
          com o sistema CAGED que você já viu.
        </p>
        <p>
          <strong>Ouça a diferença:</strong> toque o mesmo tom trocando o tipo (maior,
          menor, com sétima, sétima maior...) e preste atenção em como a cor do acorde
          muda. É a terça e a sétima que mais definem esse caráter.
        </p>
        <p>
          <strong>Use nas progressões:</strong> monte com o dicionário os acordes das
          progressões e do campo harmônico que estudou nos outros módulos.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete
          lessonKey="dicionario-acordes.consulta"
          path="/dicionario-acordes"
        />
      </div>
    </AppShell>
  );
}
