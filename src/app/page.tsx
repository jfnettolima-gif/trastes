import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#241a12] text-amber-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mx-auto w-64 sm:w-80 rounded-2xl overflow-hidden border border-amber-100/15 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
          <Image
            src="/img/les-paul.jpg"
            alt="Guitarras Gibson Les Paul"
            width={1103}
            height={1188}
            priority
            className="w-full h-auto"
          />
        </div>

        <h1 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight">Trastes</h1>
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

        <p className="mt-10 text-[11px] text-amber-100/25">
          Foto: Gibson Les Paul Standard · Lightburst, CC BY-SA 4.0 (Wikimedia Commons)
        </p>
      </div>
    </div>
  );
}
