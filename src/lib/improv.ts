// Assistente de improviso: a partir de uma sequência de acordes digitada pelo
// aluno, deduz o tom (campo harmônico da escala maior), a função de cada acorde
// e qual escala/modo/arpejo usar para solar. Tudo derivado da teoria.

import {
  NoteName,
  pitchClass,
  noteNameFromPitchClass,
  diatonicTriads,
} from "./music";

export type ChordTriad = "maior" | "menor" | "diminuto" | "aumentado";

export type ParsedChord = {
  raw: string;
  rootPc: number;
  rootName: NoteName;
  quality: string; // rótulo legível: "maior", "menor com sétima", etc.
  triad: ChordTriad; // tríade base, para casar com o campo harmônico
};

const LETTER_PC: Record<string, number> = {
  C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11,
};

// Interpreta um cifrado isolado (ex.: "Am", "G7", "F#m7", "Bbmaj7", "C#dim").
export function parseChord(raw: string): ParsedChord | null {
  const s = raw.trim();
  const m = s.match(/^([A-Ga-g])([#b]?)(.*)$/);
  if (!m) return null;
  const letter = m[1].toUpperCase();
  const accidental = m[2];
  let pc = LETTER_PC[letter];
  if (pc === undefined) return null;
  if (accidental === "#") pc = (pc + 1) % 12;
  if (accidental === "b") pc = (pc + 11) % 12;

  const suffix = m[3];
  const low = suffix.toLowerCase();

  let triad: ChordTriad = "maior";
  let quality = "maior";

  if (/^(maj7|7m|m7\+5)/.test(low) || /^M7/.test(suffix)) {
    triad = "maior";
    quality = "sétima maior";
  } else if (/(m7b5|m7\(b5\)|ø)/.test(low)) {
    triad = "diminuto";
    quality = "meia-diminuta";
  } else if (/^(dim|°|o7|o)/.test(low)) {
    triad = "diminuto";
    quality = "diminuta";
  } else if (/^(aug|\+)/.test(low)) {
    triad = "aumentado";
    quality = "aumentada";
  } else if (/^(m|min)(?!aj)/.test(low)) {
    triad = "menor";
    quality = low.includes("7") ? "menor com sétima" : "menor";
  } else {
    triad = "maior";
    if (low.includes("7")) quality = "sétima (dominante)";
    else if (low.startsWith("sus")) quality = "suspensa";
    else if (low.includes("6")) quality = "com sexta";
    else quality = "maior";
  }

  return {
    raw: s,
    rootPc: pc,
    rootName: noteNameFromPitchClass(pc),
    quality,
    triad,
  };
}

// Separa uma linha de cifras por espaço, vírgula ou barra.
export function parseProgression(text: string): ParsedChord[] {
  return text
    .split(/[\s,|]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map(parseChord)
    .filter((c): c is ParsedChord => c !== null);
}

const MODE_BY_DEGREE = [
  "jônio (maior)",
  "dórico",
  "frígio",
  "lídio",
  "mixolídio",
  "eólio (menor natural)",
  "lócrio",
];

export type ChordAnalysis = {
  chord: ParsedChord;
  inKey: boolean;
  roman: string | null;
  degree: number | null; // 1..7
  mode: string | null; // "dórico de Ré"
  arpejo: string; // "Dm7 (as notas do acorde)"
};

export type KeyResult = {
  ok: boolean;
  keyRoot: NoteName | null;
  relativeMinor: NoteName | null;
  confidence: number; // 0..1
  minorFeel: boolean;
  analyses: ChordAnalysis[];
  parentScaleLabel: string | null; // "Escala maior de Dó"
  pentatonicLabel: string | null; // "Pentatônica menor de Lá"
};

function romanFor(degree: number, triad: ChordTriad): string {
  const R = ["I", "II", "III", "IV", "V", "VI", "VII"][degree];
  if (triad === "menor") return R.toLowerCase();
  if (triad === "diminuto") return R.toLowerCase() + "°";
  if (triad === "aumentado") return R + "+";
  return R;
}

// Descobre o tom mais provável testando os 12 campos harmônicos maiores e
// pontuando quantos acordes encaixam (raiz + tríade).
export function detectKey(chords: ParsedChord[]): KeyResult {
  if (chords.length === 0) {
    return {
      ok: false,
      keyRoot: null,
      relativeMinor: null,
      confidence: 0,
      minorFeel: false,
      analyses: [],
      parentScaleLabel: null,
      pentatonicLabel: null,
    };
  }

  let best = { rootPc: 0, score: -1 };
  for (let rootPc = 0; rootPc < 12; rootPc++) {
    const triads = diatonicTriads(noteNameFromPitchClass(rootPc), "escalaMaior");
    let score = 0;
    for (const ch of chords) {
      const dt = triads.find((t) => pitchClass(t.rootNote) === ch.rootPc);
      if (!dt) continue;
      score += dt.quality === ch.triad ? 1 : 0.4;
    }
    if (score > best.score) best = { rootPc, score };
  }

  const keyRootName = noteNameFromPitchClass(best.rootPc);
  const triads = diatonicTriads(keyRootName, "escalaMaior");
  const relMinorPc = (best.rootPc + 9) % 12;
  const relativeMinor = noteNameFromPitchClass(relMinorPc);

  const analyses: ChordAnalysis[] = chords.map((ch) => {
    const idx = triads.findIndex((t) => pitchClass(t.rootNote) === ch.rootPc);
    if (idx < 0) {
      return {
        chord: ch,
        inKey: false,
        roman: null,
        degree: null,
        mode: null,
        arpejo: `${ch.raw} (as notas do próprio acorde)`,
      };
    }
    return {
      chord: ch,
      inKey: true,
      roman: romanFor(idx, ch.triad),
      degree: idx + 1,
      mode: `${MODE_BY_DEGREE[idx]} de ${ch.rootName}`,
      arpejo: `${ch.raw} (as notas do próprio acorde)`,
    };
  });

  const confidence = best.score / chords.length;

  // Sensação menor: a peça começa ou termina no acorde relativo menor (vi).
  const first = chords[0];
  const last = chords[chords.length - 1];
  const minorFeel =
    (last.rootPc === relMinorPc && last.triad === "menor") ||
    (first.rootPc === relMinorPc && first.triad === "menor");

  return {
    ok: confidence >= 0.5,
    keyRoot: keyRootName,
    relativeMinor,
    confidence,
    minorFeel,
    analyses,
    parentScaleLabel: `Escala maior de ${keyRootName}`,
    pentatonicLabel: `Pentatônica menor de ${relativeMinor}`,
  };
}
