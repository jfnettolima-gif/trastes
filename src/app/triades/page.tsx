import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import TriadsView from "@/components/TriadsView";

export default async function TriadesPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Tríades no braço</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          A tríade é o acorde na sua forma mais enxuta: só três notas, a{" "}
          <strong>tônica</strong>, a <strong>terça</strong> e a <strong>quinta</strong>.
          Tocando essas três notas em cordas vizinhas você tem uma versão pequena e móvel
          do acorde, que cabe em qualquer canto do braço e serve de ponte entre os acordes
          abertos e as escalas.
        </p>
        <p>
          Subindo a nota mais grave para o topo, a mesma tríade aparece em três posições, as{" "}
          <strong>inversões</strong>. Dominar as três em cada conjunto de cordas é o que
          destrava o sweep, as viradas e o acompanhamento com acordes leves lá no agudo.
          Escolha a tônica, a qualidade e o conjunto de cordas, tudo sai calculado por
          teoria.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <TriadsView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Enxergue a tônica:</strong> em cada inversão, saiba qual das três notas é
          a tônica (bolinha vermelha). É ela que dá o nome ao acorde e te orienta quando
          você move a forma pelo braço.
        </p>
        <p>
          <strong>Ligue as inversões:</strong> toque a fundamental, depois a 1ª e a 2ª
          inversão subindo pelo mesmo conjunto de cordas. Perceba que é sempre o mesmo
          acorde, só reempilhado. Isso cria caminhos suaves para acompanhar uma música.
        </p>
        <p>
          <strong>Use no sweep e nos arpejos:</strong> quando varrer uma tríade, você está
          tocando exatamente estas três notas. Volte aqui para saber QUAIS notas está
          varrendo, em vez de decorar a forma no escuro.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="triades.explorar" path="/triades" />
      </div>
    </AppShell>
  );
}
