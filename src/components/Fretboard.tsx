"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  buildFretboard,
  frequencyAt,
  INTERVAL_LABELS,
  NoteName,
  SCALES,
  ScaleKey,
  STRING_LABELS,
} from "@/lib/music";
import { playTone } from "@/lib/audio";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15, 17, 19, 21]);
const DOUBLE_MARKER = new Set([12, 24]);

type Props = {
  rootNote?: NoteName;
  scaleKey?: ScaleKey | "nenhuma";
  fretStart?: number;
  fretEnd?: number;
  showControls?: boolean;
  showNoteNames?: boolean;
  showIntervals?: boolean;
  compact?: boolean;
};

export default function Fretboard({
  rootNote: initialRoot = "A",
  scaleKey: initialScale = "pentatonicaMenor",
  fretStart = 0,
  fretEnd = 12,
  showControls = true,
  showNoteNames: initialShowNames = true,
  showIntervals: initialShowIntervals = false,
  compact = false,
}: Props) {
  const [rootNote, setRootNote] = useState<NoteName>(initialRoot);
  const [scaleKey, setScaleKey] = useState<ScaleKey | "nenhuma">(initialScale);
  const [showNoteNames, setShowNoteNames] = useState(initialShowNames);
  const [showIntervals, setShowIntervals] = useState(initialShowIntervals);
  const [selected, setSelected] = useState<{ string: number; fret: number } | null>(null);

  const effectiveScale: ScaleKey = scaleKey === "nenhuma" ? "escalaMaior" : scaleKey;
  const grid = useMemo(
    () =>
      buildFretboard({
        rootNote,
        scaleKey: effectiveScale,
        fretStart,
        fretEnd,
      }),
    [rootNote, effectiveScale, fretStart, fretEnd]
  );

  const frets = Array.from({ length: fretEnd - fretStart + 1 }, (_, i) => fretStart + i);

  function handleClick(stringIndex: number, fret: number) {
    setSelected({ string: stringIndex, fret });
    playTone(frequencyAt(stringIndex, fret));
  }

  return (
    <div className="w-full">
      {showControls && (
        <div className="flex flex-wrap gap-3 mb-4 items-center text-sm">
          <label className="flex items-center gap-2">
            Tônica
            <select
              className="border rounded px-2 py-1 bg-white dark:bg-neutral-800"
              value={rootNote}
              onChange={(e) => setRootNote(e.target.value as NoteName)}
            >
              {ALL_NOTES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2">
            Escala
            <select
              className="border rounded px-2 py-1 bg-white dark:bg-neutral-800"
              value={scaleKey}
              onChange={(e) => setScaleKey(e.target.value as ScaleKey | "nenhuma")}
            >
              <option value="nenhuma">Todas as notas</option>
              {Object.entries(SCALES).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={showNoteNames}
              onChange={(e) => setShowNoteNames(e.target.checked)}
            />
            Nomes das notas
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={showIntervals}
              onChange={(e) => setShowIntervals(e.target.checked)}
            />
            Intervalos
          </label>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3">
        {/* números das casas */}
        <div className="flex ml-16">
          {frets.map((f) => (
            <div
              key={f}
              className={`shrink-0 text-center text-[11px] text-amber-100/70 ${
                compact ? "w-9" : "w-12"
              }`}
            >
              {f}
              {DOUBLE_MARKER.has(f) ? " ●●" : FRET_MARKERS.has(f) ? " ●" : ""}
            </div>
          ))}
        </div>

        {grid.map((row, stringIndex) => (
          <div key={stringIndex} className="flex items-center">
            <div className="w-16 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {STRING_LABELS[stringIndex]}
            </div>
            {row.map((cell) => {
              const isSel =
                selected?.string === stringIndex && selected.fret === cell.fret;
              const active = scaleKey === "nenhuma" ? true : cell.inScale;
              return (
                <button
                  key={cell.fret}
                  onClick={() => handleClick(stringIndex, cell.fret)}
                  title={`${cell.noteName} · casa ${cell.fret}`}
                  className={`shrink-0 relative border-r border-amber-100/20 flex items-center justify-center
                    ${compact ? "w-9 h-9" : "w-12 h-11"}
                    ${cell.fret === 0 ? "border-r-2 border-r-amber-100/60" : ""}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                  {active && (
                    <span
                      className={`z-10 flex items-center justify-center rounded-full text-[11px] font-semibold
                        ${compact ? "w-7 h-7" : "w-8 h-8"}
                        ${
                          cell.isRoot
                            ? "bg-rose-500 text-white"
                            : cell.inScale
                            ? "bg-sky-400 text-white"
                            : "bg-transparent"
                        }
                        ${isSel ? "ring-2 ring-yellow-300" : ""}
                        ${!cell.inScale && scaleKey !== "nenhuma" ? "opacity-0" : ""}
                      `}
                    >
                      {showIntervals && cell.interval !== null
                        ? INTERVAL_LABELS[cell.interval].short
                        : showNoteNames
                        ? cell.noteName
                        : ""}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {selected && (
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
          Você clicou na <strong>{STRING_LABELS[selected.string]}</strong>, casa{" "}
          <strong>{selected.fret}</strong>: nota{" "}
          <strong>{grid[selected.string][selected.fret - fretStart]?.noteName}</strong>
          {grid[selected.string][selected.fret - fretStart]?.inScale && (
            <>
              {" "}· intervalo em relação à tônica ({rootNote}):{" "}
              <strong>
                {
                  INTERVAL_LABELS[grid[selected.string][selected.fret - fretStart]!.interval!]
                    .name
                }
              </strong>
            </>
          )}
        </p>
      )}
    </div>
  );
}
