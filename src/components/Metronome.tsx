"use client";

import { useEffect, useRef, useState } from "react";
import { playClick } from "@/lib/audio";

export default function Metronome() {
  const [bpm, setBpm] = useState(80);
  const [playing, setPlaying] = useState(false);
  const [beatsPerBar, setBeatsPerBar] = useState(4);
  const [bestBpm, setBestBpm] = useState<number | null>(null);
  const beatRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("trastes:melhorBpm");
    if (stored) setBestBpm(Number(stored));
  }, []);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    beatRef.current = 0;
    const intervalMs = (60 / bpm) * 1000;
    timerRef.current = setInterval(() => {
      playClick(beatRef.current % beatsPerBar === 0);
      beatRef.current += 1;
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, bpm, beatsPerBar]);

  function salvarRecorde() {
    if (!bestBpm || bpm > bestBpm) {
      setBestBpm(bpm);
      window.localStorage.setItem("trastes:melhorBpm", String(bpm));
    }
  }

  return (
    <div className="card p-6 max-w-md">
      <div className="flex items-center justify-between">
        <span className="text-4xl font-bold text-amber-800">{bpm}</span>
        <span className="text-neutral-500 text-sm">BPM</span>
      </div>

      <input
        type="range"
        min={30}
        max={220}
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        className="w-full mt-3"
      />

      <div className="flex gap-2 mt-2">
        <button className="btn-secondary text-xs" onClick={() => setBpm((b) => Math.max(30, b - 5))}>
          -5
        </button>
        <button className="btn-secondary text-xs" onClick={() => setBpm((b) => Math.min(220, b + 5))}>
          +5
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4 text-sm">
        <label>Compasso</label>
        <select
          value={beatsPerBar}
          onChange={(e) => setBeatsPerBar(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[2, 3, 4, 6].map((n) => (
            <option key={n} value={n}>
              {n}/4
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={() => {
            setPlaying((p) => !p);
            if (!playing) salvarRecorde();
          }}
          className="btn-primary"
        >
          {playing ? "Parar" : "Tocar"}
        </button>
        {bestBpm && (
          <span className="text-xs text-neutral-500">Maior BPM já usado: {bestBpm}</span>
        )}
      </div>
    </div>
  );
}
