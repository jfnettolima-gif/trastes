import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#241a12] text-amber-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center py-20">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-300/70">
            Estudo de guitarra
          </p>

          <h1 className="mt-5 text-6xl sm:text-7xl font-semibold tracking-tight">
            Trastes
          </h1>

          <div className="mx-auto mt-6 h-px w-16 bg-amber-400/40" />

          <p className="mt-6 text-base sm:text-lg text-amber-100/70 leading-relaxed">
            Escalas, braço interativo, teoria aplicada e improvisação.
            Do primeiro acorde ao solo, passo a passo.
          </p>

          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-10 py-3 font-medium text-[#241a12] transition-colors hover:bg-amber-400"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>

      <footer className="pb-8 text-center text-xs text-amber-100/30">
        Acesso restrito · fale com o administrador para obter sua conta
      </footer>
    </div>
  );
}
