import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import BackingTrackView from "@/components/BackingTrackView";

export default async function BackingTracksPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Backing tracks</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Aqui você toca por cima de uma base de acompanhamento (bateria, baixo e
          acordes) em vários estilos e em qualquer tom. É a melhor forma de tirar as
          escalas do papel: em vez de decorar desenho, você usa as notas para fazer
          música dentro de um contexto real.
        </p>
        <p>
          Escolha um <strong>estilo</strong>, defina o <strong>tom</strong> e o{" "}
          <strong>andamento</strong>, aperte tocar e improvise com a{" "}
          <strong>escala sugerida</strong>. Comece devagar, ouça as notas que soam bem
          sobre cada acorde e vá aumentando o BPM.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <BackingTrackView />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como praticar</h2>
        <p>
          <strong>1. Ouça primeiro:</strong> deixe a base tocando e apenas escute, batendo
          o pé no tempo, antes de tocar qualquer nota.
        </p>
        <p>
          <strong>2. Notas-alvo:</strong> toque só as tônicas dos acordes no tempo forte
          de cada compasso. Depois vá preenchendo com o resto da escala.
        </p>
        <p>
          <strong>3. Frases curtas:</strong> crie pequenas frases de 2 a 4 notas e repita,
          variando. Música boa tem espaço, não precisa tocar o tempo todo.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="backing-tracks.pratica" path="/backing-tracks" />
      </div>
    </AppShell>
  );
}
