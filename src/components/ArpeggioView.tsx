"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  frequencyAt,
  INTERVAL_LABELS,
  NoteName,
  noteNameFromPitchClass,
  pitchClass,
  pitchClassAt,
  STRING_LABELS,
} from "@/lib/music";
import { playTone } from "@/lib/audio";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21]);
const DOUBLE_MARKER = new Set([12, 24]);

export type ArpeggioKey =
  | "maior"
  | "menor"
  | "diminuto"
  | "aumentado"
  | "maior7"
  | "menor7"
  | "dominante7"
  | "meioDiminuto";

export const ARPEGGIOS: Record<
  ArpeggioKey,
  { label: string; intervals: number[]; formula: string; symbol: string }
> = {
  maior: { label: "Maior", intervals: [0, 4, 7], formula: "1 - 3 - 5", symbol: "" },
  menor: { label: "Menor", intervals: [0, 3, 7], formula: "1 - b3 - 5", symbol: "m" },
  diminuto: { label: "Diminuto", intervals: [0, 3, 6], formula: "1 - b3 - b5", symbol: "dim" },
  aumentado: { label: "Aumentado", intervals: [0, 4, 8], formula: "1 - 3 - #5", symbol: "aug" },
  maior7: { label: "Maior com 7ª maior", intervals: [0, 4, 7, 11], formula: "1 - 3 - 5 - 7", symbol: "7M" },
  menor7: { label: "Menor com 7ª", intervals: [0, 3, 7, 10], formula: "1 - b3 - 5 - b7", symbol: "m7" },
  dominante7: { label: "Dominante (7)", intervals: [0, 4, 7, 10], formula: "1 - 3 - 5 - b7", symbol: "7" },
  meioDiminuto: { label: "Meio-diminuto", intervals: [0, 3, 6, 10], formula: "1 - b3 - b5 - b7", symbol: "m7b5" },
};

const FRET_START = 0;
const FRET_END = 12;

export default function ArpeggioView({
  defaultRoot = "A",
  defaultType = "maior",
}: {
  defaultRoot?: NoteName;
  defaultType?: ArpeggioKey;
}) {
  const [rootNote, setRootNote] = useState<NoteName>(defaultRoot);
  const [type, setType] = useState<ArpeggioKey>(defaultType);
  const [selected, setSelected] = useState<{ string: number; fret: number } | null>(null);

  const rootPc = pitchClass(rootNote);
  const arp = ARPEGGIOS[type];
  const intervalSet = useMemo(() => new Set(arp.intervals), [arp]);

  const frets = Array.from({ length: FRET_END - FRET_START + 1 }, (_, i) => FRET_START + i);

  function handleClick(stringIndex: number, fret: number) {
    setSelected({ string: stringIndex, fret });
    playTone(frequencyAt(stringIndex, fret));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
        <label className="flex items-center gap-2">
          Tônica
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
        </label>
        <label className="flex items-center gap-2">
          Acorde
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ArpeggioKey)}
            className="border rounded px-2 py-1"
          >
            {Object.entries(ARPEGGIOS).map(([key, a]) => (
              <option key={key} value={key}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
        <span className="text-neutral-500">
          {rootNote}
          {arp.symbol} · fórmula {arp.formula}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3">
        <div className="flex ml-16">
          {frets.map((f) => (
            <div key={f} className="shrink-0 text-center text-[11px] text-amber-100/70 w-12">
              {f}
              {DOUBLE_MARKER.has(f) ? " ●●" : FRET_MARKERS.has(f) ? " ●" : ""}
            </div>
          ))}
        </div>

        {Array.from({ length: 6 }, (_, stringIndex) => (
          <div key={stringIndex} className="flex items-center">
            <div className="w-16 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {STRING_LABELS[stringIndex]}
            </div>
            {frets.map((f) => {
              const pc = pitchClassAt(stringIndex, f);
              const rel = ((pc - rootPc) % 12 + 12) % 12;
              const inArp = intervalSet.has(rel);
              const isRoot = rel === 0;
              const isSel = selected?.string === stringIndex && selected.fret === f;
              return (
                <button
                  key={f}
                  onClick={() => handleClick(stringIndex, f)}
                  title={`${noteNameFromPitchClass(pc)} · casa ${f}`}
                  className={`shrink-0 relative border-r border-amber-100/20 flex items-center justify-center w-12 h-11
                    ${f === 0 ? "border-r-2 border-r-amber-100/60" : ""}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                  {inArp && (
                    <span
                      className={`z-10 flex items-center justify-center rounded-full text-[11px] font-semibold w-8 h-8
                        ${isRoot ? "bg-rose-500 text-white" : "bg-sky-400 text-white"}
                        ${isSel ? "ring-2 ring-yellow-300" : ""}`}
                    >
                      {INTERVAL_LABELS[rel].short}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selected && (
        <p className="mt-3 text-sm text-neutral-600">
          Você clicou na <strong>{STRING_LABELS[selected.string]}</strong>, casa{" "}
          <strong>{selected.fret}</strong>: nota{" "}
          <strong>{noteNameFromPitchClass(pitchClassAt(selected.string, selected.fret))}</strong>.
        </p>
      )}
    </div>
  );
}
