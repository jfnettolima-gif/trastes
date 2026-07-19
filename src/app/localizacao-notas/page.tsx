import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import MarkComplete from "@/components/MarkComplete";
import NoteFinderQuiz from "@/components/NoteFinderQuiz";

export default async function LocalizacaoNotasPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Localização das notas</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Uma nota aparece no topo. Clique em qualquer casa do braço onde essa nota
        existe. Existem várias posições certas para cada nota, tudo bem clicar em
        qualquer uma delas.
      </p>

      <div className="card p-6">
        <NoteFinderQuiz />
      </div>

      <div className="mt-6">
        <MarkComplete
          lessonKey="localizacao-notas.treino"
          path="/localizacao-notas"
          label="Marcar treino de hoje como concluído"
        />
      </div>
    </AppShell>
  );
}
