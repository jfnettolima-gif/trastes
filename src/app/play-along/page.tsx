import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import LickPlayer from "@/components/LickPlayer";

export default async function PlayAlongPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Play-along de licks</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Ver e ouvir uma frase andando no braço, nota por nota, no tempo, é o jeito mais
          rápido de tirar um lick sem depender de tablatura escrita. Escolha uma frase,
          diminua o andamento e toque junto acompanhando a bolinha vermelha.
        </p>
        <p>
          Todos os licks aqui vivem no <strong>desenho 1 da pentatônica de Lá menor</strong>
          (a partir da 5ª casa), o mesmo que você estuda na tela das escalas. Assim a frase
          não é um truque solto: ela mora dentro de um desenho que você já conhece.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <LickPlayer />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Primeiro só olhe e ouça</strong> uma ou duas vezes, sem tocar, para
          entender o caminho da frase no braço.
        </p>
        <p>
          <strong>Depois toque junto bem devagar,</strong> tentando bater a mesma nota no
          mesmo instante que a bolinha vermelha. Só suba o andamento quando estiver saindo
          limpo.
        </p>
        <p>
          <strong>Por fim, brinque com a frase:</strong> comece de outra nota, inverta o
          fim, junte dois licks. É assim que uma frase decorada vira improviso de verdade.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="play-along.praticar" path="/play-along" />
      </div>
    </AppShell>
  );
}
