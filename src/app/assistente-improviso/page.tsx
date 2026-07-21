import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ImprovAssistant from "@/components/ImprovAssistant";

export default async function AssistenteImprovisoPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Assistente de improviso</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Cole os acordes de uma música e o Trastes deduz o tom, mostra a função de cada
          acorde (grau e modo) e diz qual escala usar para solar por cima. Nada aqui é
          decorado: o tom é descoberto testando os doze campos harmônicos maiores e vendo
          em qual deles os seus acordes melhor se encaixam.
        </p>
        <p>
          A ideia é tirar você da decoreba de &ldquo;forminha&rdquo; e te fazer entender
          <strong> por que</strong> uma escala funciona na música inteira, e como cada
          acorde abre uma nota-alvo diferente para o seu solo.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <ImprovAssistant />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como usar no estudo</h2>
        <p>
          <strong>Comece pela escala única:</strong> pegue a escala que encaixa na música
          toda (a maior do tom, ou a pentatônica da relativa menor) e solte por cima da
          backing track sem pensar em acorde. É o jeito mais rápido de já sair um som que
          combina.
        </p>
        <p>
          <strong>Depois pense acorde a acorde:</strong> em cada acorde, mire nas notas do
          próprio arpejo (as bolinhas que caem em cima da harmonia). É isso que faz o solo
          parecer que &ldquo;conversa&rdquo; com a música em vez de só passear na escala.
        </p>
        <p>
          <strong>Acordes fora do tom</strong> (marcados em vermelho) são acordes
          emprestados ou modulações. Neles, o mais seguro é focar nas notas do próprio
          acorde, porque a escala do tom principal pode ter uma nota que briga com ele.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="assistente-improviso.usar" path="/assistente-improviso" />
      </div>
    </AppShell>
  );
}
