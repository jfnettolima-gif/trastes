import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import OpenChordsView from "@/components/OpenChordsView";

export default async function AcordesAbertosPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Acordes abertos</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Estes são os primeiros acordes de todo guitarrista: formas na primeira posição
          que usam cordas soltas. Com meia dúzia deles você já toca centenas de músicas.
          Aqui cada corda mostra qual nota e qual intervalo ela toca, para você entender
          <strong> por que</strong> aquela digitação forma aquele acorde, e não só decorar
          a figura.
        </p>
        <p>
          Comece pelos mais fáceis (<strong>Mi menor</strong> e <strong>Mi maior</strong>,
          que usam as seis cordas) e vá somando. Depois use o treino de troca lá embaixo:
          trocar de acorde no tempo certo é o que separa quem trava de quem toca a música
          inteira.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <OpenChordsView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Uma nota de cada vez:</strong> monte o acorde e toque corda por corda
          (arpejado) para ouvir se cada uma soa limpa. Se abafar, ajuste o dedo mais perto
          do traste e mais na ponta do dedo.
        </p>
        <p>
          <strong>Foque na troca, não no acorde parado:</strong> escolha dois acordes no
          treino de troca, comece devagar e só suba o andamento quando a mudança sair sem
          buraco. As trocas clássicas para começar são Mi menor ↔ Dó, Sol ↔ Ré e Lá menor
          ↔ Mi.
        </p>
        <p>
          <strong>Antecipe:</strong> comece a mover os dedos para o próximo acorde antes de
          terminar a batida do atual. É esse pequeno adianto que elimina a pausa na troca.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="acordes-abertos.praticar" path="/acordes-abertos" />
      </div>
    </AppShell>
  );
}
