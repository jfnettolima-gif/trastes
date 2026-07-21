"use client";

import { useState } from "react";
import Link from "next/link";
import { REPERTORIO, Musica } from "@/lib/repertorio";
import { parseChord } from "@/lib/improv";
import { playTone } from "@/lib/audio";

// Frequência de uma classe de altura em torno de Dó3 (registro de acorde).
function noteFreq(pc: number) {
  return 130.81 * Math.pow(2, pc / 12);
}

// Toca um acorde cifrado arpejado, deduzindo a tríade do próprio cifrado.
function tocarCifra(raw: string) {
  const ch = parseChord(raw);
  if (!ch) return;
  const third = ch.triad === "menor" || ch.triad === "diminuto" ? 3 : 4;
  const fifth = ch.triad === "diminuto" ? 6 : ch.triad === "aumentado" ? 8 : 7;
  [0, third, fifth, 12].forEach((iv, i) => {
    setTimeout(() => playTone(noteFreq((ch.rootPc + iv) % 12), 0.8), i * 90);
  });
}

function tocarSequencia(cifras: string[]) {
  cifras.forEach((c, i) => {
    setTimeout(() => tocarCifra(c), i * 700);
  });
}

function MusicaCard({ m }: { m: Musica }) {
  return (
    <div className="rounded-lg border border-amber-800/20 bg-white p-5">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-amber-900">{m.titulo}</h3>
          <p className="text-xs text-neutral-500">
            {m.estilo} · tom de {m.tom}
          </p>
        </div>
        <span className="text-xs rounded-full bg-amber-100 text-amber-900 px-2.5 py-1">
          {m.estilo}
        </span>
      </div>

      <p className="text-sm text-neutral-600 mt-2 leading-relaxed">{m.descricao}</p>

      {m.secoes.map((sec) => (
        <div key={sec.nome} className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-amber-800">{sec.nome}</p>
            <button
              onClick={() => tocarSequencia(sec.cifra)}
              className="text-xs text-amber-700 hover:text-amber-900"
            >
              ▶ tocar a sequência
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sec.cifra.map((c, i) => (
              <button
                key={c + i}
                onClick={() => tocarCifra(c)}
                title={`Ouvir ${c}`}
                className="rounded-md border border-amber-800/25 bg-amber-50/60 px-3 py-1.5 text-sm font-semibold text-amber-800 hover:bg-amber-100"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 rounded-md bg-amber-50 border border-amber-200 p-3 text-sm text-neutral-700">
        🎯 Para solar: <strong>{m.escalaDica}</strong>.
      </div>

      <div className="flex flex-wrap gap-3 mt-3 text-sm">
        <Link
          href={`/assistente-improviso?prog=${encodeURIComponent(
            m.progressaoParaAnalise
          )}`}
          className="text-amber-700 underline"
        >
          Analisar no assistente de improviso
        </Link>
        <Link href="/backing-tracks" className="text-amber-700 underline">
          Praticar com backing track
        </Link>
      </div>
    </div>
  );
}

export default function RepertorioView() {
  const estilos = Array.from(new Set(REPERTORIO.map((m) => m.estilo)));
  const [filtro, setFiltro] = useState<string | null>(null);

  const lista = filtro
    ? REPERTORIO.filter((m) => m.estilo === filtro)
    : REPERTORIO;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFiltro(null)}
          className={`text-xs rounded-full px-3 py-1 border ${
            filtro === null
              ? "bg-amber-800 text-white border-amber-800"
              : "border-amber-800/25 hover:bg-amber-50"
          }`}
        >
          Todos
        </button>
        {estilos.map((e) => (
          <button
            key={e}
            onClick={() => setFiltro(e)}
            className={`text-xs rounded-full px-3 py-1 border ${
              filtro === e
                ? "bg-amber-800 text-white border-amber-800"
                : "border-amber-800/25 hover:bg-amber-50"
            }`}
          >
            {e}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {lista.map((m) => (
          <MusicaCard key={m.id} m={m} />
        ))}
      </div>
    </div>
  );
}
