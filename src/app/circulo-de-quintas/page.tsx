import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import CircleOfFifths from "@/components/CircleOfFifths";

export default async function CirculoDeQuintasPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Círculo das quintas</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          O círculo das quintas é um mapa de todas as 12 tonalidades. Andando no
          sentido horário, cada tom é uma <strong>quinta acima</strong> do anterior
          (Dó → Sol → Ré...), e a cada passo ganha-se um <strong>sustenido</strong>.
          No sentido anti-horário, cada passo é uma quarta acima e ganha-se um{" "}
          <strong>bemol</strong>.
        </p>
        <p>
          Ele serve para: saber a armadura de clave de cada tom, achar a{" "}
          <strong>relativa menor</strong> de cada tom maior (o nome menor dentro de
          cada bolinha), e entender por que certos acordes andam tão bem juntos, tons
          vizinhos no círculo compartilham quase todas as notas.
        </p>
      </div>

      <div className="card p-6 mt-4">
        <CircleOfFifths />
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como usar na prática</h2>
        <p>
          <strong>Vizinhos combinam:</strong> os acordes de um tom são, quase sempre,
          ele e seus vizinhos no círculo. Em Dó maior, os acordes principais (Dó, Fá,
          Sol) são o próprio Dó e os dois vizinhos imediatos.
        </p>
        <p>
          <strong>Cadência V → I:</strong> ir do vizinho da direita para o centro (Sol
          → Dó) é a resolução mais forte da música. É o movimento de quinta descendente
          que o círculo mostra visualmente.
        </p>
        <p>
          <strong>Transposição:</strong> para mudar uma música de tom, gire a mesma
          forma pelo círculo. As relações entre os acordes se mantêm.
        </p>
      </div>

      <div className="mt-6">
        <MarkComplete lessonKey="circulo-de-quintas.teoria" path="/circulo-de-quintas" />
      </div>
    </AppShell>
  );
}
