"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  asciiTab,
  NoteName,
  pentatonicShapeStarts,
  shapeWindow,
} from "@/lib/music";
import Fretboard from "@/components/Fretboard";

export default function PentatonicShapeView({ shapeNumber }: { shapeNumber: number }) {
  const [rootNote, setRootNote] = useState<NoteName>("A");

  const starts = useMemo(() => pentatonicShapeStarts(rootNote), [rootNote]);
  const startFret = starts[shapeNumber - 1] ?? 0;
  const [fretStart, fretEnd] = shapeWindow(startFret);

  const tab = useMemo(
    () => asciiTab({ rootNote, scaleKey: "pentatonicaMenor", fretStart, fretEnd }),
    [rootNote, fretStart, fretEnd]
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
              {n} menor
            </option>
          ))}
        </select>
        <span className="text-neutral-500">
          casas {fretStart} a {fretEnd}
        </span>
      </div>

      <Fretboard
        rootNote={rootNote}
        scaleKey="pentatonicaMenor"
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
