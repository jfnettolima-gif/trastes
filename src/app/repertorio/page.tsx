import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import RepertorioView from "@/components/RepertorioView";

export default async function RepertorioPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Repertório de cifra viva</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Aqui a teoria vira música de verdade. Cada progressão tem os acordes clicáveis
          (clique para ouvir, ou toque a sequência inteira), a dica de qual escala usar
          para solar e um atalho para analisar a roda no assistente de improviso.
        </p>
        <p>
          São formas clássicas e músicas de domínio público, escolhidas por ensinarem algo:
          o blues de 12 compassos, a roda pop de quatro acordes, o ii–V–I do jazz, o Canon.
          Aprenda uma e você reconhece dezenas de músicas que usam a mesma base.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <RepertorioView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Troque limpo antes de tudo:</strong> toque a roda de acordes bem devagar
          com o metrônomo, focando em não deixar buraco na troca. Uma progressão bem tocada
          já é música.
        </p>
        <p>
          <strong>Depois solte por cima:</strong> use a escala indicada e improvise sobre a
          backing track. Volte ao assistente de improviso para ver a função de cada acorde
          e as notas-alvo.
        </p>
        <p>
          <strong>Colecione bases:</strong> quando dominar uma progressão, você a
          reconhece em outras músicas. Vá somando essas rodas ao seu repertório e o braço
          inteiro começa a fazer sentido.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="repertorio.explorar" path="/repertorio" />
      </div>
    </AppShell>
  );
}
