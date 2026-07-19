import { requireUser } from "@/lib/auth";
import { ONBOARDING_QUESTIONS } from "@/content/onboarding";
import { salvarOnboarding } from "./actions";

export default async function OnboardingPage() {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-10">
      <div className="max-w-2xl mx-auto card p-8">
        <h1 className="text-2xl font-bold text-amber-900">
          Bem-vindo(a), {user.name.split(" ")[0]}!
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Responda estas perguntas rápidas para a gente montar seu plano de estudo
          personalizado. Não existe resposta errada.
        </p>

        <form action={salvarOnboarding} className="mt-8 space-y-6">
          {ONBOARDING_QUESTIONS.map((q) => (
            <div key={q.key}>
              <label className="block text-sm font-medium mb-1">{q.question}</label>
              {q.type === "select" ? (
                <select
                  name={q.key}
                  defaultValue={q.options?.[0]?.value}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                >
                  {q.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={q.key}
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                  placeholder="Responda com suas palavras"
                />
              )}
            </div>
          ))}

          <button type="submit" className="btn-primary w-full">
            Gerar meu plano de estudo
          </button>
        </form>
      </div>
    </div>
  );
}
