"use client";

import { useMemo, useState } from "react";
import { ALL_NOTES, frequencyAt, INTERVAL_LABELS, NoteName } from "@/lib/music";
import { playTone } from "@/lib/audio";
import {
  CONJUNTOS,
  TriadeQualidade,
  TriadeVoicing,
  triadeVoicings,
  triadeSimbolo,
} from "@/lib/triads";

const STRING_SHORT = ["6", "5", "4", "3", "2", "1"];

const QUALIDADES: { id: TriadeQualidade; label: string }[] = [
  { id: "maior", label: "Maior" },
  { id: "menor", label: "Menor" },
  { id: "diminuta", label: "Diminuta" },
  { id: "aumentada", label: "Aumentada" },
];

function TriadeDiagram({ voicing }: { voicing: TriadeVoicing }) {
  const displayStart = Math.max(0, voicing.minFret - 1);
  const displayEnd = Math.max(voicing.maxFret + 1, displayStart + 4);
  const cols = Array.from(
    { length: displayEnd - displayStart + 1 },
    (_, i) => displayStart + i
  );

  // Mapa corda -> nota tocada nesta tríade (as demais cordas ficam apagadas).
  const porCorda = new Map(voicing.notas.map((n) => [n.string, n]));

  function ouvir() {
    voicing.notas.forEach((n, i) => {
      setTimeout(() => playTone(frequencyAt(n.string, n.fret), 1.1), i * 260);
    });
  }

  return (
    <div className="rounded-lg border border-amber-800/20 bg-white p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-semibold text-amber-800 text-sm">
          {voicing.inversaoLabel}
          <span className="text-xs font-normal text-neutral-500 ml-2">
            casas {voicing.minFret}–{voicing.maxFret}
          </span>
        </p>
        <button onClick={ouvir} className="text-sm text-amber-700 hover:text-amber-900">
          ▶ ouvir
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-2 inline-block">
          <div className="flex ml-6">
            {cols.map((f) => (
              <div key={f} className="w-8 text-center text-[10px] text-amber-100/70">
                {f}
              </div>
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5].map((s) => {
            const nota = porCorda.get(s);
            return (
              <div key={s} className="flex items-center">
                <div className="w-6 text-[10px] text-amber-100/80 text-right pr-1">
                  {nota ? STRING_SHORT[s] : "✕"}
                </div>
                {cols.map((col) => {
                  const on = nota != null && nota.fret === col;
                  return (
                    <div
                      key={col}
                      className="w-8 h-8 relative border-r border-amber-100/20 flex items-center justify-center"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                      {on && (
                        <span
                          className={`z-10 flex items-center justify-center rounded-full text-[10px] font-semibold w-6 h-6
                            ${nota!.isRoot ? "bg-rose-500 text-white" : "bg-sky-400 text-white"}`}
                        >
                          {INTERVAL_LABELS[nota!.interval].short}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-neutral-500 mt-2">
        {voicing.notas
          .map((n) => `${n.noteName} (${INTERVAL_LABELS[n.interval].short})`)
          .join(" · ")}
      </p>
    </div>
  );
}

export default function TriadsView() {
  const [root, setRoot] = useState<NoteName>("C");
  const [qual, setQual] = useState<TriadeQualidade>("maior");
  const [conjId, setConjId] = useState(CONJUNTOS[0].id);

  const conjunto = useMemo(
    () => CONJUNTOS.find((c) => c.id === conjId) ?? CONJUNTOS[0],
    [conjId]
  );

  const voicings = useMemo(
    () => triadeVoicings(root, qual, conjunto.strings),
    [root, qual, conjunto]
  );

  const simbolo = triadeSimbolo(root, qual);

  return (
    <div>
      <div>
        <p className="text-sm text-neutral-600 mb-2">Tônica</p>
        <div className="flex flex-wrap gap-2 max-w-md">
          {ALL_NOTES.map((n) => (
            <button
              key={n}
              onClick={() => setRoot(n)}
              className={`w-10 h-10 rounded-lg border text-sm font-semibold ${
                n === root
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-amber-800/20 bg-white text-amber-800 hover:bg-amber-50"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-neutral-600 mb-2">Qualidade</p>
        <div className="flex flex-wrap gap-2">
          {QUALIDADES.map((q) => (
            <button
              key={q.id}
              onClick={() => setQual(q.id)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                q.id === qual
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-amber-800/20 bg-white text-amber-800 hover:bg-amber-50"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm text-neutral-600 mb-2">Conjunto de cordas</p>
        <div className="flex flex-wrap gap-2">
          {CONJUNTOS.map((c) => (
            <button
              key={c.id}
              onClick={() => setConjId(c.id)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                c.id === conjId
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-amber-800/20 bg-white text-amber-800 hover:bg-amber-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-lg font-mono font-bold text-amber-900">{simbolo}</span>
        <span className="text-sm text-neutral-500">
          as 3 inversões em {conjunto.label.toLowerCase()}
        </span>
      </div>

      <div className="mt-3 grid md:grid-cols-3 gap-4">
        {voicings.map((v) => (
          <TriadeDiagram key={v.inversao} voicing={v} />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        Cada tríade tem só 3 notas (tônica, terça e quinta). Ao subir a nota mais grave
        para o topo você gera as <strong>inversões</strong>: fundamental (tônica embaixo),
        1ª inversão (terça embaixo) e 2ª inversão (quinta embaixo). Bolinha vermelha =
        tônica; azul = terça e quinta. Tudo calculado por teoria a partir da tônica.
      </p>
    </div>
  );
}
