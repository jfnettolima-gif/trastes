"use client";

import { useEffect, useRef, useState } from "react";
import { playClick } from "@/lib/audio";

// Metrônomo que sobe o andamento sozinho: toca N compassos, aumenta o BPM no
// passo escolhido e segue, até um teto. É o jeito clássico de ganhar
// velocidade sem perceber, sempre partindo de um andamento limpo.
export default function SpeedTrainer() {
  const [startBpm, setStartBpm] = useState(70);
  const [targetBpm, setTargetBpm] = useState(140);
  const [step, setStep] = useState(5);
  const [barsPerStep, setBarsPerStep] = useState(4);
  const [beatsPerBar, setBeatsPerBar] = useState(4);

  const [playing, setPlaying] = useState(false);
  const [currentBpm, setCurrentBpm] = useState(70);
  const [barsDone, setBarsDone] = useState(0);
  const [reachedTop, setReachedTop] = useState(false);
  const [record, setRecord] = useState<number | null>(null);

  const beatRef = useRef(0);
  const barCountRef = useRef(0);
  const bpmRef = useRef(startBpm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("trastes:recordeSpeed");
    if (stored) setRecord(Number(stored));
  }, []);

  function salvarRecorde(bpm: number) {
    setRecord((prev) => {
      if (prev === null || bpm > prev) {
        window.localStorage.setItem("trastes:recordeSpeed", String(bpm));
        return bpm;
      }
      return prev;
    });
  }

  // Agenda o próximo clique. Usamos setTimeout recalculado a cada batida para
  // que a mudança de BPM (que muda o intervalo) tenha efeito imediato.
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    function tick() {
      const isDownbeat = beatRef.current % beatsPerBar === 0;
      playClick(isDownbeat);
      beatRef.current += 1;

      // Fechou um compasso?
      if (beatRef.current % beatsPerBar === 0) {
        barCountRef.current += 1;
        setBarsDone(barCountRef.current);

        if (barCountRef.current >= barsPerStep) {
          barCountRef.current = 0;
          setBarsDone(0);
          const next = bpmRef.current + step;
          if (next > targetBpm) {
            // chegou ao teto: para e registra
            salvarRecorde(bpmRef.current);
            setReachedTop(true);
            setPlaying(false);
            return;
          }
          bpmRef.current = next;
          setCurrentBpm(next);
          salvarRecorde(next);
        }
      }

      const intervalMs = (60 / bpmRef.current) * 1000;
      timerRef.current = setTimeout(tick, intervalMs);
    }

    const intervalMs = (60 / bpmRef.current) * 1000;
    timerRef.current = setTimeout(tick, intervalMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  function iniciar() {
    beatRef.current = 0;
    barCountRef.current = 0;
    bpmRef.current = startBpm;
    setCurrentBpm(startBpm);
    setBarsDone(0);
    setReachedTop(false);
    setPlaying(true);
  }

  function parar() {
    salvarRecorde(bpmRef.current);
    setPlaying(false);
  }

  const progressoNoPasso = Math.round((barsDone / barsPerStep) * 100);

  return (
    <div className="max-w-md">
      <div className="rounded-lg bg-amber-50 border border-amber-200 p-5 text-center">
        <p className="text-sm text-neutral-600">Andamento atual</p>
        <p className="text-5xl font-bold text-amber-800">{currentBpm}</p>
        <p className="text-sm text-neutral-500">BPM</p>
        {playing && (
          <div className="mt-3">
            <div className="h-2 rounded-full bg-amber-200 overflow-hidden">
              <div
                className="h-full bg-amber-600 transition-all"
                style={{ width: `${progressoNoPasso}%` }}
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Compasso {barsDone} de {barsPerStep} · sobe para {currentBpm + step} BPM no
              próximo passo
            </p>
          </div>
        )}
        {reachedTop && (
          <p className="mt-3 text-emerald-700 font-medium">
            Chegou ao teto de {targetBpm} BPM! 🎉
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <label className="flex flex-col gap-1">
          <span className="text-neutral-600">Começa em (BPM)</span>
          <input
            type="number"
            min={30}
            max={300}
            value={startBpm}
            onChange={(e) => setStartBpm(Number(e.target.value))}
            disabled={playing}
            className="border rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-neutral-600">Até (BPM)</span>
          <input
            type="number"
            min={30}
            max={300}
            value={targetBpm}
            onChange={(e) => setTargetBpm(Number(e.target.value))}
            disabled={playing}
            className="border rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-neutral-600">Passo (+BPM)</span>
          <input
            type="number"
            min={1}
            max={30}
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            disabled={playing}
            className="border rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-neutral-600">Compassos por passo</span>
          <input
            type="number"
            min={1}
            max={16}
            value={barsPerStep}
            onChange={(e) => setBarsPerStep(Number(e.target.value))}
            disabled={playing}
            className="border rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 col-span-2">
          <span className="text-neutral-600">Compasso</span>
          <select
            value={beatsPerBar}
            onChange={(e) => setBeatsPerBar(Number(e.target.value))}
            disabled={playing}
            className="border rounded px-3 py-2"
          >
            {[2, 3, 4, 6].map((n) => (
              <option key={n} value={n}>
                {n}/4
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-3 mt-5">
        {playing ? (
          <button onClick={parar} className="btn-primary">
            Parar
          </button>
        ) : (
          <button onClick={iniciar} className="btn-primary">
            Iniciar subida
          </button>
        )}
        {record !== null && (
          <span className="text-xs text-neutral-500">
            Seu recorde: <strong>{record} BPM</strong>
          </span>
        )}
      </div>
    </div>
  );
}
