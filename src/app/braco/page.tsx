import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import Fretboard from "@/components/Fretboard";

export default async function BracoPage() {
  const user = await requireUser();

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Braço interativo</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Escolha uma tônica e uma escala, ou veja todas as notas. Clique em qualquer
        casa para ouvir o som e ver o nome da nota e o intervalo.
      </p>
      <Fretboard fretStart={0} fretEnd={15} />
    </AppShell>
  );
}
