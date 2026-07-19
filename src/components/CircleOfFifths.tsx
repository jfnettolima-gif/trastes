"use client";

import { useState } from "react";
import { NoteName, pitchClass, noteNameFromPitchClass } from "@/lib/music";
import { playTone } from "@/lib/audio";

// As 12 tonalidades no sentido horário, cada uma uma quinta acima da anterior.
// Guardamos o nome de exibição (com a grafia usual de sustenidos/bemóis) e a
// tônica em forma de NoteName (só sustenidos) para o áudio.
type Key = {
  majorLabel: string;
  minorLabel: string;
  acc: string;
  root: NoteName;
};

const KEYS: Key[] = [
  { majorLabel: "C", minorLabel: "Am", acc: "—", root: "C" },
  { majorLabel: "G", minorLabel: "Em", acc: "1♯", root: "G" },
  { majorLabel: "D", minorLabel: "Bm", acc: "2♯", root: "D" },
  { majorLabel: "A", minorLabel: "F♯m", acc: "3♯", root: "A" },
  { majorLabel: "E", minorLabel: "C♯m", acc: "4♯", root: "E" },
  { majorLabel: "B", minorLabel: "G♯m", acc: "5♯", root: "B" },
  { majorLabel: "F♯ / G♭", minorLabel: "D♯m / E♭m", acc: "6♯ / 6♭", root: "F#" },
  { majorLabel: "D♭", minorLabel: "B♭m", acc: "5♭", root: "C#" },
  { majorLabel: "A♭", minorLabel: "Fm", acc: "4♭", root: "G#" },
  { majorLabel: "E♭", minorLabel: "Cm", acc: "3♭", root: "D#" },
  { majorLabel: "B♭", minorLabel: "Gm", acc: "2♭", root: "A#" },
  { majorLabel: "F", minorLabel: "Dm", acc: "1♭", root: "F" },
];

function noteFreq(pc: number): number {
  return 261.63 * Math.pow(2, pc / 12); // Dó4 como referência
}

export default function CircleOfFifths() {
  const [selected, setSelected] = useState(0);

  function tocarAcordeMaior(root: NoteName) {
    const rootPc = pitchClass(root);
    [0, 4, 7].forEach((iv, i) => {
      setTimeout(() => playTone(noteFreq((rootPc + iv) % 12), 0.8), i * 90);
    });
  }

  const R = 42; // raio em % do container
  const key = KEYS[selected];
  const relMinorNotes = (() => {
    const rootPc = (pitchClass(key.root) + 9) % 12; // relativa menor = 6º grau
    return [0, 3, 7].map((iv) => noteNameFromPitchClass((rootPc + iv) % 12));
  })();
  const majorNotes = [0, 4, 7].map((iv) =>
    noteNameFromPitchClass((pitchClass(key.root) + iv) % 12)
  );

  return (
    <div>
      <div className="relative w-full max-w-md mx-auto aspect-square">
        <div className="absolute inset-0 rounded-full border-2 border-amber-800/20" />
        {KEYS.map((k, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 50 + R * Math.cos(angle);
          const y = 50 + R * Math.sin(angle);
          const isSel = i === selected;
          return (
            <button
              key={k.majorLabel}
              onClick={() => {
                setSelected(i);
                tocarAcordeMaior(k.root);
              }}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border flex flex-col items-center justify-center transition-transform hover:scale-110 ${
                isSel
                  ? "bg-amber-800 text-white border-amber-800 scale-110"
                  : "bg-white text-amber-900 border-amber-800/40"
              }`}
            >
              <span className="font-bold leading-none">{k.majorLabel.split(" ")[0]}</span>
              <span className={`text-[10px] leading-none mt-0.5 ${isSel ? "text-amber-100" : "text-neutral-500"}`}>
                {k.minorLabel.split(" ")[0]}
              </span>
            </button>
          );
        })}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-neutral-400">quintas →</p>
          </div>
        </div>
      </div>

      <div className="card p-5 mt-6">
        <p className="text-lg font-bold text-amber-800">
          Tom de {key.majorLabel} maior / {key.minorLabel} menor
        </p>
        <p className="text-sm text-neutral-600 mt-1">
          Armadura de clave: <strong>{key.acc}</strong>
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
          <button
            onClick={() => tocarAcordeMaior(key.root)}
            className="border rounded-lg p-3 text-left hover:bg-amber-50"
          >
            <span className="text-neutral-500">Acorde maior (I):</span>{" "}
            <strong>{majorNotes.join(" · ")}</strong> ▶
          </button>
          <div className="border rounded-lg p-3">
            <span className="text-neutral-500">Relativa menor (vi):</span>{" "}
            <strong>{relMinorNotes.join(" · ")}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
