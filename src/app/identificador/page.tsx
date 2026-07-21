import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import ReverseIdentifier from "@/components/ReverseIdentifier";

export default async function IdentificadorPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Identificador reverso</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          O caminho contrário das outras telas: aqui <strong>você</strong> marca notas no
          braço e o Trastes descobre que acorde elas formam e em quais escalas elas cabem.
          É perfeito para quando você acha um som bonito no violão e quer saber o nome do
          que tocou, ou para conferir uma pestana que montou de ouvido.
        </p>
        <p>
          Como tudo no app, a resposta é deduzida na hora: as classes de altura que você
          marcou são comparadas com todos os acordes e escalas conhecidos, em todas as
          tônicas. Nada de tabela decorada.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <ReverseIdentifier />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como usar no estudo</h2>
        <p>
          <strong>Confira acordes que você monta de ouvido:</strong> montou uma pestana
          diferente e não sabe o nome? Marque as notas dela e veja como o acorde se chama
          e quais tensões ele tem.
        </p>
        <p>
          <strong>Descubra a escala de um riff:</strong> marque as notas de um trecho
          melódico e veja em que escalas ele cabe. As primeiras da lista são as mais
          prováveis, e dão o atalho para achar o resto do desenho no braço.
        </p>
        <p>
          <strong>Estude inversões:</strong> como a identificação é por nome de nota, você
          pode tocar o mesmo acorde em posições diferentes do braço e confirmar que é o
          mesmo acorde, só com as notas em outra ordem.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="identificador.usar" path="/identificador" />
      </div>
    </AppShell>
  );
}
