import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ArpeggioView from "@/components/ArpeggioView";

export default async function ArpejosPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Arpejos</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Arpejo é o acorde tocado nota por nota, em vez de todas juntas. Enquanto a
          escala tem 7 notas, o arpejo tem só as notas do acorde (a tríade tem 3: 1, 3
          e 5; com sétima, 4 notas). São as notas mais "certas" para mirar num solo,
          porque são exatamente as do acorde que está soando.
        </p>
        <p>
          O mapa abaixo mostra <strong>todas</strong> as notas do acorde escolhido ao
          longo do braço inteiro. As bolinhas vermelhas são a tônica; as azuis são as
          outras notas do acorde. Como tudo é calculado por teoria, funciona para
          qualquer tônica e qualquer tipo de acorde.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <ArpeggioView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como usar</h2>
        <p>
          <strong>Mire nas tônicas:</strong> ao improvisar, terminar as frases numa
          nota do arpejo (de preferência a tônica) faz o solo soar resolvido, mesmo com
          a escala inteira à disposição.
        </p>
        <p>
          <strong>Acompanhe a progressão:</strong> se a música vai de Dó para Sol,
          troque o arpejo junto com o acorde. Tocar o arpejo certo em cada acorde é a
          base do fraseado que "desenha" a harmonia.
        </p>
        <p>
          <strong>Compare com a escala:</strong> abra a pentatônica ou a escala maior
          da mesma tônica no braço interativo e note como o arpejo é um subconjunto
          dela, as notas mais fortes.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="arpejos.teoria" path="/arpejos" />
      </div>
    </AppShell>
  );
}
