"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ALL_NOTES, NoteName } from "@/lib/music";
import {
  BACKING_STYLES,
  BackingEngine,
  BackingStyle,
  chordSymbol,
  expandBars,
} from "@/lib/backing";

export default function BackingTrackView() {
  const [styleId, setStyleId] = useState(BACKING_STYLES[0].id);
  const [root, setRoot] = useState<NoteName>("A");
  const [bpm, setBpm] = useState(BACKING_STYLES[0].bpm);
  const [playing, setPlaying] = useState(false);
  const [currentBar, setCurrentBar] = useState(-1);

  const engineRef = useRef<BackingEngine | null>(null);

  const style: BackingStyle = useMemo(
    () => BACKING_STYLES.find((s) => s.id === styleId) ?? BACKING_STYLES[0],
    [styleId]
  );

  const bars = useMemo(() => expandBars(style), [style]);

  // Ao trocar de estilo, ajusta o BPM sugerido.
  useEffect(() => {
    setBpm(style.bpm);
  }, [style]);

  // Se estiver tocando, reinicia com as novas configurações.
  useEffect(() => {
    if (!playing) return;
    const eng = engineRef.current;
    if (!eng) return;
    eng.onBar = (b) => setCurrentBar(b);
    eng.start(style, root, bpm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style, root, bpm]);

  useEffect(() => {
    return () => {
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  function toggle() {
    if (playing) {
      engineRef.current?.stop();
      setPlaying(false);
      setCurrentBar(-1);
      return;
    }
    if (!engineRef.current) engineRef.current = new BackingEngine();
    const eng = engineRef.current;
    eng.onBar = (b) => setCurrentBar(b);
    eng.start(style, root, bpm);
    setPlaying(true);
  }

  return (
    <div>
      {/* seleção de estilo */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {BACKING_STYLES.map((s) => {
          const sel = s.id === styleId;
          return (
            <button
              key={s.id}
              onClick={() => setStyleId(s.id)}
              className={`text-left rounded-lg border p-4 transition-colors ${
                sel
                  ? "border-amber-500 bg-amber-50"
                  : "border-amber-800/25 hover:bg-amber-50/50"
              }`}
            >
              <p className="font-semibold text-amber-800">{s.nome}</p>
              <p className="text-xs text-neutral-500 mt-1">{s.descricao}</p>
            </button>
          );
        })}
      </div>

      {/* controles */}
      <div className="flex flex-wrap items-end gap-4 mt-6">
        <label className="flex flex-col text-sm gap-1">
          <span className="text-neutral-600">Tom</span>
          <select
            value={root}
            onChange={(e) => setRoot(e.target.value as NoteName)}
            className="border rounded px-3 py-2"
          >
            {ALL_NOTES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm gap-1 flex-1 min-w-[180px]">
          <span className="text-neutral-600">Andamento: {bpm} BPM</span>
          <input
            type="range"
            min={50}
            max={180}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="accent-amber-600"
          />
        </label>

        <button
          onClick={toggle}
          className={`shrink-0 rounded-full px-8 py-3 font-semibold text-white transition-colors ${
            playing ? "bg-red-600 hover:bg-red-500" : "bg-amber-600 hover:bg-amber-500"
          }`}
        >
          {playing ? "■ Parar" : "▶ Tocar base"}
        </button>
      </div>

      {/* progressão */}
      <div className="mt-6">
        <p className="text-sm text-neutral-500 mb-2">Progressão ({bars.length} compassos)</p>
        <div className="flex flex-wrap gap-2">
          {bars.map((c, i) => {
            const ativo = playing && i === currentBar;
            return (
              <div
                key={i}
                className={`rounded-md border px-3 py-2 text-sm font-semibold min-w-[56px] text-center transition-colors ${
                  ativo
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-amber-800/20 bg-white text-amber-800"
                }`}
              >
                {chordSymbol(root, c.off, c.q)}
              </div>
            );
          })}
        </div>
      </div>

      {/* escala sugerida */}
      <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4">
        <p className="text-sm text-neutral-600">Para improvisar por cima, use:</p>
        <p className="text-lg font-bold text-amber-800 mt-1">
          {style.escalaSugerida} de {root}
        </p>
        {style.escalaHref && (
          <Link href={style.escalaHref} className="text-sm text-amber-700 underline mt-1 inline-block">
            Ver os desenhos dessa escala →
          </Link>
        )}
      </div>

      <p className="text-xs text-neutral-500 mt-4">
        A base é gerada ao vivo pelo navegador (bateria, baixo e acordes). Ajuste o tom e o
        andamento à vontade; a escala sugerida acompanha o tom escolhido.
      </p>
    </div>
  );
}
