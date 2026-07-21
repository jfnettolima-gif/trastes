"use client";

import { useMemo, useState } from "react";
import { ALL_NOTES, frequencyAt, INTERVAL_LABELS, NoteName } from "@/lib/music";
import { CHORD_TYPES, ChordVoicing, chordVoicing } from "@/lib/chords";
import { playTone } from "@/lib/audio";

const STRING_SHORT = ["6", "5", "4", "3", "2", "1"];

// Qualidades que têm forma de pestana clássica (raiz na 6ª e/ou na 5ª corda).
const QUALIDADES = [
  { id: "maior", label: "Maior", base: "Mi / Lá" },
  { id: "menor", label: "Menor", base: "Mi menor / Lá menor" },
  { id: "dom7", label: "Com sétima (7)", base: "Mi7 / Lá7" },
  { id: "min7", label: "Menor com sétima (m7)", base: "Mim7 / Lám7" },
];

function BarreDiagram({
  voicing,
  formaLabel,
}: {
  voicing: ChordVoicing;
  formaLabel: string;
}) {
  // A pestana fica na menor casa tocada (onde o indicador prende as cordas).
  const barreFret = voicing.minFret;
  const displayStart = Math.max(0, barreFret - 1);
  const displayEnd = Math.max(voicing.maxFret, displayStart + 4);
  const cols = Array.from(
    { length: displayEnd - displayStart + 1 },
    (_, i) => displayStart + i
  );

  // A partir de qual corda a pestana prende (E-shape prende as 6, A-shape da 5ª).
  const firstString = voicing.frets.findIndex((f) => f !== null);

  function strum() {
    let i = 0;
    voicing.frets.forEach((f, s) => {
      if (f === null) return;
      setTimeout(() => playTone(frequencyAt(s, f), 1.2), i * 55);
      i++;
    });
  }

  return (
    <div className="rounded-lg border border-amber-800/20 bg-white p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-semibold text-amber-800 text-sm">
          {formaLabel}
          <span className="text-xs font-normal text-neutral-500 ml-2">
            pestana na casa {barreFret}
          </span>
        </p>
        <button onClick={strum} className="text-sm text-amber-700 hover:text-amber-900">
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
          {voicing.frets.map((fret, s) => (
            <div key={s} className="flex items-center">
              <div className="w-6 text-[10px] text-amber-100/80 text-right pr-1">
                {fret === null ? "✕" : STRING_SHORT[s]}
              </div>
              {cols.map((col) => {
                const on = fret === col;
                const role = voicing.roles[s];
                const isRoot = role === 0;
                // marca visual da pestana: casa do barré, das cordas que ela cobre
                const isBarre = col === barreFret && s >= firstString;
                return (
                  <div
                    key={col}
                    className="w-8 h-8 relative border-r border-amber-100/20 flex items-center justify-center"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                    {isBarre && !on && (
                      <span className="absolute inset-y-1 left-1/2 w-5 -translate-x-1/2 rounded-full bg-amber-200/25" />
                    )}
                    {on && role !== null && (
                      <span
                        className={`z-10 flex items-center justify-center rounded-full text-[10px] font-semibold w-6 h-6
                          ${isRoot ? "bg-rose-500 text-white" : "bg-sky-400 text-white"}
                          ${col === barreFret ? "ring-2 ring-amber-200/70" : ""}`}
                      >
                        {INTERVAL_LABELS[role].short}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BarreChordsView() {
  const [root, setRoot] = useState<NoteName>("G");
  const [qualId, setQualId] = useState("maior");

  const type = useMemo(
    () => CHORD_TYPES.find((t) => t.id === qualId) ?? CHORD_TYPES[0],
    [qualId]
  );

  // Formas de pestana: raiz na 6ª corda (família Mi) e na 5ª corda (família Lá).
  const formas = useMemo(() => {
    return type.shapes
      .filter(
        (sh) =>
          sh.name.includes("6ª corda") || sh.name.includes("5ª corda")
      )
      .map((sh) => ({
        label: sh.name.includes("6ª")
          ? "Forma de Mi (raiz na 6ª corda)"
          : "Forma de Lá (raiz na 5ª corda)",
        voicing: chordVoicing(root, sh),
      }));
  }, [root, type]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 items-start">
        <div>
          <p className="text-sm text-neutral-600 mb-2">Acorde (tônica)</p>
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
      </div>

      <div className="mt-5">
        <p className="text-sm text-neutral-600 mb-2">Qualidade</p>
        <div className="flex flex-wrap gap-2">
          {QUALIDADES.map((q) => (
            <button
              key={q.id}
              onClick={() => setQualId(q.id)}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                q.id === qualId
                  ? "border-amber-500 bg-amber-500 text-white"
                  : "border-amber-800/20 bg-white text-amber-800 hover:bg-amber-50"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {formas.map((f, i) => (
          <BarreDiagram key={i} voicing={f.voicing} formaLabel={f.label} />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        A <strong>pestana</strong> é o dedo indicador deitado prendendo várias cordas na
        mesma casa (destaque claro), fazendo o papel da pestana do violão. É por isso que
        a mesma forma, movida pelo braço, toca qualquer acorde: a forma de Mi tem a raiz
        na 6ª corda, a forma de Lá na 5ª. Bolinha vermelha = tônica; azul = demais notas.
      </p>
    </div>
  );
}
