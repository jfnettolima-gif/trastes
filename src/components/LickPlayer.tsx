"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  pitchClassAt,
  noteNameFromPitchClass,
  frequencyAt,
} from "@/lib/music";
import { LICKS } from "@/lib/licks";
import { playTone } from "@/lib/audio";

const FRET_MARKERS = new Set([3, 5, 7, 9, 12, 15]);
const STRING_LABELS = ["6ª", "5ª", "4ª", "3ª", "2ª", "1ª"];

export default function LickPlayer() {
  const [lickId, setLickId] = useState(LICKS[0].id);
  const lick = useMemo(
    () => LICKS.find((l) => l.id === lickId) ?? LICKS[0],
    [lickId]
  );
  const [bpm, setBpm] = useState(lick.bpmSugerido);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Faixa de casas a mostrar: um pouco antes e depois das casas usadas.
  const { fretStart, fretEnd } = useMemo(() => {
    const frets = lick.notas.map((n) => n.fret);
    const min = Math.max(0, Math.min(...frets) - 1);
    const max = Math.max(...frets) + 1;
    return { fretStart: min, fretEnd: max };
  }, [lick]);

  const frets = useMemo(
    () => Array.from({ length: fretEnd - fretStart + 1 }, (_, i) => fretStart + i),
    [fretStart, fretEnd]
  );

  function limparTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  useEffect(() => {
    // Ao trocar de lick, para e ajusta o BPM sugerido.
    limparTimers();
    setPlaying(false);
    setCurrent(null);
    setBpm(lick.bpmSugerido);
  }, [lickId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => limparTimers(), []);

  function tocar() {
    limparTimers();
    setPlaying(true);
    const beatMs = (60 / bpm) * 1000;
    let acc = 0;
    lick.notas.forEach((n, i) => {
      const at = acc;
      timers.current.push(
        setTimeout(() => {
          setCurrent(i);
          playTone(frequencyAt(n.string, n.fret), Math.min(n.beats * (beatMs / 1000), 1.4));
        }, at)
      );
      acc += n.beats * beatMs;
    });
    // fim
    timers.current.push(
      setTimeout(() => {
        setPlaying(false);
        setCurrent(null);
      }, acc + 200)
    );
  }

  function parar() {
    limparTimers();
    setPlaying(false);
    setCurrent(null);
  }

  // Casa destacada agora.
  const activeNote = current !== null ? lick.notas[current] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-end">
        <label className="flex flex-col text-sm gap-1 min-w-[260px] flex-1">
          <span className="text-neutral-600">Lick</span>
          <select
            value={lickId}
            onChange={(e) => setLickId(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {LICKS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.nome}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm gap-1">
          <span className="text-neutral-600">Andamento: {bpm} BPM</span>
          <input
            type="range"
            min={40}
            max={160}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            disabled={playing}
            className="w-48"
          />
        </label>

        {playing ? (
          <button onClick={parar} className="btn-primary">
            Parar
          </button>
        ) : (
          <button onClick={tocar} className="btn-primary">
            ▶ Tocar lick
          </button>
        )}
      </div>

      <p className="text-sm text-neutral-500 mt-3">{lick.descricao}</p>
      <p className="text-sm text-neutral-600 mt-1">
        Sobre <strong>{lick.escala}</strong>.{" "}
        <Link href={lick.escalaHref} className="text-amber-700 underline">
          ver os desenhos da escala
        </Link>
      </p>

      {/* braço */}
      <div className="overflow-x-auto rounded-lg border border-amber-800/30 bg-[#3b2a1a] p-3 mt-4">
        <div className="flex ml-8">
          {frets.map((f) => (
            <div
              key={f}
              className="shrink-0 w-12 text-center text-[11px] text-amber-100/70"
            >
              {f}
              {f === 12 ? " ●●" : FRET_MARKERS.has(f) ? " ●" : ""}
            </div>
          ))}
        </div>

        {[0, 1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div className="w-8 shrink-0 text-[11px] text-amber-100/80 pr-2 text-right">
              {STRING_LABELS[s]}
            </div>
            {frets.map((f) => {
              const isActive = activeNote?.string === s && activeNote?.fret === f;
              // Marca todas as casas que o lick usa nesta corda, apagadas.
              const usada = lick.notas.some((n) => n.string === s && n.fret === f);
              const noteName = noteNameFromPitchClass(pitchClassAt(s, f));
              return (
                <div
                  key={f}
                  className={`shrink-0 relative border-r border-amber-100/20 flex items-center justify-center w-12 h-10
                    ${f === 0 ? "border-r-2 border-r-amber-100/60" : ""}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] bg-amber-100/40 -translate-y-1/2" />
                  {isActive ? (
                    <span className="z-10 flex items-center justify-center rounded-full text-[11px] font-semibold w-7 h-7 bg-rose-500 text-white ring-2 ring-yellow-300 scale-110 transition">
                      {noteName}
                    </span>
                  ) : usada ? (
                    <span className="z-10 flex items-center justify-center rounded-full text-[11px] font-medium w-7 h-7 bg-sky-400/30 text-amber-50">
                      {noteName}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* sequência de notas */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {lick.notas.map((n, i) => (
          <span
            key={i}
            className={`text-xs rounded px-2 py-1 border ${
              current === i
                ? "bg-rose-500 text-white border-rose-500"
                : "border-amber-800/25 text-neutral-600"
            }`}
          >
            {noteNameFromPitchClass(pitchClassAt(n.string, n.fret))}
          </span>
        ))}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        As bolinhas azuis apagadas são todas as notas do lick no braço; a vermelha é a que
        está tocando agora. Baixe o andamento e toque junto até decorar a frase, depois
        suba aos poucos (o Speed trainer ajuda nisso).
      </p>
    </div>
  );
}
