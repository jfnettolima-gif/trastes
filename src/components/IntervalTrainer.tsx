"use client";

import { useState } from "react";
import { INTERVAL_LABELS } from "@/lib/music";
import { playTone } from "@/lib/audio";

const OPTIONS = Object.entries(INTERVAL_LABELS).map(([semitons, info]) => ({
  semitons: Number(semitons),
  ...info,
}));

function randomRootFreq() {
  const semitom = Math.floor(Math.random() * 12);
  return 220 * Math.pow(2, semitom / 12); // em torno de Lá3, varia a cada rodada
}

export default function IntervalTrainer() {
  const [rootFreq, setRootFreq] = useState(() => randomRootFreq());
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 12));
  const [feedback, setFeedback] = useState<"acerto" | "erro" | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [score, setScore] = useState({ acertos: 0, erros: 0 });

  function tocarPar(freq: number, semitons: number) {
    playTone(freq, 0.55);
    setTimeout(() => playTone(freq * Math.pow(2, semitons / 12), 0.75), 600);
  }

  function proximaRodada() {
    const novoRoot = randomRootFreq();
    const novoTarget = Math.floor(Math.random() * 12);
    setRootFreq(novoRoot);
    setTarget(novoTarget);
    setFeedback(null);
    setRespondida(false);
    setTimeout(() => tocarPar(novoRoot, novoTarget), 300);
  }

  function handleResposta(semitons: number) {
    if (respondida) return;
    const isCorrect = semitons === target;
    setRespondida(true);
    if (isCorrect) {
      setFeedback("acerto");
      setScore((s) => ({ ...s, acertos: s.acertos + 1 }));
      setTimeout(proximaRodada, 900);
    } else {
      setFeedback("erro");
      setScore((s) => ({ ...s, erros: s.erros + 1 }));
    }
  }

  const total = score.acertos + score.erros;
  const percent = total === 0 ? 0 : Math.round((score.acertos / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => tocarPar(rootFreq, target)} className="btn-primary">
          ▶ Tocar tônica + intervalo
        </button>
        <div className="text-right text-sm text-neutral-500">
          <p>
            Acertos: {score.acertos} · Erros: {score.erros}
          </p>
          <p>Aproveitamento: {percent}%</p>
        </div>
      </div>

      {feedback && (
        <p className={`mb-3 font-medium ${feedback === "acerto" ? "text-green-600" : "text-red-600"}`}>
          {feedback === "acerto"
            ? "Isso aí! ✓"
            : `Essa não. Era ${INTERVAL_LABELS[target].short} (${INTERVAL_LABELS[target].name}). Tente ouvir de novo e siga para a próxima.`}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.semitons}
            onClick={() => handleResposta(opt.semitons)}
            disabled={respondida}
            className={`text-left border rounded-lg px-3 py-2 text-sm ${
              respondida && opt.semitons === target
                ? "border-green-600 bg-green-50"
                : "border-amber-800/30 hover:bg-amber-50"
            }`}
          >
            <span className="font-semibold text-amber-800">{opt.short}</span>{" "}
            <span className="text-neutral-500">{opt.name}</span>
          </button>
        ))}
      </div>

      {feedback === "erro" && (
        <button onClick={proximaRodada} className="btn-secondary mt-4">
          Próxima rodada →
        </button>
      )}
    </div>
  );
}
