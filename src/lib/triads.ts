// Tríades no braço: as formas de acorde de 3 notas (1, 3, 5) em conjuntos de
// 3 cordas adjacentes, nas suas 3 inversões. São a ponte entre acordes e
// escalas e a base do sweep e das viradas. Tudo calculado por teoria: dada a
// tônica e a qualidade, as casas saem sozinhas em qualquer conjunto de cordas.

import { NoteName, pitchClass, noteNameFromPitchClass, pitchClassAt } from "./music";

export type TriadeQualidade = "maior" | "menor" | "diminuta" | "aumentada";

const TERCA: Record<TriadeQualidade, number> = {
  maior: 4,
  menor: 3,
  diminuta: 3,
  aumentada: 4,
};
const QUINTA: Record<TriadeQualidade, number> = {
  maior: 7,
  menor: 7,
  diminuta: 6,
  aumentada: 8,
};

// Altura absoluta (em semitons) de cada corda solta, da 6ª à 1ª (E2..E4).
const STRING_MIDI = [40, 45, 50, 55, 59, 64];

// Conjuntos de 3 cordas adjacentes, do grave ao agudo. Índices: 0 = 6ª ... 5 = 1ª.
export const CONJUNTOS: { id: string; label: string; strings: [number, number, number] }[] = [
  { id: "1-2-3", label: "Cordas 1-2-3 (agudas)", strings: [3, 4, 5] },
  { id: "2-3-4", label: "Cordas 2-3-4 (centrais)", strings: [2, 3, 4] },
  { id: "3-4-5", label: "Cordas 3-4-5 (graves)", strings: [1, 2, 3] },
  { id: "4-5-6", label: "Cordas 4-5-6 (mais graves)", strings: [0, 1, 2] },
];

export const INVERSOES = [
  { id: "fundamental", label: "Estado fundamental", nota: "tônica no grave" },
  { id: "primeira", label: "1ª inversão", nota: "terça no grave" },
  { id: "segunda", label: "2ª inversão", nota: "quinta no grave" },
] as const;

export type TriadeNota = {
  string: number;
  fret: number;
  noteName: NoteName;
  interval: number; // 0 = tônica, 3/4 = terça, 6/7/8 = quinta
  isRoot: boolean;
};

export type TriadeVoicing = {
  inversao: string; // id da inversão
  inversaoLabel: string;
  notas: TriadeNota[]; // grave -> agudo
  minFret: number;
  maxFret: number;
};

// Ordem dos graus (semitons a partir da tônica) empilhados do grave ao agudo,
// por inversão.
function ordemPorInversao(
  qual: TriadeQualidade,
  inversaoIdx: number
): number[] {
  const tones = [0, TERCA[qual], QUINTA[qual]];
  // rotaciona: inversão 0 = [1,3,5], 1 = [3,5,1], 2 = [5,1,3]
  return [0, 1, 2].map((i) => tones[(i + inversaoIdx) % 3]);
}

const MAX_FRET = 16;

// Menor casa (> prevAbs em altura absoluta) da corda que produz a classe pedida.
function proximaCasaAcima(
  stringIndex: number,
  pc: number,
  prevAbs: number
): number | null {
  for (let f = 0; f <= MAX_FRET; f++) {
    if (pitchClassAt(stringIndex, f) !== pc) continue;
    if (STRING_MIDI[stringIndex] + f > prevAbs) return f;
  }
  return null;
}

// Gera as 3 inversões de uma tríade num conjunto de 3 cordas. Para cada
// inversão procura a forma mais COMPACTA (menor distância entre a casa mais
// grave e a mais aguda), preferindo a posição mais baixa no braço em caso de
// empate. As notas sobem sempre do grave ao agudo.
export function triadeVoicings(
  rootNote: NoteName,
  qual: TriadeQualidade,
  strings: [number, number, number]
): TriadeVoicing[] {
  const rootPc = pitchClass(rootNote);
  const [s0, s1, s2] = strings;

  return INVERSOES.map((inv, invIdx) => {
    const graus = ordemPorInversao(qual, invIdx);
    const pcs = graus.map((g) => (rootPc + g) % 12);

    // Testa cada casa possível da corda grave e empilha as demais por cima.
    // Guarda a forma de menor amplitude (e, no empate, a mais grave).
    let melhor: number[] | null = null;
    let melhorSpan = Infinity;
    let melhorMax = Infinity;

    for (let f0 = 0; f0 <= MAX_FRET; f0++) {
      if (pitchClassAt(s0, f0) !== pcs[0]) continue;
      let prevAbs = STRING_MIDI[s0] + f0;
      const frets = [f0];
      let ok = true;
      for (let k = 1; k < 3; k++) {
        const sIdx = [s0, s1, s2][k];
        const f = proximaCasaAcima(sIdx, pcs[k], prevAbs);
        if (f === null) {
          ok = false;
          break;
        }
        frets.push(f);
        prevAbs = STRING_MIDI[sIdx] + f;
      }
      if (!ok) continue;
      const span = Math.max(...frets) - Math.min(...frets);
      const maxF = Math.max(...frets);
      if (span < melhorSpan || (span === melhorSpan && maxF < melhorMax)) {
        melhor = frets;
        melhorSpan = span;
        melhorMax = maxF;
      }
    }

    const frets = melhor ?? [0, 0, 0];

    const notas: TriadeNota[] = [s0, s1, s2].map((sIdx, k) => {
      const pc = pcs[k];
      const interval = graus[k];
      return {
        string: sIdx,
        fret: frets[k],
        noteName: noteNameFromPitchClass(pc),
        interval,
        isRoot: interval === 0,
      };
    });

    return {
      inversao: inv.id,
      inversaoLabel: inv.label,
      notas,
      minFret: Math.min(...frets),
      maxFret: Math.max(...frets),
    };
  });
}

// Símbolo do acorde da tríade (para exibir).
export function triadeSimbolo(rootNote: NoteName, qual: TriadeQualidade): string {
  if (qual === "menor") return `${rootNote}m`;
  if (qual === "diminuta") return `${rootNote}°`;
  if (qual === "aumentada") return `${rootNote}+`;
  return rootNote;
}
