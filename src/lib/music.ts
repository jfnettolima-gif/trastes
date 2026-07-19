// Motor de teoria musical do Trastes.
// Tudo aqui é calculado matematicamente a partir de classes de altura (pitch
// classes), então funciona para qualquer tom, escala ou afinação: nada de
// tablaturas fixas "decoradas", os desenhos são sempre derivados da teoria.

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export function pitchClass(note: NoteName): number {
  return NOTE_NAMES.indexOf(note);
}

export function noteNameFromPitchClass(pc: number): NoteName {
  const idx = ((pc % 12) + 12) % 12;
  return NOTE_NAMES[idx];
}

// Frequência (Hz) das cordas soltas na afinação padrão, do Mi grave para o Mi agudo.
export const STANDARD_TUNING: { note: NoteName; freq: number }[] = [
  { note: "E", freq: 82.41 }, // 6ª corda (Mi grave)
  { note: "A", freq: 110.0 }, // 5ª corda (Lá)
  { note: "D", freq: 146.83 }, // 4ª corda (Ré)
  { note: "G", freq: 196.0 }, // 3ª corda (Sol)
  { note: "B", freq: 246.94 }, // 2ª corda (Si)
  { note: "E", freq: 329.63 }, // 1ª corda (Mi agudo)
];

export const STRING_LABELS = ["6ª (Mi grave)", "5ª (Lá)", "4ª (Ré)", "3ª (Sol)", "2ª (Si)", "1ª (Mi agudo)"];

export function frequencyAt(stringIndex: number, fret: number): number {
  const open = STANDARD_TUNING[stringIndex].freq;
  return open * Math.pow(2, fret / 12);
}

export function pitchClassAt(stringIndex: number, fret: number): number {
  const openPc = pitchClass(STANDARD_TUNING[stringIndex].note);
  return (openPc + fret) % 12;
}

// Fórmulas de escala em semitons a partir da tônica.
export type ScaleKey =
  | "pentatonicaMenor"
  | "pentatonicaMaior"
  | "blues"
  | "escalaMaior"
  | "menorNatural"
  | "menorHarmonica"
  | "menorMelodica";

export const SCALES: Record<
  ScaleKey,
  { label: string; intervals: number[]; formula: string }
> = {
  pentatonicaMenor: {
    label: "Pentatônica menor",
    intervals: [0, 3, 5, 7, 10],
    formula: "1 - b3 - 4 - 5 - b7",
  },
  pentatonicaMaior: {
    label: "Pentatônica maior",
    intervals: [0, 2, 4, 7, 9],
    formula: "1 - 2 - 3 - 5 - 6",
  },
  blues: {
    label: "Escala blues",
    intervals: [0, 3, 5, 6, 7, 10],
    formula: "1 - b3 - 4 - b5 - 5 - b7",
  },
  escalaMaior: {
    label: "Escala maior",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    formula: "1 - 2 - 3 - 4 - 5 - 6 - 7",
  },
  menorNatural: {
    label: "Menor natural",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    formula: "1 - 2 - b3 - 4 - 5 - b6 - b7",
  },
  menorHarmonica: {
    label: "Menor harmônica",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    formula: "1 - 2 - b3 - 4 - 5 - b6 - 7",
  },
  menorMelodica: {
    label: "Menor melódica",
    intervals: [0, 2, 3, 5, 7, 9, 11],
    formula: "1 - 2 - b3 - 4 - 5 - 6 - 7",
  },
};

export const INTERVAL_LABELS: Record<number, { short: string; name: string }> = {
  0: { short: "1", name: "Tônica" },
  1: { short: "b2", name: "Segunda menor" },
  2: { short: "2", name: "Segunda maior" },
  3: { short: "b3", name: "Terça menor" },
  4: { short: "3", name: "Terça maior" },
  5: { short: "4", name: "Quarta justa" },
  6: { short: "#4/b5", name: "Quarta aumentada / Quinta diminuta" },
  7: { short: "5", name: "Quinta justa" },
  8: { short: "b6", name: "Sexta menor" },
  9: { short: "6", name: "Sexta maior" },
  10: { short: "b7", name: "Sétima menor" },
  11: { short: "7", name: "Sétima maior" },
};

export type FretCell = {
  string: number; // 0 = 6ª corda (Mi grave) ... 5 = 1ª corda (Mi agudo)
  fret: number;
  pc: number;
  noteName: NoteName;
  inScale: boolean;
  isRoot: boolean;
  interval: number | null; // semitons a partir da tônica, se estiver na escala
};

export function buildFretboard(opts: {
  rootNote: NoteName;
  scaleKey: ScaleKey;
  fretStart?: number;
  fretEnd?: number;
}): FretCell[][] {
  const { rootNote, scaleKey } = opts;
  const fretStart = opts.fretStart ?? 0;
  const fretEnd = opts.fretEnd ?? 15;
  const rootPc = pitchClass(rootNote);
  const intervals = new Set(SCALES[scaleKey].intervals);

  const grid: FretCell[][] = [];
  for (let s = 0; s < 6; s++) {
    const row: FretCell[] = [];
    for (let f = fretStart; f <= fretEnd; f++) {
      const pc = pitchClassAt(s, f);
      const rel = ((pc - rootPc) % 12 + 12) % 12;
      const inScale = intervals.has(rel);
      row.push({
        string: s,
        fret: f,
        pc,
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

// Calcula, a partir da teoria (não de tablatura decorada), os 5 pontos de
// partida clássicos dos "desenhos" (boxes) de uma escala pentatônica/blues:
// são exatamente as casas onde a nota da escala aparece na 6ª corda (Mi
// grave), tomando a tônica como início do desenho 1 e as 4 seguintes como
// início dos desenhos 2 a 5.
export function pentatonicShapeStarts(
  rootNote: NoteName,
  scaleKey: ScaleKey = "pentatonicaMenor"
): number[] {
  const rootPc = pitchClass(rootNote);
  const intervals = new Set(SCALES[scaleKey].intervals);
  const scaleFretsOnLowE: number[] = [];
  for (let f = 0; f <= 24; f++) {
    const pc = pitchClassAt(0, f);
    const rel = ((pc - rootPc) % 12 + 12) % 12;
    if (intervals.has(rel)) scaleFretsOnLowE.push(f);
  }
  const firstRootIdx = scaleFretsOnLowE.findIndex((f) => {
    const pc = pitchClassAt(0, f);
    return pc === rootPc;
  });
  const start = firstRootIdx >= 0 ? firstRootIdx : 0;
  return scaleFretsOnLowE.slice(start, start + 5);
}

export function shapeWindow(startFret: number): [number, number] {
  return [startFret, startFret + 3];
}

// Gera uma tablatura em texto simples para uma janela de casas, marcando
// apenas as casas que pertencem à escala (as mesmas que aparecem no braço
// interativo). Ordem das linhas: 1ª corda (Mi agudo) no topo, como em
// tablaturas convencionais.
export function asciiTab(opts: {
  rootNote: NoteName;
  scaleKey: ScaleKey;
  fretStart: number;
  fretEnd: number;
}): string {
  const grid = buildFretboard(opts);
  const labels = ["E", "B", "G", "D", "A", "E"]; // 1ª (agudo) -> 6ª (grave)
  const lines: string[] = [];
  for (let s = 5; s >= 0; s--) {
    const cells = grid[s];
    const parts = cells.map((c) => (c.inScale ? String(c.fret).padStart(2, "0") : "--"));
    lines.push(`${labels[5 - s]}|-${parts.join("-")}-|`);
  }
  return lines.join("\n");
}

// Offset absoluto (em semitons) de cada corda solta em relação à 6ª corda,
// derivado diretamente da afinação (não hardcoded): permite achar a "altura
// absoluta" de qualquer casa em qualquer corda, o que é necessário para
// encadear posições de forma musicalmente contínua (ver
// threeNotesPerStringPositions abaixo).
function openStringAbsoluteSemitones(): number[] {
  const offsets = [0];
  for (let s = 1; s < STANDARD_TUNING.length; s++) {
    const diff =
      ((pitchClass(STANDARD_TUNING[s].note) - pitchClass(STANDARD_TUNING[s - 1].note)) % 12 + 12) % 12;
    offsets.push(offsets[s - 1] + diff);
  }
  return offsets;
}

// Gera as 7 posições de "3 notas por corda" de uma escala diatônica (maior
// ou qualquer uma das menores), o sistema mais usado para escalas de 7 notas
// (diferente do sistema de 5 caixas usado nas pentatônicas). O algoritmo
// simula tocar a escala ascendente nota a nota: em cada corda, toma as 3
// notas da escala mais próximas em altura, e ao trocar de corda continua
// exatamente de onde parou (usando altura absoluta, não casa relativa).
// Isso resolve sozinho, sem regra especial, o ajuste clássico necessário na
// passagem da 3ª corda (Sol) para a 2ª (Si), que na afinação padrão é uma
// terça maior em vez de uma quarta justa como as demais cordas.
export function threeNotesPerStringPositions(
  rootNote: NoteName,
  scaleKey: ScaleKey = "escalaMaior"
): number[][][] {
  const rootPc = pitchClass(rootNote);
  const intervals = new Set(SCALES[scaleKey].intervals);
  const openAbs = openStringAbsoluteSemitones();

  function isScaleTone(s: number, fret: number): boolean {
    const pc = pitchClassAt(s, fret);
    const rel = ((pc - rootPc) % 12 + 12) % 12;
    return intervals.has(rel);
  }

  function ascendingScaleFrets(s: number, fromFret: number, count: number): number[] {
    const result: number[] = [];
    let f = fromFret;
    while (result.length < count && f < fromFret + 30) {
      if (isScaleTone(s, f)) result.push(f);
      f++;
    }
    return result;
  }

  function buildPosition(startFret: number): number[][] {
    const stringFrets: number[][] = [];
    const frets0 = ascendingScaleFrets(0, startFret, 3);
    stringFrets.push(frets0);
    let lastAbs = openAbs[0] + frets0[2];
    for (let s = 1; s < 6; s++) {
      let f = 0;
      while (!(openAbs[s] + f >= lastAbs && isScaleTone(s, f))) {
        f++;
        if (f > 40) break; // salvaguarda, não deve acontecer em uso normal
      }
      const fretsS = ascendingScaleFrets(s, f, 3);
      stringFrets.push(fretsS);
      lastAbs = openAbs[s] + fretsS[2];
    }
    return stringFrets;
  }

  // Pontos de partida: 7 ocorrências consecutivas da escala na 6ª corda, a
  // partir da primeira aparição da tônica (a posição 1 sempre começa nela).
  const scaleFretsOnLowE: number[] = [];
  for (let f = 0; f <= 24; f++) {
    if (isScaleTone(0, f)) scaleFretsOnLowE.push(f);
  }
  const firstRootIdx = scaleFretsOnLowE.findIndex((f) => pitchClassAt(0, f) === rootPc);
  const start = firstRootIdx >= 0 ? firstRootIdx : 0;
  const starts = scaleFretsOnLowE.slice(start, start + 7);

  return starts.map(buildPosition);
}

// Tablatura em texto para uma posição de 3 notas por corda (frets explícitos
// por corda, não uma janela retangular uniforme como em asciiTab).
export function asciiTabFromFrets(stringFrets: number[][]): string {
  const labels = ["E", "B", "G", "D", "A", "E"]; // 1ª (agudo) -> 6ª (grave)
  const lines: string[] = [];
  for (let s = 5; s >= 0; s--) {
    const parts = stringFrets[s].map((f) => String(f).padStart(2, "0"));
    lines.push(`${labels[5 - s]}|-${parts.join("-")}-|`);
  }
  return lines.join("\n");
}

export const ALL_NOTES: NoteName[] = [...NOTE_NAMES];
