"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { frequencyAt, INTERVAL_LABELS } from "@/lib/music";
import {
  OPEN_CHORDS,
  OpenChord,
  openChordStrings,
  openChordNotes,
} from "@/lib/openChords";
import { playTone } from "@/lib/audio";

const CATS: { id: OpenChord["categoria"] | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "maior", label: "Maiores" },
  { id: "menor", label: "Menores" },
  { id: "dom7", label: "Com sétima" },
];

// Toca o acorde como uma batida (strum) da 6ª para a 1ª corda.
function strum(chord: OpenChord) {
  let i = 0;
  chord.frets.forEach((f, s) => {
    if (f === null) return;
    setTimeout(() => playTone(frequencyAt(s, f), 1.2), i * 55);
    i++;
  });
}

function ChordChart({ chord }: { chord: OpenChord }) {
  const strings = openChordStrings(chord);
  // Mostra as casas 1..4 (posição aberta). As cordas soltas e abafadas vão
  // acima da pestana.
  const rows = [1, 2, 3, 4];

  return (
    <div className="rounded-lg border border-amber-800/20 bg-white p-4">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="text-2xl font-bold text-amber-800">{chord.symbol}</span>
          <span className="text-xs text-neutral-500 ml-2">{chord.nome}</span>
        </div>
        <button
          onClick={() => strum(chord)}
          className="text-sm text-amber-700 hover:text-amber-900"
        >
          ▶ ouvir
        </button>
      </div>

      {/* diagrama vertical: colunas = cordas (6ª à esquerda), linhas = casas */}
      <div className="flex justify-center">
        <div>
          {/* marcadores de corda solta / abafada */}
          <div className="flex">
            {strings.map((st) => (
              <div key={st.string} className="w-7 text-center text-xs">
                {st.fret === null ? (
                  <span className="text-rose-600 font-bold">✕</span>
                ) : st.fret === 0 ? (
                  <span className="text-neutral-500">○</span>
                ) : (
                  <span className="text-transparent">·</span>
                )}
              </div>
            ))}
          </div>
          {/* pestana (nut) */}
          <div className="h-[3px] bg-neutral-700 rounded" />
          {/* casas */}
          {rows.map((row) => (
            <div key={row} className="flex border-b border-neutral-300 h-8">
              {strings.map((st) => {
                const on = st.fret === row;
                return (
                  <div
                    key={st.string}
                    className="w-7 relative flex items-center justify-center border-r border-neutral-300 last:border-r-0"
                  >
                    {/* corda vertical */}
                    <span className="absolute inset-y-0 left-1/2 w-[1px] bg-neutral-300 -translate-x-1/2" />
                    {on && (
                      <span
                        className={`z-10 flex items-center justify-center rounded-full text-[10px] font-semibold w-6 h-6
                          ${st.isRoot ? "bg-rose-500 text-white" : "bg-sky-500 text-white"}`}
                      >
                        {st.interval !== null ? INTERVAL_LABELS[st.interval].short : ""}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          {/* rótulos das cordas */}
          <div className="flex mt-1">
            {["Mi", "Lá", "Ré", "Sol", "Si", "Mi"].map((n, i) => (
              <div key={i} className="w-7 text-center text-[9px] text-neutral-400">
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-500 mt-2">
        Notas: <strong>{openChordNotes(chord).join(" · ")}</strong>
      </p>
      <p className="text-xs text-neutral-500 mt-1">{chord.dica}</p>
    </div>
  );
}

// Treino de troca: alterna dois acordes num tempo, para praticar a transição.
function TrocaTrainer() {
  const [a, setA] = useState("G");
  const [b, setB] = useState("C");
  const [bpm, setBpm] = useState(60);
  const [rodando, setRodando] = useState(false);
  const [atual, setAtual] = useState<"a" | "b">("a");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const flipRef = useRef<"a" | "b">("a");

  const chordA = OPEN_CHORDS.find((c) => c.id === a)!;
  const chordB = OPEN_CHORDS.find((c) => c.id === b)!;

  useEffect(() => {
    if (!rodando) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    // troca a cada 2 tempos (1 compasso de 2/4), tocando o acorde na virada
    const intervalMs = (60 / bpm) * 1000 * 2;
    flipRef.current = "a";
    setAtual("a");
    strum(chordA);
    timerRef.current = setInterval(() => {
      flipRef.current = flipRef.current === "a" ? "b" : "a";
      setAtual(flipRef.current);
      strum(flipRef.current === "a" ? chordA : chordB);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rodando, bpm, a, b]);

  const alvo = atual === "a" ? chordA : chordB;

  return (
    <div className="rounded-lg border border-amber-800/20 p-5">
      <p className="font-semibold text-amber-900 mb-3">Treino de troca</p>
      <div className="flex flex-wrap gap-4 items-end">
        <label className="flex flex-col text-sm gap-1">
          <span className="text-neutral-600">De</span>
          <select
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {OPEN_CHORDS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.symbol}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm gap-1">
          <span className="text-neutral-600">Para</span>
          <select
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {OPEN_CHORDS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.symbol}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-sm gap-1">
          <span className="text-neutral-600">Andamento: {bpm} BPM</span>
          <input
            type="range"
            min={40}
            max={120}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-40"
          />
        </label>
        <button
          onClick={() => setRodando((r) => !r)}
          className="btn-primary"
        >
          {rodando ? "Parar" : "Iniciar"}
        </button>
      </div>

      {rodando && (
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-500">Toque agora</p>
          <p className="text-5xl font-bold text-amber-800">{alvo.symbol}</p>
          <p className="text-xs text-neutral-500">
            Troca a cada 2 tempos. Antecipe o próximo acorde antes da virada.
          </p>
        </div>
      )}
    </div>
  );
}

export default function OpenChordsView() {
  const [cat, setCat] = useState<OpenChord["categoria"] | "todos">("todos");
  const lista = useMemo(
    () => (cat === "todos" ? OPEN_CHORDS : OPEN_CHORDS.filter((c) => c.categoria === cat)),
    [cat]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {CATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`text-xs rounded-full px-3 py-1 border ${
              cat === c.id
                ? "bg-amber-800 text-white border-amber-800"
                : "border-amber-800/25 hover:bg-amber-50"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((c) => (
          <ChordChart key={c.id} chord={c} />
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        Bolinha vermelha = tônica; azul = demais notas (o número é o intervalo). ○ =
        corda solta; ✕ = corda que não deve soar. Os nomes embaixo são as cordas soltas.
      </p>

      <div className="mt-6">
        <TrocaTrainer />
      </div>
    </div>
  );
}
