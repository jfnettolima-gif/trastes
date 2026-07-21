import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ChordEarTrainer from "@/components/ChordEarTrainer";

export default async function TreinoAcordesPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Treino auditivo de acordes</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Reconhecer a <strong>qualidade</strong> de um acorde de ouvido (se é maior,
          menor, dominante, diminuto...) é o que te deixa tirar música sem ficar
          adivinhando forma por forma. Aqui o Trastes toca um acorde numa tônica sorteada,
          primeiro arpejado e depois em bloco, e você diz qual é a cor dele.
        </p>
        <p>
          O acorde muda de altura toda rodada de propósito: o objetivo é ouvir a
          <strong> relação entre as notas</strong> (a terça, a sétima), não decorar um som
          fixo.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <ChordEarTrainer />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Comece pelo par maior x menor:</strong> a diferença é só a terça (maior
          alegre, menor triste). Acerte esses dois com folga antes de se preocupar com os
          outros.
        </p>
        <p>
          <strong>Depois entram as sétimas:</strong> o dominante (7) soa tenso e
          &ldquo;pedindo&rdquo; para resolver; a sétima maior (7M) é a mesma base alegre
          porém mais suave e sofisticada.
        </p>
        <p>
          <strong>Cante a terça:</strong> ao ouvir o acorde, tente cantar a nota do meio.
          Se ela sai &ldquo;triste&rdquo;, é menor; se sai &ldquo;alegre&rdquo;, é maior.
          Isso treina o ouvido a ir direto no que define a qualidade.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="treino-acordes.praticar" path="/treino-acordes" />
      </div>
    </AppShell>
  );
}
