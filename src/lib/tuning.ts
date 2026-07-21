// Afinações alternativas. Como todo o Trastes calcula os desenhos por teoria
// (classes de altura), basta trocar as notas das cordas soltas para recalcular
// escalas e notas em qualquer afinação, sem nada decorado.

import {
  NoteName,
  ScaleKey,
  SCALES,
  pitchClass,
  noteNameFromPitchClass,
} from "./music";

export type Tuning = {
  id: string;
  nome: string;
  descricao: string;
  // Notas das cordas soltas, da 6ª (mais grave) para a 1ª (mais aguda).
  cordas: NoteName[];
};

export const TUNINGS: Tuning[] = [
  {
    id: "padrao",
    nome: "Padrão (E A D G B E)",
    descricao: "A afinação padrão, ponto de referência de tudo.",
    cordas: ["E", "A", "D", "G", "B", "E"],
  },
  {
    id: "drop-d",
    nome: "Drop D (D A D G B E)",
    descricao: "6ª corda baixada um tom. Power chords com um dedo e peso no rock/metal.",
    cordas: ["D", "A", "D", "G", "B", "E"],
  },
  {
    id: "meio-tom",
    nome: "Meio tom abaixo (Eb Ab Db Gb Bb Eb)",
    descricao: "Tudo meio tom abaixo. Som mais grave e cordas mais soltas, comum no blues e no rock.",
    cordas: ["D#", "G#", "C#", "F#", "A#", "D#"],
  },
  {
    id: "um-tom",
    nome: "Um tom abaixo (D G C F A D)",
    descricao: "Tudo um tom abaixo, som grave e encorpado.",
    cordas: ["D", "G", "C", "F", "A", "D"],
  },
  {
    id: "drop-c",
    nome: "Drop C (C G C F A D)",
    descricao: "Um tom abaixo e a 6ª em Drop. Muito usado no metal moderno.",
    cordas: ["C", "G", "C", "F", "A", "D"],
  },
  {
    id: "dadgad",
    nome: "DADGAD (D A D G A D)",
    descricao: "Afinação suspensa, som aberto e modal. Folk celta e violão de dedo.",
    cordas: ["D", "A", "D", "G", "A", "D"],
  },
  {
    id: "open-g",
    nome: "Open G (D G D G B D)",
    descricao: "Cordas soltas formam um Sol maior. Slide e riffs (Rolling Stones).",
    cordas: ["D", "G", "D", "G", "B", "D"],
  },
  {
    id: "open-d",
    nome: "Open D (D A D F# A D)",
    descricao: "Cordas soltas formam um Ré maior. Slide e blues acústico.",
    cordas: ["D", "A", "D", "F#", "A", "D"],
  },
  {
    id: "open-e",
    nome: "Open E (E B E G# B E)",
    descricao: "Cordas soltas formam um Mi maior. Slide, som brilhante.",
    cordas: ["E", "B", "E", "G#", "B", "E"],
  },
];

// MIDI das cordas soltas na afinação padrão (E2 A2 D3 G3 B3 E4), usado como
// referência de oitava para achar uma frequência plausível em outras afinações.
const STANDARD_OPEN_MIDI = [40, 45, 50, 55, 59, 64];

// Escolhe a oitava da nota da corda mais próxima da oitava padrão daquela corda,
// para o som sair no registro certo (a 6ª grave, a 1ª aguda).
function openStringMidi(stringIndex: number, note: NoteName): number {
  const pc = pitchClass(note);
  const ref = STANDARD_OPEN_MIDI[stringIndex];
  let best = pc;
  let bestDist = Infinity;
  for (let oct = 1; oct <= 6; oct++) {
    const midi = pc + 12 * oct;
    const d = Math.abs(midi - ref);
    if (d < bestDist) {
      bestDist = d;
      best = midi;
    }
  }
  return best;
}

export function tuningFrequencyAt(
  tuning: Tuning,
  stringIndex: number,
  fret: number
): number {
  const midi = openStringMidi(stringIndex, tuning.cordas[stringIndex]) + fret;
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export type TuningCell = {
  string: number;
  fret: number;
  noteName: NoteName;
  inScale: boolean;
  isRoot: boolean;
  interval: number | null;
};

// Monta o braço para uma afinação + escala + tônica. Linha 0 = 6ª corda.
export function buildTuningFretboard(opts: {
  tuning: Tuning;
  rootNote: NoteName;
  scaleKey: ScaleKey;
  fretStart?: number;
  fretEnd?: number;
}): TuningCell[][] {
  const { tuning, rootNote, scaleKey } = opts;
  const fretStart = opts.fretStart ?? 0;
  const fretEnd = opts.fretEnd ?? 15;
  const rootPc = pitchClass(rootNote);
  const intervals = new Set(SCALES[scaleKey].intervals);

  const grid: TuningCell[][] = [];
  for (let s = 0; s < 6; s++) {
    const openPc = pitchClass(tuning.cordas[s]);
    const row: TuningCell[] = [];
    for (let f = fretStart; f <= fretEnd; f++) {
      const pc = (openPc + f) % 12;
      const rel = ((pc - rootPc) % 12 + 12) % 12;
      const inScale = intervals.has(rel);
      row.push({
        string: s,
        fret: f,
        noteName: noteNameFromPitchClass(pc),
        inScale,
        isRoot: rel === 0,
        interval: inScale ? rel : null,
      });
    }
    grid.push(row);
  }
  return grid;
}
