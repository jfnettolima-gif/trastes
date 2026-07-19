import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#241a12] text-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">🎸 Trastes</h1>
        <p className="mt-4 text-lg text-amber-100/80">
          Aprenda guitarra do jeito certo: escalas, braço interativo, teoria aplicada
          e improvisação, passo a passo.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/login" className="btn-primary">
            Entrar
          </Link>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-6 text-left">
          <div className="rounded-xl bg-white/[0.06] border border-white/10 p-5 text-amber-50">
            <h3 className="font-semibold text-amber-200">Braço interativo</h3>
            <p className="text-sm text-amber-100/80 mt-1">
              Clique em qualquer casa, ouça a nota e veja o intervalo em tempo real.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.06] border border-white/10 p-5 text-amber-50">
            <h3 className="font-semibold text-amber-200">Progressão pedagógica</h3>
            <p className="text-sm text-amber-100/80 mt-1">
              Um plano de estudo montado a partir do seu nível e dos seus objetivos.
            </p>
          </div>
          <div className="rounded-xl bg-white/[0.06] border border-white/10 p-5 text-amber-50">
            <h3 className="font-semibold text-amber-200">Da escala à música</h3>
            <p className="text-sm text-amber-100/80 mt-1">
              Não é só decorar desenho: você entende a teoria e aplica em improviso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
