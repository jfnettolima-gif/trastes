"use client";

import { useMemo, useState } from "react";
import { ALL_NOTES, frequencyAt, pitchClassAt, STRING_LABELS } from "@/lib/music";
import { playTone } from "@/lib/audio";

const FRET_COUNT = 12;

export default function NoteFinderQuiz() {
  const [target, setTarget] = useState(() => pickRandom());
  const [feedback, setFeedback] = useState<"acerto" | "erro" | null>(null);
  const [score, setScore] = useState({ acertos: 0, erros: 0 });

  function pickRandom() {
    return ALL_NOTES[Math.floor(Math.random() * ALL_NOTES.length)];
  }

  const frets = Array.from({ length: FRET_COUNT + 1 }, (_, i) => i);

  function handleClick(stringIndex: number, fret: number) {
    const pc = pitchClassAt(stringIndex, fret);
    const isCorrect = ALL_NOTES[pc] === target;
    playTone(frequencyAt(stringIndex, fret));
    if (isCorrect) {
      setFeedback("acerto");
      setScore((s) => ({ ...s, acertos: s.acertos + 1 }));
      setTimeout(() => {
        setTarget(pickRandom());
        setFeedback(null);
      }, 500);
    } else {
      setFeedback("erro");
      setScore((s) => ({ ...s, erros: s.erros + 1 }));
      setTimeout(() => setFeedback(null), 500);
    }
  }

  const total = score.acertos + score.erros;
  const percent = total === 0 ? 0 : Math.round((score.acertos / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-neutral-500">Encontre a nota:</p>
          <p className="text-4xl font-bold text-amber-800">{target}</p>
        </div>
        <div className="text-right text-sm text-neutral-500">
          <p>
            Acertos: {score.acertos} · Erros: {score.erros}
          </p>
          <p>Aproveitamento: {percent}%</p>
        </div>
      </div>

      {feedback && (
        <p className={`mb-2 font-medium ${feedback === "acerto" ? "text-green-600" : "text-red-600"}`}>
          {feedback === "acerto" ? "Isso aí! ✓" : "Essa não é a nota. Tente de novo."}
        </p>
      )}

      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3">
        <div className="flex ml-16">
          {frets.map((f) => (
            <div key={f} className="shrink-0 w-10 text-center text-[11px] text-amber-100/70">
              {f}
            </div>
          ))}
        </div>
        {STRING_LABELS.map((label, stringIndex) => (
          <div key={stringIndex} className="flex items-center">
            <div className="w-16 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {label}
            </div>
            {frets.map((f) => (
              <button
                key={f}
                onClick={() => handleClick(stringIndex, f)}
                className={`shrink-0 w-10 h-10 relative border-r border-amber-100/20 flex items-center justify-center ${
                  f === 0 ? "border-r-2 border-r-amber-100/60" : ""
                }`}
              >
                <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                <span className="z-10 w-3 h-3 rounded-full bg-amber-100/20 hover:bg-amber-100/50" />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
