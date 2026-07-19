import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import Metronome from "@/components/Metronome";

export default async function MetronomoPage() {
  const user = await requireUser();
  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Metrônomo</h1>
      <p className="text-neutral-600 mt-1 mb-6">
        Estude sempre com metrônomo. Comece devagar e só aumente o BPM quando tocar
        sem erros.
      </p>
      <Metronome />
    </AppShell>
  );
}
