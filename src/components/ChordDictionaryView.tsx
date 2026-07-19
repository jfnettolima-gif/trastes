"use client";

import { useMemo, useState } from "react";
import {
  ALL_NOTES,
  frequencyAt,
  INTERVAL_LABELS,
  NoteName,
} from "@/lib/music";
import {
  CHORD_TYPES,
  ChordType,
  ChordVoicing,
  chordNotes,
  chordSymbol,
  chordVoicing,
} from "@/lib/chords";
import { playTone } from "@/lib/audio";

const STRING_SHORT = ["6", "5", "4", "3", "2", "1"];

function ChordDiagram({ voicing }: { voicing: ChordVoicing }) {
  const displayStart = voicing.minFret === 0 ? 0 : voicing.minFret - 1;
  const displayEnd = Math.max(voicing.maxFret, displayStart + 3);
  const cols = Array.from(
    { length: displayEnd - displayStart + 1 },
    (_, i) => displayStart + i
  );

  function strum() {
    let i = 0;
    voicing.frets.forEach((f, s) => {
      if (f === null) return;
      setTimeout(() => playTone(frequencyAt(s, f), 1.1), i * 60);
      i++;
    });
  }

  return (
    <div className="rounded-lg border border-amber-800/20 bg-white p-4">
      <div className="flex items-baseline justify-between mb-2">
        <p className="font-semibold text-amber-800 text-sm">
          {voicing.shapeName}
          <span className="text-xs font-normal text-neutral-500 ml-2">
            casa {voicing.minFret}
            {voicing.minFret !== voicing.maxFret ? `–${voicing.maxFret}` : ""}
          </span>
        </p>
        <button
          onClick={strum}
          className="text-sm text-amber-700 hover:text-amber-900"
        >
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

export default function ChordDictionaryView() {
  const [root, setRoot] = useState<NoteName>("C");
  const [typeId, setTypeId] = useState<string>(CHORD_TYPES[0].id);

  const type: ChordType = useMemo(
    () => CHORD_TYPES.find((t) => t.id === typeId) ?? CHORD_TYPES[0],
    [typeId]
  );

  const voicings = useMemo(
    () => type.shapes.map((sh) => chordVoicing(root, sh)),
    [root, type]
  );

  const notes = useMemo(
    () => chordNotes(root, type.intervals),
    [root, type]
  );

  const symbol = chordSymbol(root, type.suffix);

  return (
    <div>
      {/* tônica */}
      <div>
        <p className="text-sm text-neutral-600 mb-2">Tônica</p>
        <div className="flex flex-wrap gap-2">
          {ALL_NOTES.map((n) => {
            const sel = n === root;
            return (
              <button
                key={n}
                onClick={() => setRoot(n)}
                className={`w-11 h-11 rounded-lg border text-sm font-semibold transition-colors ${
                  sel
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-amber-800/20 bg-white text-amber-800 hover:bg-amber-50"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* tipo de acorde */}
      <div className="mt-5">
        <p className="text-sm text-neutral-600 mb-2">Tipo de acorde</p>
        <div className="flex flex-wrap gap-2">
          {CHORD_TYPES.map((t) => {
            const sel = t.id === typeId;
            return (
              <button
                key={t.id}
                onClick={() => setTypeId(t.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  sel
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-amber-800/20 bg-white text-amber-800 hover:bg-amber-50"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* resumo do acorde */}
      <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 flex flex-wrap items-center gap-x-8 gap-y-2">
        <div>
          <p className="text-xs text-neutral-500">Acorde</p>
          <p className="text-2xl font-bold text-amber-800">{symbol}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Notas</p>
          <p className="text-lg font-semibold text-amber-800">{notes.join(" · ")}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Fórmula</p>
          <p className="text-lg font-semibold text-amber-800">{type.formula}</p>
        </div>
      </div>

      {/* desenhos */}
      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {voicings.map((v, i) => (
          <ChordDiagram key={i} voicing={v} />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        Bolinha vermelha = tônica; azul = demais notas do acorde (o número é o
        intervalo: 3 = terça, 5 = quinta, b7 = sétima menor, e assim por diante).
        ✕ = corda que não deve soar. As formas são móveis: a mesma figura, em
        outra casa, vira outro acorde do mesmo tipo. Clique em ▶ ouvir para
        escutar o acorde arpejado.
      </p>
    </div>
  );
}
