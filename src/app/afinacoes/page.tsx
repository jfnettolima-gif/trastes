import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import TuningExplorer from "@/components/TuningExplorer";

export default async function AfinacoesPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Afinações alternativas</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Mudar a afinação muda a nota de cada corda solta e, com isso, reorganiza todas
          as escalas e acordes no braço. Aqui você escolhe uma afinação e vê o desenho
          da escala se recalcular na hora, porque no Trastes nada é decorado: tudo é
          derivado da teoria.
        </p>
        <p>
          Comece pela <strong>Drop D</strong> e pela <strong>meio tom abaixo</strong>,
          as mais comuns no rock e no blues. As afinações <strong>abertas</strong> (open
          G, open D, open E) fazem as cordas soltas já formarem um acorde, ótimas para
          slide.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <TuningExplorer />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Ouça a corda solta:</strong> ao trocar a afinação, toque as cordas
          soltas (os botões acima do braço) para acostumar o ouvido com as novas notas
          graves antes de tocar qualquer coisa.
        </p>
        <p>
          <strong>Refaça a tônica:</strong> em Drop D e nas afinações abertas, a tônica
          costuma cair na 6ª corda solta. Ache as bolinhas vermelhas e reancore a mão.
        </p>
        <p>
          <strong>Cuidado real:</strong> afinar muito abaixo deixa as cordas frouxas.
          Para descer mais de um tom, o ideal é usar cordas mais grossas.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="afinacoes.explorar" path="/afinacoes" />
      </div>
    </AppShell>
  );
}
