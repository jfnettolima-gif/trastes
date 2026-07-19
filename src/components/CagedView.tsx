"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  cagedShapesOrdered,
  CagedResult,
  frequencyAt,
  INTERVAL_LABELS,
  NoteName,
} from "@/lib/music";
import { playTone } from "@/lib/audio";

const STRING_SHORT = ["6", "5", "4", "3", "2", "1"];

function ChordDiagram({ res, rootNote }: { res: CagedResult; rootNote: NoteName }) {
  const displayStart = res.minFret === 0 ? 0 : res.minFret - 1;
  const displayEnd = Math.max(res.maxFret, displayStart + 3);
  const cols = Array.from(
    { length: displayEnd - displayStart + 1 },
    (_, i) => displayStart + i
  );

  function strum() {
    let i = 0;
    res.frets.forEach((f, s) => {
      if (f === null) return;
      setTimeout(() => playTone(frequencyAt(s, f), 0.9), i * 70);
      i++;
    });
  }

  return (
    <div className="card p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-bold text-amber-800">
          Forma {res.shape}
          <span className="text-xs font-normal text-neutral-500 ml-2">
            casa {res.minFret}
            {res.minFret !== res.maxFret ? `–${res.maxFret}` : ""}
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
          {res.frets.map((fret, s) => (
            <div key={s} className="flex items-center">
              <div className="w-6 text-[10px] text-amber-100/80 text-right pr-1">
                {fret === null ? "✕" : STRING_SHORT[s]}
              </div>
              {cols.map((col) => {
                const on = fret === col;
                const role = res.roles[s];
                const isRoot = role === 0;
                return (
                  <div
                    key={col}
                    className="w-8 h-8 relative border-r border-amber-100/20 flex items-center justify-center"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                    {on && role !== null && (
                      <span
                        className={`z-10 flex items-center justify-center rounded-full text-[10px] font-semibold w-6 h-6
                          ${isRoot ? "bg-rose-500 text-white" : "bg-sky-400 text-white"}`}
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

export default function CagedView({ defaultRoot = "C" }: { defaultRoot?: NoteName }) {
  const [rootNote, setRootNote] = useState<NoteName>(defaultRoot);
  const shapes = useMemo(() => cagedShapesOrdered(rootNote), [rootNote]);

  return (
    <div>
      <div className="flex items-center gap-2 text-sm mb-4">
        <label>Acorde maior de:</label>
        <select
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value as NoteName)}
          className="border rounded px-2 py-1"
        >
          {ALL_NOTES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shapes.map((res) => (
          <ChordDiagram key={res.shape} res={res} rootNote={rootNote} />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-3">
        As formas estão em ordem de posição no braço, da mais grave para a mais aguda.
        Bolinha vermelha = tônica, azul = terça ou quinta. ✕ = corda que não deve soar.
      </p>
    </div>
  );
}
