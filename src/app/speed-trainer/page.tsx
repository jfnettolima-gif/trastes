import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import SpeedTrainer from "@/components/SpeedTrainer";

export default async function SpeedTrainerPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Speed trainer</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Velocidade se ganha subindo o metrônomo aos poucos, sempre tocando limpo antes
          de acelerar. Este treinador faz isso sozinho: você toca alguns compassos num
          andamento, ele sobe o BPM no passo que você escolheu e segue, até o teto. Assim
          você foca no que está tocando em vez de ficar mexendo no metrônomo.
        </p>
        <p>
          Use com qualquer coisa: uma escala, um lick, uma troca de acordes. O recorde de
          BPM que você alcançou fica salvo neste aparelho.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <SpeedTrainer />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Comece devagar de verdade:</strong> o andamento inicial tem que ser
          aquele em que você toca sem NENHUM erro e relaxado. Se está apertado já no
          começo, abaixe.
        </p>
        <p>
          <strong>Passo pequeno:</strong> subir de 3 a 5 BPM por vez é quase imperceptível
          para a mão, e é justamente por isso que funciona. Se errar num passo, pare,
          volte um degrau e fique nele até limpar.
        </p>
        <p>
          <strong>Qualidade acima de velocidade:</strong> o objetivo não é bater recorde,
          é chegar rápido tocando com o mesmo capricho do andamento lento. Grave-se de vez
          em quando para conferir.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="speed-trainer.praticar" path="/speed-trainer" />
      </div>
    </AppShell>
  );
}
