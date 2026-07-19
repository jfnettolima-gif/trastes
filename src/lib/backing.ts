"use client";

// Motor de backing track sintetizado via Web Audio API. Gera bateria, baixo e
// acordes em loop, em vários estilos e tons, sem precisar de arquivos de áudio.

import { NoteName, pitchClass, noteNameFromPitchClass } from "@/lib/music";

export type ChordQuality = "maj" | "min" | "dom7" | "min7" | "maj7";

const QUALITY_INTERVALS: Record<ChordQuality, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dom7: [0, 4, 7, 10],
  min7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
};

const QUALITY_SUFFIX: Record<ChordQuality, string> = {
  maj: "",
  min: "m",
  dom7: "7",
  min7: "m7",
  maj7: "maj7",
};

// Um acorde da progressão: deslocamento em semitons a partir da tônica do tom + qualidade.
type ProgChord = { off: number; q: ChordQuality; bars?: number };

type Pattern16 = number[]; // 16 posições (semicolcheias) por compasso

export type BackingStyle = {
  id: string;
  nome: string;
  descricao: string;
  bpm: number;
  swing: boolean;
  chordMode: "block" | "arp";
  escalaSugerida: string;
  escalaHref?: string;
  progression: ProgChord[];
  kick: Pattern16;
  snare: Pattern16;
  hat: Pattern16;
  // baixo: valor = semitom relativo à fundamental do acorde; null = pausa
  bass: (number | null)[];
  // acordes: 1 = tocar naquela posição
  chordHits: Pattern16;
};

function on(steps: number[]): Pattern16 {
  const p = new Array(16).fill(0);
  steps.forEach((s) => (p[s] = 1));
  return p;
}

function bassLine(map: Record<number, number>): (number | null)[] {
  const p: (number | null)[] = new Array(16).fill(null);
  Object.entries(map).forEach(([k, v]) => (p[Number(k)] = v));
  return p;
}

export type InstrumentKind = "drums" | "bass" | "chords";

export const BACKING_STYLES: BackingStyle[] = [
  {
    id: "blues-shuffle",
    nome: "Blues Shuffle",
    descricao: "12 compassos clássicos, levada arrastada (shuffle).",
    bpm: 100,
    swing: true,
    chordMode: "block",
    escalaSugerida: "Pentatônica menor ou escala blues",
    escalaHref: "/escala-blues/1",
    progression: [
      { off: 0, q: "dom7" }, { off: 0, q: "dom7" }, { off: 0, q: "dom7" }, { off: 0, q: "dom7" },
      { off: 5, q: "dom7" }, { off: 5, q: "dom7" }, { off: 0, q: "dom7" }, { off: 0, q: "dom7" },
      { off: 7, q: "dom7" }, { off: 5, q: "dom7" }, { off: 0, q: "dom7" }, { off: 7, q: "dom7" },
    ],
    kick: on([0, 8]),
    snare: on([4, 12]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 2: 7, 4: 9, 6: 7, 8: 0, 10: 7, 12: 9, 14: 7 }),
    chordHits: on([4, 12]),
  },
  {
    id: "rock",
    nome: "Rock",
    descricao: "Levada reta e pesada em tom menor.",
    bpm: 120,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Pentatônica menor",
    escalaHref: "/pentatonica-menor/1",
    progression: [
      { off: 0, q: "min" }, { off: 0, q: "min" }, { off: 8, q: "maj" }, { off: 10, q: "maj" },
    ],
    kick: on([0, 6, 8, 14]),
    snare: on([4, 12]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 2: 0, 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 14: 0 }),
    chordHits: on([0]),
  },
  {
    id: "pop",
    nome: "Pop",
    descricao: "A progressão I-V-vi-IV, reta e alegre.",
    bpm: 104,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Escala maior ou pentatônica maior",
    escalaHref: "/pentatonica-maior/1",
    progression: [
      { off: 0, q: "maj" }, { off: 7, q: "maj" }, { off: 9, q: "min" }, { off: 5, q: "maj" },
    ],
    kick: on([0, 8]),
    snare: on([4, 12]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 8: 0, 12: 7 }),
    chordHits: on([0, 8]),
  },
  {
    id: "funk",
    nome: "Funk",
    descricao: "Vamp de um acorde menor, cheio de síncope.",
    bpm: 100,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Dórico ou pentatônica menor",
    escalaHref: "/modos-gregos/dorico",
    progression: [{ off: 0, q: "min7" }],
    kick: on([0, 3, 6, 10]),
    snare: on([4, 12]),
    hat: on([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
    bass: bassLine({ 0: 0, 3: 0, 6: 12, 8: 7, 11: 0, 14: 10 }),
    chordHits: on([2, 7, 11]),
  },
  {
    id: "balada",
    nome: "Balada",
    descricao: "Lenta e arpejada, para frases melódicas.",
    bpm: 68,
    swing: false,
    chordMode: "arp",
    escalaSugerida: "Escala maior",
    escalaHref: "/escala-maior/1",
    progression: [
      { off: 9, q: "min" }, { off: 5, q: "maj" }, { off: 0, q: "maj" }, { off: 7, q: "maj" },
    ],
    kick: on([0, 8]),
    snare: on([4, 12]),
    hat: on([0, 4, 8, 12]),
    bass: bassLine({ 0: 0, 8: 0 }),
    chordHits: on([0, 2, 4, 6, 8, 10, 12, 14]),
  },
  {
    id: "jazz",
    nome: "Jazz (ii-V-I)",
    descricao: "Swing com contrabaixo caminhando.",
    bpm: 124,
    swing: true,
    chordMode: "block",
    escalaSugerida: "Escala maior e modos",
    escalaHref: "/modos-gregos/jonio",
    progression: [
      { off: 2, q: "min7" }, { off: 7, q: "dom7" }, { off: 0, q: "maj7" }, { off: 0, q: "maj7" },
    ],
    kick: on([0]),
    snare: on([4, 12]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 4: 4, 8: 7, 12: 10 }),
    chordHits: on([2, 10]),
  },
  {
    id: "reggae",
    nome: "Reggae",
    descricao: "One-drop com o skank nos contratempos.",
    bpm: 76,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Escala maior ou pentatônica maior",
    escalaHref: "/pentatonica-maior/1",
    progression: [
      { off: 0, q: "maj" }, { off: 5, q: "maj" }, { off: 0, q: "maj" }, { off: 7, q: "maj" },
    ],
    kick: on([8]),
    snare: on([8]),
    hat: on([2, 6, 10, 14]),
    bass: bassLine({ 0: 0, 3: 0, 8: 0, 11: 12 }),
    chordHits: on([2, 6, 10, 14]),
  },
  {
    id: "bossa",
    nome: "Bossa Nova",
    descricao: "Balanço suave com acordes de sétima.",
    bpm: 130,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Escala maior e modos",
    escalaHref: "/modos-gregos/jonio",
    progression: [
      { off: 0, q: "maj7" }, { off: 2, q: "min7" }, { off: 7, q: "dom7" }, { off: 0, q: "maj7" },
    ],
    kick: on([0, 6, 8, 14]),
    snare: on([3, 10]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 4: 7, 8: 0, 12: 7 }),
    chordHits: on([0, 6, 10]),
  },
  {
    id: "metal",
    nome: "Metal",
    descricao: "Chugging pesado e rápido em tom menor.",
    bpm: 150,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Pentatônica menor ou frígio",
    escalaHref: "/modos-gregos/frigio",
    progression: [
      { off: 0, q: "min" }, { off: 0, q: "min" }, { off: 8, q: "maj" }, { off: 10, q: "maj" },
    ],
    kick: on([0, 2, 4, 6, 8, 10, 12, 14]),
    snare: on([4, 12]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 2: 0, 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 14: 0 }),
    chordHits: on([0, 4, 8, 12]),
  },
  {
    id: "sertanejo",
    nome: "Sertanejo / Country",
    descricao: "Baixo alternado (boom-chick) bem alegre.",
    bpm: 100,
    swing: false,
    chordMode: "block",
    escalaSugerida: "Escala maior ou pentatônica maior",
    escalaHref: "/escala-maior/1",
    progression: [
      { off: 0, q: "maj" }, { off: 7, q: "maj" }, { off: 9, q: "min" }, { off: 5, q: "maj" },
    ],
    kick: on([0, 8]),
    snare: on([4, 12]),
    hat: on([0, 2, 4, 6, 8, 10, 12, 14]),
    bass: bassLine({ 0: 0, 4: 7, 8: 0, 12: 7 }),
    chordHits: on([4, 12]),
  },
];

export function chordSymbol(root: NoteName, off: number, q: ChordQuality): string {
  const pc = (pitchClass(root) + off) % 12;
  return noteNameFromPitchClass(pc) + QUALITY_SUFFIX[q];
}

export function expandBars(style: BackingStyle): ProgChord[] {
  const bars: ProgChord[] = [];
  style.progression.forEach((c) => {
    const n = c.bars ?? 1;
    for (let i = 0; i < n; i++) bars.push(c);
  });
  return bars;
}

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export class BackingEngine {
  private ctx: AudioContext;
  private master: GainNode;
  private drumGain: GainNode;
  private bassGain: GainNode;
  private chordGain: GainNode;
  private noise: AudioBuffer;
  private timer: ReturnType<typeof setInterval> | null = null;
  private step = 0;
  private nextTime = 0;
  private arpIndex = 0;
  private style: BackingStyle;
  private rootPc = 0;
  private bpm = 100;
  private bars: ProgChord[] = [];
  playing = false;
  onBar?: (barIndex: number) => void;
  onBeat?: (beatInBar: number) => void;

  constructor() {
    this.ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const comp = this.ctx.createDynamicsCompressor();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);

    this.drumGain = this.ctx.createGain();
    this.bassGain = this.ctx.createGain();
    this.chordGain = this.ctx.createGain();
    this.drumGain.gain.value = 0.9;
    this.bassGain.gain.value = 1.0;
    this.chordGain.gain.value = 0.8;
    this.drumGain.connect(this.master);
    this.bassGain.connect(this.master);
    this.chordGain.connect(this.master);

    const len = this.ctx.sampleRate * 1;
    this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    this.style = BACKING_STYLES[0];
  }

  start(style: BackingStyle, root: NoteName, bpm: number) {
    this.stop();
    this.style = style;
    this.rootPc = pitchClass(root);
    this.bpm = bpm;
    this.bars = expandBars(style);
    this.step = 0;
    this.arpIndex = 0;
    if (this.ctx.state === "suspended") this.ctx.resume();
    this.nextTime = this.ctx.currentTime + 0.1;
    this.playing = true;
    this.timer = setInterval(() => this.scheduler(), 25);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.playing = false;
  }

  setVolume(kind: InstrumentKind, value: number) {
    const node =
      kind === "drums" ? this.drumGain : kind === "bass" ? this.bassGain : this.chordGain;
    node.gain.setTargetAtTime(value, this.ctx.currentTime, 0.02);
  }

  dispose() {
    this.stop();
    this.ctx.close();
  }

  private stepDur(): number {
    return 60 / this.bpm / 4; // uma semicolcheia
  }

  private scheduler() {
    const lookahead = 0.12;
    while (this.nextTime < this.ctx.currentTime + lookahead) {
      this.scheduleStep(this.step, this.nextTime);
      this.step++;
      this.nextTime += this.stepDur();
    }
  }

  private scheduleStep(globalStep: number, time: number) {
    const s = this.style;
    const total = this.bars.length * 16;
    const g = globalStep % total;
    const bar = Math.floor(g / 16) % this.bars.length;
    const step = g % 16;
    const chord = this.bars[bar];

    let t = time;
    if (s.swing && step % 4 === 2) t += this.stepDur() * 0.6;

    if (s.kick[step]) this.kick(t);
    if (s.snare[step]) this.snare(t);
    if (s.hat[step]) this.hat(t);

    const bassSemi = s.bass[step];
    if (bassSemi !== null && bassSemi !== undefined) {
      const midi = 36 + ((this.rootPc + chord.off + bassSemi) % 12);
      this.bassNote(t, midiToFreq(midi));
    }

    if (s.chordHits[step]) {
      const intervals = QUALITY_INTERVALS[chord.q];
      if (s.chordMode === "arp") {
        const iv = intervals[this.arpIndex % intervals.length];
        this.arpIndex++;
        const midi = 52 + ((this.rootPc + chord.off) % 12) + iv;
        this.chordNote(t, midiToFreq(midi), this.stepDur() * 3.5);
      } else {
        const dur = this.stepDur() * 3;
        intervals.forEach((iv) => {
          const midi = 48 + ((this.rootPc + chord.off) % 12) + iv;
          this.chordNote(t, midiToFreq(midi), dur);
        });
      }
    }

    if (step === 0 && this.onBar) {
      const b = bar;
      const when = (t - this.ctx.currentTime) * 1000;
      setTimeout(() => this.onBar && this.onBar(b), Math.max(0, when));
    }

    if (step % 4 === 0 && this.onBeat) {
      const beat = step / 4;
      const when = (t - this.ctx.currentTime) * 1000;
      setTimeout(() => this.onBeat && this.onBeat(beat), Math.max(0, when));
    }
  }

  private kick(t: number) {
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(45, t + 0.13);
    g.gain.setValueAtTime(0.9, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
    osc.connect(g);
    g.connect(this.drumGain);
    osc.start(t);
    osc.stop(t + 0.18);
  }

  private snare(t: number) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1800;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
    src.connect(bp);
    bp.connect(g);
    g.connect(this.drumGain);
    src.start(t);
    src.stop(t + 0.16);
  }

  private hat(t: number) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = this.ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7000;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.22, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
    src.connect(hp);
    hp.connect(g);
    g.connect(this.drumGain);
    src.start(t);
    src.stop(t + 0.06);
  }

  private bassNote(t: number, freq: number) {
    const osc = this.ctx.createOscillator();
    const lp = this.ctx.createBiquadFilter();
    const g = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    lp.type = "lowpass";
    lp.frequency.value = 500;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(lp);
    lp.connect(g);
    g.connect(this.bassGain);
    osc.start(t);
    osc.stop(t + 0.24);
  }

  private chordNote(t: number, freq: number, dur: number) {
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = "triangle";
    osc2.type = "sine";
    osc.frequency.value = freq;
    osc2.frequency.value = freq * 2;
    const g2 = this.ctx.createGain();
    g2.gain.value = 0.12;
    osc2.connect(g2);
    g2.connect(g);
    osc.connect(g);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.13, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    g.connect(this.chordGain);
    osc.start(t);
    osc2.start(t);
    osc.stop(t + dur + 0.05);
    osc2.stop(t + dur + 0.05);
  }
}
