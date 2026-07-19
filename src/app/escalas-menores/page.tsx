import Link from "next/link";
import { requireUser } from "@/lib/auth";
import AppShell from "@/components/AppShell";
import { getProgressMap } from "@/lib/progress";

export const ESCALAS_MENORES = [
  {
    tipo: "natural",
    titulo: "Menor natural",
    resumo: "O som melancólico padrão do menor. Fórmula 1 - 2 - b3 - 4 - 5 - b6 - b7.",
  },
  {
    tipo: "harmonica",
    titulo: "Menor harmônica",
    resumo:
      "A menor natural com a 7ª maior, criando aquele salto exótico entre b6 e 7.",
  },
  {
    tipo: "melodica",
    titulo: "Menor melódica",
    resumo: "Menor com 6ª e 7ª maiores; som moderno, muito usada no jazz.",
  },
] as const;

export default async function EscalasMenoresIndexPage() {
  const user = await requireUser();
  const progressMap = await getProgressMap(user.id);

  return (
    <AppShell userName={user.name}>
      <h1 className="text-2xl font-bold text-amber-900">Escalas menores</h1>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <p>
          Existem três escalas menores essenciais. Todas têm a terça menor (b3), que é
          o que dá o caráter "menor", mas mudam nas notas de cima, e cada mudança traz
          uma cor diferente.
        </p>
        <p>
          Como são escalas de 7 notas, elas usam o mesmo sistema de{" "}
          <strong>3 notas por corda</strong> da escala maior: 7 posições que cobrem o
          braço inteiro. Use o seletor de posição e de tônica em cada uma.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {ESCALAS_MENORES.map((e) => {
          const key = `escalas-menores.${e.tipo}`;
          const concluida = progressMap.get(key)?.status === "concluido";
          return (
            <Link key={e.tipo} href={`/escalas-menores/${e.tipo}`} className="card p-5">
              <p className="text-lg font-bold text-amber-800">
                {concluida ? "✓ " : ""}
                {e.titulo}
              </p>
              <p className="text-sm text-neutral-600 mt-1">{e.resumo}</p>
            </Link>
          );
        })}
      </div>
    </AppShell>
  );
}
