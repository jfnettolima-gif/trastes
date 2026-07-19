"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  asciiTab,
  NoteName,
  pentatonicShapeStarts,
  ScaleKey,
  shapeWindow,
} from "@/lib/music";
import Fretboard from "@/components/Fretboard";

export default function ScaleShapeView({
  shapeNumber,
  scaleKey,
  shapeReferenceScaleKey,
  defaultRoot = "A",
  rootLabel = "menor",
}: {
  shapeNumber: number;
  scaleKey: ScaleKey;
  // Escala usada só para calcular as casas de início dos 5 desenhos. Útil
  // para a escala blues, que tradicionalmente usa os mesmos 5 desenhos da
  // pentatônica menor, apenas com a nota de passagem (b5) adicionada dentro
  // de cada desenho.
  shapeReferenceScaleKey?: ScaleKey;
  defaultRoot?: NoteName;
  rootLabel?: string;
}) {
  const [rootNote, setRootNote] = useState<NoteName>(defaultRoot);

  const refScaleKey = shapeReferenceScaleKey ?? scaleKey;
  const starts = useMemo(
    () => pentatonicShapeStarts(rootNote, refScaleKey),
    [rootNote, refScaleKey]
  );
  const startFret = starts[shapeNumber - 1] ?? 0;
  const [fretStart, fretEnd] = shapeWindow(startFret);

  const tab = useMemo(
    () => asciiTab({ rootNote, scaleKey, fretStart, fretEnd }),
    [rootNote, scaleKey, fretStart, fretEnd]
  );

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
          casas {fretStart} a {fretEnd}
        </span>
      </div>

      <Fretboard
        rootNote={rootNote}
        scaleKey={scaleKey}
        fretStart={fretStart}
        fretEnd={fretEnd}
        showControls={false}
        showNoteNames={false}
        showIntervals
      />

      <div className="mt-4">
        <p className="text-sm font-medium text-neutral-700 mb-1">Tablatura do desenho</p>
        <pre className="bg-neutral-900 text-amber-200 text-xs p-4 rounded-lg overflow-x-auto">
          {tab}
        </pre>
      </div>
    </div>
  );
}
