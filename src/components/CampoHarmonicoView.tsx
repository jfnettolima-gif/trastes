"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  diatonicTriads,
  NoteName,
  pitchClass,
  ScaleKey,
} from "@/lib/music";
import { playTone } from "@/lib/audio";

const ESCALAS: { key: ScaleKey; label: string }[] = [
  { key: "escalaMaior", label: "Maior" },
  { key: "menorNatural", label: "Menor natural" },
  { key: "menorHarmonica", label: "Menor harmônica" },
  { key: "menorMelodica", label: "Menor melódica" },
];

// Frequência de uma nota tomando Dó4 (261.63 Hz) como referência, subindo
// dentro de uma oitava. Suficiente para ouvir a cor de cada acorde.
function noteFreq(note: NoteName): number {
  return 261.63 * Math.pow(2, pitchClass(note) / 12);
}

const CORES: Record<string, string> = {
  maior: "bg-emerald-100 border-emerald-400 text-emerald-900",
  menor: "bg-sky-100 border-sky-400 text-sky-900",
  diminuto: "bg-rose-100 border-rose-400 text-rose-900",
  aumentado: "bg-amber-100 border-amber-400 text-amber-900",
};

export default function CampoHarmonicoView({
  defaultRoot = "C",
  defaultScale = "escalaMaior",
}: {
  defaultRoot?: NoteName;
  defaultScale?: ScaleKey;
}) {
  const [rootNote, setRootNote] = useState<NoteName>(defaultRoot);
  const [scaleKey, setScaleKey] = useState<ScaleKey>(defaultScale);

  const triads = useMemo(
    () => diatonicTriads(rootNote, scaleKey),
    [rootNote, scaleKey]
  );

  function tocarAcorde(notes: NoteName[]) {
    notes.forEach((n, i) => {
      setTimeout(() => playTone(noteFreq(n), 0.8), i * 90);
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 text-sm mb-5">
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
          Escala
          <select
            value={scaleKey}
            onChange={(e) => setScaleKey(e.target.value as ScaleKey)}
            className="border rounded px-2 py-1"
          >
            {ESCALAS.map((e) => (
              <option key={e.key} value={e.key}>
                {e.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {triads.map((t) => (
          <button
            key={t.degree}
            onClick={() => tocarAcorde(t.notes)}
            className={`border rounded-lg p-3 text-center transition-transform hover:scale-[1.03] ${
              CORES[t.quality] ?? "bg-neutral-100 border-neutral-300"
            }`}
          >
            <p className="text-xs opacity-70">{t.roman}</p>
            <p className="text-xl font-bold">{t.symbol}</p>
            <p className="text-[11px] mt-1 opacity-80">{t.notes.join(" · ")}</p>
            <p className="text-[10px] mt-1 opacity-60 capitalize">{t.quality}</p>
          </button>
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-3">
        Clique em cada acorde para ouvir as três notas. Verde = maior, azul = menor,
        rosa = diminuto, âmbar = aumentado.
      </p>
    </div>
  );
}
