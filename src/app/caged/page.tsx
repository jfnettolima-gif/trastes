import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import CagedView from "@/components/CagedView";

export default async function CagedPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Sistema CAGED</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          CAGED é um mapa do braço baseado em 5 formas de acorde que você provavelmente
          já conhece dos acordes abertos: <strong>C, A, G, E e D</strong>. A ideia é que
          essas 5 formas, movidas para cima do braço, conseguem tocar{" "}
          <strong>qualquer</strong> acorde maior, e que elas se conectam em sequência,
          sempre nessa ordem: C → A → G → E → D → (volta ao C uma oitava acima).
        </p>
        <p>
          Por exemplo, o acorde de Dó pode ser tocado como a forma de Dó aberta, e
          também como uma forma de Lá mais acima, uma forma de Sol, uma forma de Mi e
          uma forma de Ré, todas soando Dó maior, só que em posições diferentes.
        </p>
        <p>
          Isso é poderoso por dois motivos: você aprende a tocar o mesmo acorde no braço
          inteiro, e cada forma vira uma "âncora" para achar as escalas e os arpejos
          daquele acorde ao redor dela.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <CagedView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Uma tônica, cinco lugares:</strong> escolha um acorde acima e toque as
          5 formas de baixo para cima no braço, dizendo o nome da forma em voz alta.
        </p>
        <p>
          <strong>Ache as tônicas:</strong> em cada forma, localize as bolinhas
          vermelhas. Saber onde está a tônica de cada forma é o que faz o sistema
          funcionar de verdade.
        </p>
        <p>
          <strong>Conecte com as escalas:</strong> cada forma CAGED fica "dentro" de uma
          posição da escala maior e do arpejo daquele acorde. Depois de decorar as
          formas, sobreponha mentalmente a escala em volta de cada uma.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="caged.teoria" path="/caged" />
      </div>
    </AppShell>
  );
}
