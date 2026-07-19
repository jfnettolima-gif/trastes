// Dicionário de acordes do Trastes.
// Como todo o resto do app, os desenhos NÃO são tablaturas decoradas: cada
// forma é descrita como um "molde" de graus (intervalos em semitons a partir
// da tônica) por corda, e as casas são calculadas por teoria para qualquer
// tônica, usando exatamente o mesmo algoritmo do sistema CAGED (achar, para
// cada corda, a oitava do grau mais próxima da âncora da forma).

import {
  NoteName,
  pitchClass,
  noteNameFromPitchClass,
  STANDARD_TUNING,
} from "./music";

// Uma forma móvel de acorde: para cada corda (0 = 6ª/Mi grave ... 5 = 1ª/Mi
// agudo), o grau em semitons a partir da tônica, ou null se a corda não soa.
export type ChordShape = {
  name: string; // ex.: "Tônica na 6ª corda"
  roles: (number | null)[];
};

export type ChordType = {
  id: string;
  label: string; // "Maior", "Menor com sétima"...
  suffix: string; // sufixo do cifrado: "", "m", "7", "m7"...
  intervals: number[]; // notas do acorde (para exibir a lista de notas)
  formula: string; // ex.: "1 - 3 - 5"
  shapes: ChordShape[];
};

// Formas padrão de acorde. Cada qualidade traz as formas realmente tocáveis:
// a de tônica na 6ª corda (família "Mi") e/ou na 5ª corda (família "Lá").
export const CHORD_TYPES: ChordType[] = [
  {
    id: "maior",
    label: "Maior",
    suffix: "",
    intervals: [0, 4, 7],
    formula: "1 - 3 - 5",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 0, 4, 7, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 0, 4, 7] },
    ],
  },
  {
    id: "menor",
    label: "Menor",
    suffix: "m",
    intervals: [0, 3, 7],
    formula: "1 - b3 - 5",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 0, 3, 7, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 0, 3, 7] },
    ],
  },
  {
    id: "dom7",
    label: "Sétima (dominante)",
    suffix: "7",
    intervals: [0, 4, 7, 10],
    formula: "1 - 3 - 5 - b7",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 10, 4, 7, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 10, 4, 7] },
    ],
  },
  {
    id: "maj7",
    label: "Sétima maior",
    suffix: "7M",
    intervals: [0, 4, 7, 11],
    formula: "1 - 3 - 5 - 7",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 11, 4, 7, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 11, 4, 7] },
    ],
  },
  {
    id: "min7",
    label: "Menor com sétima",
    suffix: "m7",
    intervals: [0, 3, 7, 10],
    formula: "1 - b3 - 5 - b7",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 10, 3, 7, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 10, 3, 7] },
    ],
  },
  {
    id: "m7b5",
    label: "Meia-diminuta",
    suffix: "m7(b5)",
    intervals: [0, 3, 6, 10],
    formula: "1 - b3 - b5 - b7",
    shapes: [{ name: "Tônica na 5ª corda", roles: [null, 0, 6, 10, 3, null] }],
  },
  {
    id: "dim7",
    label: "Diminuta (com sétima)",
    suffix: "°",
    intervals: [0, 3, 6, 9],
    formula: "1 - b3 - b5 - bb7",
    shapes: [{ name: "Tônica na 5ª corda", roles: [null, 0, 6, 9, 3, null] }],
  },
  {
    id: "aug",
    label: "Aumentada",
    suffix: "+",
    intervals: [0, 4, 8],
    formula: "1 - 3 - #5",
    shapes: [{ name: "Tônica na 5ª corda", roles: [null, 0, 8, 0, 4, null] }],
  },
  {
    id: "sus4",
    label: "Suspenso 4",
    suffix: "sus4",
    intervals: [0, 5, 7],
    formula: "1 - 4 - 5",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 0, 5, 7, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 0, 5, 7] },
    ],
  },
  {
    id: "sus2",
    label: "Suspenso 2",
    suffix: "sus2",
    intervals: [0, 2, 7],
    formula: "1 - 2 - 5",
    shapes: [{ name: "Tônica na 5ª corda", roles: [null, 0, 7, 0, 2, 7] }],
  },
  {
    id: "sexta",
    label: "Com sexta",
    suffix: "6",
    intervals: [0, 4, 7, 9],
    formula: "1 - 3 - 5 - 6",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 0, 4, 9, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 9, 4, 7] },
    ],
  },
  {
    id: "min6",
    label: "Menor com sexta",
    suffix: "m6",
    intervals: [0, 3, 7, 9],
    formula: "1 - b3 - 5 - 6",
    shapes: [
      { name: "Tônica na 6ª corda", roles: [0, 7, 0, 3, 9, 0] },
      { name: "Tônica na 5ª corda", roles: [null, 0, 7, 9, 3, 7] },
    ],
  },
  {
    id: "nona",
    label: "Nona (dominante)",
    suffix: "9",
    intervals: [0, 4, 7, 10, 2],
    formula: "1 - 3 - 5 - b7 - 9",
    shapes: [{ name: "Tônica na 5ª corda", roles: [null, 0, 7, 2, 4, 10] }],
  },
];

export type ChordVoicing = {
  shapeName: string;
  frets: (number | null)[]; // casa por corda (null = não soa)
  roles: (number | null)[]; // grau por corda
  minFret: number;
  maxFret: number;
};

// Calcula as casas de uma forma para uma tônica, ancorando cada grau na
// oitava mais próxima da tônica da forma (mesma lógica de cagedShape).
export function chordVoicing(rootNote: NoteName, shape: ChordShape): ChordVoicing {
  const rootPc = pitchClass(rootNote);
  const openPc = STANDARD_TUNING.map((t) => pitchClass(t.note));
  const roles = shape.roles;

  const anchorString = roles.findIndex((r) => r !== null);
  const anchorPc = (rootPc + (roles[anchorString] as number)) % 12;
  const anchorFret = ((anchorPc - openPc[anchorString]) % 12 + 12) % 12;

  const frets = roles.map((role, s) => {
    if (role === null) return null;
    const pc = (rootPc + role) % 12;
    const base = ((pc - openPc[s]) % 12 + 12) % 12;
    let best = base;
    let bestDist = Infinity;
    for (let f = base; f <= base + 24; f += 12) {
      const d = Math.abs(f - anchorFret);
      if (d < bestDist) {
        bestDist = d;
        best = f;
      }
    }
    return best;
  });

  const played = frets.filter((f): f is number => f !== null);
  return {
    shapeName: shape.name,
    frets,
    roles,
    minFret: Math.min(...played),
    maxFret: Math.max(...played),
  };
}

// As notas (nomes) de um acorde, na ordem tônica → extensões.
export function chordNotes(rootNote: NoteName, intervals: number[]): NoteName[] {
  const rootPc = pitchClass(rootNote);
  return intervals.map((iv) => noteNameFromPitchClass((rootPc + iv) % 12));
}

export function chordSymbol(rootNote: NoteName, suffix: string): string {
  return `${rootNote}${suffix}`;
}
