// Identificador reverso: o aluno marca notas no braço e o Trastes diz que
// acorde elas formam e em que escalas elas cabem. Tudo por teoria, comparando
// o conjunto de classes de altura (pitch classes) marcado com os acordes e
// escalas conhecidos, para qualquer tônica.

import {
  NoteName,
  ScaleKey,
  SCALES,
  noteNameFromPitchClass,
} from "./music";
import { CHORD_TYPES } from "./chords";

// Um "conjunto" de notas marcadas, representado pelas classes de altura (0..11)
// distintas, ignorando oitava e ordem.
export function pcSet(pcs: number[]): number[] {
  return Array.from(new Set(pcs.map((p) => ((p % 12) + 12) % 12))).sort(
    (a, b) => a - b
  );
}

export type ChordMatch = {
  symbol: string; // "Am7"
  rootName: NoteName;
  typeLabel: string; // "Menor com sétima"
  formula: string;
  notes: NoteName[]; // notas do acorde, tônica primeiro
  exact: boolean; // true = as notas marcadas são exatamente o acorde
  extraInMarked: number; // notas marcadas que sobram (não estão no acorde)
};

// Acha os acordes cujas notas coincidem com o que foi marcado. Prioriza o
// match exato (mesmo conjunto de classes). Também aceita inversões, porque a
// identificação é por classe de altura: a menor nota marcada não precisa ser a
// tônica do acorde.
export function identifyChords(markedPcs: number[]): ChordMatch[] {
  const marked = pcSet(markedPcs);
  if (marked.length < 2) return [];
  const markedSet = new Set(marked);

  const matches: ChordMatch[] = [];
  for (let rootPc = 0; rootPc < 12; rootPc++) {
    for (const type of CHORD_TYPES) {
      const chordPcs = pcSet(type.intervals.map((iv) => (rootPc + iv) % 12));
      const chordSet = new Set(chordPcs);
      // Todas as notas do acorde precisam estar marcadas (senão não é ele).
      const allChordNotesMarked = chordPcs.every((p) => markedSet.has(p));
      if (!allChordNotesMarked) continue;
      const extraInMarked = marked.filter((p) => !chordSet.has(p)).length;
      const rootName = noteNameFromPitchClass(rootPc);
      matches.push({
        symbol: `${rootName}${type.suffix}`,
        rootName,
        typeLabel: type.label,
        formula: type.formula,
        notes: type.intervals.map((iv) =>
          noteNameFromPitchClass((rootPc + iv) % 12)
        ),
        exact: extraInMarked === 0 && chordPcs.length === marked.length,
        extraInMarked,
      });
    }
  }

  // Ordena: exatos primeiro, depois os com menos notas sobrando, depois os
  // acordes com mais notas (mais específicos) antes dos mais simples.
  matches.sort((a, b) => {
    if (a.exact !== b.exact) return a.exact ? -1 : 1;
    if (a.extraInMarked !== b.extraInMarked)
      return a.extraInMarked - b.extraInMarked;
    return b.notes.length - a.notes.length;
  });

  return matches;
}

export type ScaleMatch = {
  rootName: NoteName;
  scaleKey: ScaleKey;
  label: string; // "Escala maior de Dó" style: aqui só o rótulo da escala
  fullLabel: string; // "Escala maior de C"
  formula: string;
  extraInScale: number; // quantas notas a escala tem além das marcadas
};

// Acha as escalas (tônica + tipo) que contêm TODAS as notas marcadas. Ordena
// pelas mais "justas" (menos notas sobrando), que são as mais informativas.
export function identifyScales(markedPcs: number[]): ScaleMatch[] {
  const marked = pcSet(markedPcs);
  if (marked.length < 2) return [];

  const results: ScaleMatch[] = [];
  for (let rootPc = 0; rootPc < 12; rootPc++) {
    for (const key of Object.keys(SCALES) as ScaleKey[]) {
      const scale = SCALES[key];
      const scalePcs = new Set(scale.intervals.map((iv) => (rootPc + iv) % 12));
      const containsAll = marked.every((p) => scalePcs.has(p));
      if (!containsAll) continue;
      const rootName = noteNameFromPitchClass(rootPc);
      results.push({
        rootName,
        scaleKey: key,
        label: scale.label,
        fullLabel: `${scale.label} de ${rootName}`,
        formula: scale.formula,
        extraInScale: scale.intervals.length - marked.length,
      });
    }
  }

  results.sort((a, b) => {
    if (a.extraInScale !== b.extraInScale) return a.extraInScale - b.extraInScale;
    return a.scaleKey.localeCompare(b.scaleKey);
  });

  return results;
}
