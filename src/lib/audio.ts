"use client";

// Sintetizador simples via Web Audio API (sem precisar de amostras de áudio).
// Suficiente para o aluno ouvir a nota e reconhecer a altura relativa.

let ctx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

export function playTone(frequency: number, durationSec = 0.9) {
  const audioCtx = getContext();
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "triangle";
  osc2.type = "sine";
  osc.frequency.value = frequency;
  osc2.frequency.value = frequency * 2; // um harmônico para dar corpo ao som

  const g2 = audioCtx.createGain();
  g2.gain.value = 0.15;
  osc2.connect(g2);
  g2.connect(gain);
  osc.connect(gain);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

  gain.connect(audioCtx.destination);

  osc.start(now);
  osc2.start(now);
  osc.stop(now + durationSec + 0.05);
  osc2.stop(now + durationSec + 0.05);
}

export function playClick(accent = false) {
  const audioCtx = getContext();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "square";
  osc.frequency.value = accent ? 1500 : 900;
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + 0.08);
}
