"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  asciiTabFromFrets,
  frequencyAt,
  INTERVAL_LABELS,
  NoteName,
  noteNameFromPitchClass,
  pitchClass,
  pitchClassAt,
  ScaleKey,
  STRING_LABELS,
  threeNotesPerStringPositions,
} from "@/lib/music";
import { playTone } from "@/lib/audio";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21]);
const DOUBLE_MARKER = new Set([12, 24]);

export default function ThreeNpsView({
  positionNumber,
  scaleKey = "escalaMaior",
  defaultRoot = "C",
  rootLabel = "maior",
}: {
  positionNumber: number;
  scaleKey?: ScaleKey;
  defaultRoot?: NoteName;
  rootLabel?: string;
}) {
  const [rootNote, setRootNote] = useState<NoteName>(defaultRoot);
  const [selected, setSelected] = useState<{ string: number; fret: number } | null>(null);

  const positions = useMemo(
    () => threeNotesPerStringPositions(rootNote, scaleKey),
    [rootNote, scaleKey]
  );
  const position = positions[positionNumber - 1] ?? positions[0];
  const rootPc = pitchClass(rootNote);

  // Conjunto (corda, casa) que pertence a esta posição, e faixa de casas a
  // desenhar (com uma casa de folga de cada lado).
  const { fretStart, fretEnd, activeByString } = useMemo(() => {
    const active: Set<number>[] = position.map((frets) => new Set(frets));
    const allFrets = position.flat();
    const min = Math.min(...allFrets);
    const max = Math.max(...allFrets);
    return {
      fretStart: Math.max(0, min - 1),
      fretEnd: max + 1,
      activeByString: active,
    };
  }, [position]);

  const frets = Array.from({ length: fretEnd - fretStart + 1 }, (_, i) => fretStart + i);

  const tab = useMemo(() => asciiTabFromFrets(position), [position]);

  function handleClick(stringIndex: number, fret: number) {
    setSelected({ string: stringIndex, fret });
    playTone(frequencyAt(stringIndex, fret));
  }

  return (
    <div>
      <div className="flex items-center gap-2 text-sm mb-4">
        <label>Tocar em:</label>
        <select
          value={rootNote}
          onChange={(e) => setRootNote(e.target.value as NoteName)}
          className="border rounded px-2 py-1"
        >
          {ALL_NOTES.map((n) => (
            <option key={n} value={n}>
              {n} {rootLabel}
            </option>
          ))}
        </select>
        <span className="text-neutral-500">
          casas {position.flat().length ? Math.min(...position.flat()) : 0} a{" "}
          {position.flat().length ? Math.max(...position.flat()) : 0}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3">
        <div className="flex ml-16">
          {frets.map((f) => (
            <div
              key={f}
              className="shrink-0 text-center text-[11px] text-amber-100/70 w-12"
            >
              {f}
              {DOUBLE_MARKER.has(f) ? " ●●" : FRET_MARKERS.has(f) ? " ●" : ""}
            </div>
          ))}
        </div>

        {activeByString.map((activeFrets, stringIndex) => (
          <div key={stringIndex} className="flex items-center">
            <div className="w-16 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {STRING_LABELS[stringIndex]}
            </div>
            {frets.map((f) => {
              const inPos = activeFrets.has(f);
              const pc = pitchClassAt(stringIndex, f);
              const rel = ((pc - rootPc) % 12 + 12) % 12;
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
                  {inPos && (
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

      <div className="mt-4">
        <p className="text-sm font-medium text-neutral-700 mb-1">Tablatura da posição</p>
        <pre className="bg-neutral-900 text-amber-200 text-xs p-4 rounded-lg overflow-x-auto">
          {tab}
        </pre>
      </div>
    </div>
  );
}
