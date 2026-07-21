"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  INTERVAL_LABELS,
  NoteName,
  SCALES,
  ScaleKey,
} from "@/lib/music";
import {
  TUNINGS,
  Tuning,
  buildTuningFretboard,
  tuningFrequencyAt,
} from "@/lib/tuning";
import { playTone } from "@/lib/audio";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15]);
const STRING_ORDER = [0, 1, 2, 3, 4, 5]; // 6ª (grave) no topo

export default function TuningExplorer() {
  const [tuningId, setTuningId] = useState(TUNINGS[0].id);
  const [root, setRoot] = useState<NoteName>("E");
  const [scaleKey, setScaleKey] = useState<ScaleKey>("pentatonicaMenor");
  const [showIntervals, setShowIntervals] = useState(false);
  const [sel, setSel] = useState<{ s: number; f: number } | null>(null);

  const tuning: Tuning = useMemo(
    () => TUNINGS.find((t) => t.id === tuningId) ?? TUNINGS[0],
    [tuningId]
  );

  const grid = useMemo(
    () => buildTuningFretboard({ tuning, rootNote: root, scaleKey, fretEnd: 15 }),
    [tuning, root, scaleKey]
  );

  const frets = Array.from({ length: 16 }, (_, i) => i);

  function clickNote(s: number, f: number) {
    setSel({ s, f });
    playTone(tuningFrequencyAt(tuning, s, f));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-end">
        <label className="flex flex-col text-sm gap-1 min-w-[260px] flex-1">
          <span className="text-neutral-600">Afinação</span>
          <select
            value={tuningId}
            onChange={(e) => setTuningId(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {TUNINGS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm gap-1">
          <span className="text-neutral-600">Tônica</span>
          <select
            value={root}
            onChange={(e) => setRoot(e.target.value as NoteName)}
            className="border rounded px-3 py-2"
          >
            {ALL_NOTES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm gap-1 min-w-[180px]">
          <span className="text-neutral-600">Escala</span>
          <select
            value={scaleKey}
            onChange={(e) => setScaleKey(e.target.value as ScaleKey)}
            className="border rounded px-3 py-2"
          >
            {Object.entries(SCALES).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={showIntervals}
            onChange={(e) => setShowIntervals(e.target.checked)}
          />
          Mostrar intervalos
        </label>
      </div>

      <p className="text-sm text-neutral-500 mt-3">{tuning.descricao}</p>

      {/* cordas soltas */}
      <div className="mt-3 flex flex-wrap gap-2">
        {STRING_ORDER.map((s) => (
          <button
            key={s}
            onClick={() => clickNote(s, 0)}
            className="rounded-md border border-amber-800/25 bg-white px-3 py-1.5 text-sm hover:bg-amber-50"
            title={`Ouvir ${tuning.cordas[s]} solta`}
          >
            <span className="text-neutral-400">{6 - s}ª </span>
            <span className="font-semibold text-amber-800">{tuning.cordas[s]}</span>
          </button>
        ))}
      </div>

      {/* braço */}
      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3 mt-4">
        <div className="flex ml-10">
          {frets.map((f) => (
            <div key={f} className="shrink-0 w-11 text-center text-[11px] text-amber-100/70">
              {f}
              {f === 12 ? " ●●" : FRET_MARKERS.has(f) ? " ●" : ""}
            </div>
          ))}
        </div>

        {grid.map((row, s) => (
          <div key={s} className="flex items-center">
            <div className="w-10 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {tuning.cordas[s]}
            </div>
            {row.map((cell) => {
              const isSel = sel?.s === s && sel.f === cell.fret;
              return (
                <button
                  key={cell.fret}
                  onClick={() => clickNote(s, cell.fret)}
                  title={`${cell.noteName} · casa ${cell.fret}`}
                  className={`shrink-0 relative border-r border-amber-100/20 flex items-center justify-center w-11 h-10
                    ${cell.fret === 0 ? "border-r-2 border-r-amber-100/60" : ""}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                  {cell.inScale && (
                    <span
                      className={`z-10 flex items-center justify-center rounded-full text-[11px] font-semibold w-7 h-7
                        ${cell.isRoot ? "bg-rose-500 text-white" : "bg-sky-400 text-white"}
                        ${isSel ? "ring-2 ring-yellow-300" : ""}`}
                    >
                      {showIntervals && cell.interval !== null
                        ? INTERVAL_LABELS[cell.interval].short
                        : cell.noteName}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {sel && (
        <p className="mt-3 text-sm text-neutral-600">
          {6 - sel.s}ª corda, casa {sel.f}:{" "}
          <strong>{grid[sel.s][sel.f].noteName}</strong>
          {grid[sel.s][sel.f].interval !== null && (
            <> · {INTERVAL_LABELS[grid[sel.s][sel.f].interval!].name}</>
          )}
        </p>
      )}

      <p className="text-xs text-neutral-500 mt-4">
        Bolinha vermelha = tônica; azul = demais notas da escala. Troque a afinação e
        veja o mesmo desenho se reorganizar no braço. Clique nas notas (ou nas cordas
        soltas acima) para ouvir como ficam nessa afinação.
      </p>
    </div>
  );
}
