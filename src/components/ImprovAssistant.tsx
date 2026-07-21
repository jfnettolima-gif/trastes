"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { parseProgression, detectKey } from "@/lib/improv";
import { playTone } from "@/lib/audio";

const EXEMPLOS = ["Am F C G", "C G Am F", "Dm G7 C", "E A B", "Em C G D"];

function noteFreq(pc: number) {
  return 261.63 * Math.pow(2, pc / 12); // em torno de Dó4
}

export default function ImprovAssistant() {
  const [texto, setTexto] = useState("Am F C G");

  // Aceita uma progressão vinda por link (ex.: do repertório): ?prog=G+D+Em+C
  useEffect(() => {
    const prog = new URLSearchParams(window.location.search).get("prog");
    if (prog && prog.trim()) setTexto(prog.trim());
  }, []);

  const chords = useMemo(() => parseProgression(texto), [texto]);
  const result = useMemo(() => detectKey(chords), [chords]);

  function ouvirAcorde(rootPc: number, triad: string) {
    const third = triad === "menor" || triad === "diminuto" ? 3 : 4;
    const fifth = triad === "diminuto" ? 6 : triad === "aumentado" ? 8 : 7;
    [0, third, fifth].forEach((iv, i) => {
      setTimeout(() => playTone(noteFreq((rootPc + iv) % 12) * (iv > 7 ? 1 : 1), 0.9), i * 70);
    });
  }

  return (
    <div>
      <label className="block text-sm text-neutral-600 mb-1">
        Digite os acordes da música (separados por espaço)
      </label>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Ex.: Am F C G"
        className="w-full border rounded-lg px-3 py-2 text-lg"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs text-neutral-500 self-center">Exemplos:</span>
        {EXEMPLOS.map((ex) => (
          <button
            key={ex}
            onClick={() => setTexto(ex)}
            className="text-xs rounded-full border border-amber-800/25 px-2.5 py-1 hover:bg-amber-50"
          >
            {ex}
          </button>
        ))}
      </div>

      {chords.length === 0 ? (
        <p className="mt-6 text-neutral-500">
          Digite alguns acordes acima para ver a análise.
        </p>
      ) : (
        <>
          {/* tom detectado */}
          <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-5">
            {result.ok ? (
              <>
                <p className="text-sm text-neutral-600">Tom mais provável</p>
                <p className="text-2xl font-bold text-amber-800">
                  {result.minorFeel
                    ? `${result.relativeMinor} menor`
                    : `${result.keyRoot} maior`}
                </p>
                <p className="text-sm text-neutral-600 mt-1">
                  Campo harmônico de <strong>{result.keyRoot} maior</strong> (relativa
                  menor: <strong>{result.relativeMinor}m</strong>). Confiança:{" "}
                  {Math.round(result.confidence * 100)}%.
                </p>
              </>
            ) : (
              <p className="text-amber-800">
                Não consegui achar um tom único com segurança. Os acordes podem ser de
                tons diferentes (modulação) ou ter cifras que não reconheci. A análise
                abaixo mostra o palpite mais próximo.
              </p>
            )}
          </div>

          {/* escala para tudo */}
          <div className="mt-4 rounded-lg border border-amber-800/20 p-5">
            <p className="font-semibold text-amber-900 mb-2">
              Uma escala para a música inteira
            </p>
            <ul className="space-y-1 text-sm text-neutral-700">
              <li>
                🎯 <strong>{result.parentScaleLabel}</strong> encaixa em todos os acordes
                do campo harmônico.{" "}
                <Link href="/escala-maior" className="text-amber-700 underline">
                  ver os desenhos
                </Link>
              </li>
              <li>
                🎸 Para um som mais de rock/blues, use a{" "}
                <strong>{result.pentatonicLabel}</strong>.{" "}
                <Link href="/pentatonica-menor" className="text-amber-700 underline">
                  ver os desenhos
                </Link>
              </li>
              <li>
                ▶ Pratique junto com uma{" "}
                <Link href="/backing-tracks" className="text-amber-700 underline">
                  backing track
                </Link>{" "}
                no tom de {result.minorFeel ? `${result.relativeMinor}m` : result.keyRoot}.
              </li>
            </ul>
          </div>

          {/* acorde a acorde */}
          <div className="mt-4">
            <p className="font-semibold text-amber-900 mb-2">
              Acorde por acorde (para tirar cada nota-alvo)
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.analyses.map((a, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 ${
                    a.inKey ? "border-amber-800/20 bg-white" : "border-rose-300 bg-rose-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-800">
                      {a.chord.raw}
                    </span>
                    <button
                      onClick={() => ouvirAcorde(a.chord.rootPc, a.chord.triad)}
                      className="text-sm text-amber-700 hover:text-amber-900"
                    >
                      ▶ ouvir
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500">{a.chord.quality}</p>
                  {a.inKey ? (
                    <div className="mt-2 text-sm text-neutral-700 space-y-1">
                      <p>
                        Grau: <strong>{a.roman}</strong>
                      </p>
                      <p>
                        Modo: <strong>{a.mode}</strong>
                      </p>
                      <p className="text-neutral-500">Arpejo: {a.arpejo}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-rose-700">
                      Fora do tom principal (acorde emprestado). Foque nas notas do
                      próprio arpejo aqui.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
