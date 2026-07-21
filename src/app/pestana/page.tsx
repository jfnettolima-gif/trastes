import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import BarreChordsView from "@/components/BarreChordsView";

export default async function PestanaPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Acordes com pestana</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          A pestana é o que transforma um punhado de acordes abertos em todos os acordes do
          braço. Você deita o dedo indicador prendendo várias cordas numa casa (fazendo o
          papel da pestana do instrumento) e, atrás dele, monta a forma de um acorde aberto.
          Movendo essa mesma forma pelo braço, você toca qualquer tom.
        </p>
        <p>
          As duas formas que resolvem quase tudo são a <strong>forma de Mi</strong> (raiz na
          6ª corda) e a <strong>forma de Lá</strong> (raiz na 5ª corda). Escolha o acorde e
          veja onde cada uma cai, sempre calculado por teoria a partir da tônica.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <BarreChordsView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Ache a tônica primeiro:</strong> na forma de Mi, a nota mais grave (6ª
          corda) é o nome do acorde; na forma de Lá, é a 5ª corda. Saber isso de cor é o que
          te deixa achar qualquer acorde na hora.
        </p>
        <p>
          <strong>Force o indicador perto do traste:</strong> a maior dificuldade da pestana
          é fazer todas as cordas soarem. Deixe o dedo bem colado ao traste e use um pouco da
          lateral do dedo, não a polpa mole do centro.
        </p>
        <p>
          <strong>Conecte com o CAGED:</strong> essas formas móveis são exatamente as formas
          E e A do sistema CAGED. Depois de dominar a pestana, volte ao CAGED para ver como
          elas se encaixam com as outras três pelo braço.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="pestana.praticar" path="/pestana" />
      </div>
    </AppShell>
  );
}
