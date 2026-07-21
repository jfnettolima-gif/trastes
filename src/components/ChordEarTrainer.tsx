"use client";

import { useState } from "react";
import { playTone } from "@/lib/audio";

// Qualidades de acorde para treinar o ouvido, com os intervalos (em semitons)
// que definem a "cor" de cada uma. Tudo tocado por teoria a partir de uma
// tônica sorteada, então nunca é a mesma altura duas vezes seguidas.
type Quality = { id: string; label: string; dica: string; intervals: number[] };

const QUALITIES: Quality[] = [
  { id: "maior", label: "Maior", dica: "alegre, resolvido", intervals: [0, 4, 7] },
  { id: "menor", label: "Menor", dica: "triste, melancólico", intervals: [0, 3, 7] },
  { id: "dom7", label: "Dominante (7)", dica: "tenso, pede resolução", intervals: [0, 4, 7, 10] },
  { id: "maj7", label: "Sétima maior (7M)", dica: "suave, sofisticado", intervals: [0, 4, 7, 11] },
  { id: "min7", label: "Menor com 7 (m7)", dica: "triste porém macio", intervals: [0, 3, 7, 10] },
  { id: "dim", label: "Diminuto", dica: "instável, de suspense", intervals: [0, 3, 6] },
  { id: "aug", label: "Aumentado", dica: "estranho, flutuante", intervals: [0, 4, 8] },
  { id: "sus4", label: "Suspenso 4 (sus4)", dica: "aberto, sem terça", intervals: [0, 5, 7] },
];

// Frequência de uma tônica sorteada, em torno de Dó3, variando a cada rodada.
function randomRootFreq() {
  const semitom = Math.floor(Math.random() * 12);
  return 130.81 * Math.pow(2, semitom / 12);
}

function randomQualityIndex() {
  return Math.floor(Math.random() * QUALITIES.length);
}

export default function ChordEarTrainer() {
  const [rootFreq, setRootFreq] = useState(() => randomRootFreq());
  const [target, setTarget] = useState(() => randomQualityIndex());
  const [feedback, setFeedback] = useState<"acerto" | "erro" | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [score, setScore] = useState({ acertos: 0, erros: 0 });

  // Toca o acorde: primeiro arpejado (subindo), depois em bloco, que é como
  // se percebe melhor a "cor" da qualidade.
  function tocarAcorde(freq: number, intervals: number[]) {
    intervals.forEach((iv, i) => {
      setTimeout(() => playTone(freq * Math.pow(2, iv / 12), 0.6), i * 220);
    });
    const blockStart = intervals.length * 220 + 250;
    intervals.forEach((iv) => {
      setTimeout(() => playTone(freq * Math.pow(2, iv / 12), 1.1), blockStart);
    });
  }

  function proximaRodada() {
    const novoRoot = randomRootFreq();
    const novoTarget = randomQualityIndex();
    setRootFreq(novoRoot);
    setTarget(novoTarget);
    setFeedback(null);
    setRespondida(false);
    setTimeout(() => tocarAcorde(novoRoot, QUALITIES[novoTarget].intervals), 300);
  }

  function handleResposta(idx: number) {
    if (respondida) return;
    const isCorrect = idx === target;
    setRespondida(true);
    if (isCorrect) {
      setFeedback("acerto");
      setScore((s) => ({ ...s, acertos: s.acertos + 1 }));
      setTimeout(proximaRodada, 1100);
    } else {
      setFeedback("erro");
      setScore((s) => ({ ...s, erros: s.erros + 1 }));
    }
  }

  const total = score.acertos + score.erros;
  const percent = total === 0 ? 0 : Math.round((score.acertos / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <button
          onClick={() => tocarAcorde(rootFreq, QUALITIES[target].intervals)}
          className="btn-primary"
        >
          ▶ Tocar o acorde
        </button>
        <div className="text-right text-sm text-neutral-500">
          <p>
            Acertos: {score.acertos} · Erros: {score.erros}
          </p>
          <p>Aproveitamento: {percent}%</p>
        </div>
      </div>

      {feedback && (
        <p
          className={`mb-3 font-medium ${
            feedback === "acerto" ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback === "acerto"
            ? "Isso aí! ✓"
            : `Era ${QUALITIES[target].label} (${QUALITIES[target].dica}). Ouça de novo com calma antes da próxima.`}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {QUALITIES.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => handleResposta(idx)}
            disabled={respondida}
            className={`text-left border rounded-lg px-3 py-2 text-sm ${
              respondida && idx === target
                ? "border-green-600 bg-green-50"
                : "border-amber-800/30 hover:bg-amber-50"
            }`}
          >
            <span className="font-semibold text-amber-800">{q.label}</span>
            <span className="block text-xs text-neutral-500">{q.dica}</span>
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
