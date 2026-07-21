// Acordes abertos (primeira posição): as primeiras formas que todo iniciante
// aprende, com cordas soltas. Diferente do resto do app, a FORMA aqui é fixa
// (o acorde aberto é uma digitação específica que usa cordas soltas), mas as
// notas e os intervalos de cada corda continuam sendo calculados por teoria,
// para o aluno ver POR QUE aquela digitação forma aquele acorde.

import { NoteName, pitchClassAt, noteNameFromPitchClass, pitchClass } from "./music";

export type OpenChord = {
  id: string;
  symbol: string; // "C", "Am", "G7"
  nome: string; // nome por extenso
  rootNote: NoteName; // para colorir a tônica e calcular intervalos
  categoria: "maior" | "menor" | "dom7";
  // Casas por corda, da 6ª (Mi grave) à 1ª (Mi agudo); null = corda abafada (✕),
  // 0 = corda solta.
  frets: (number | null)[];
  dica: string;
};

export const OPEN_CHORDS: OpenChord[] = [
  { id: "C", symbol: "C", nome: "Dó maior", rootNote: "C", categoria: "maior", frets: [null, 3, 2, 0, 1, 0], dica: "Não toque a 6ª corda. Cuidado para a 1ª (Mi solta) soar limpa." },
  { id: "A", symbol: "A", nome: "Lá maior", rootNote: "A", categoria: "maior", frets: [null, 0, 2, 2, 2, 0], dica: "Três dedos enfileirados na 2ª casa. A 6ª corda não soa." },
  { id: "G", symbol: "G", nome: "Sol maior", rootNote: "G", categoria: "maior", frets: [3, 2, 0, 0, 0, 3], dica: "Abre bem a mão: 6ª e 1ª na 3ª casa, 5ª na 2ª." },
  { id: "E", symbol: "E", nome: "Mi maior", rootNote: "E", categoria: "maior", frets: [0, 2, 2, 1, 0, 0], dica: "Todas as seis cordas soam. É a base da pestana de Mi." },
  { id: "D", symbol: "D", nome: "Ré maior", rootNote: "D", categoria: "maior", frets: [null, null, 0, 2, 3, 2], dica: "Só as quatro cordas mais finas. Formato de triângulo." },
  { id: "Am", symbol: "Am", nome: "Lá menor", rootNote: "A", categoria: "menor", frets: [null, 0, 2, 2, 1, 0], dica: "Igual ao Mi maior, uma corda acima. A 6ª não soa." },
  { id: "Em", symbol: "Em", nome: "Mi menor", rootNote: "E", categoria: "menor", frets: [0, 2, 2, 0, 0, 0], dica: "O acorde mais fácil: só dois dedos, todas as cordas soam." },
  { id: "Dm", symbol: "Dm", nome: "Ré menor", rootNote: "D", categoria: "menor", frets: [null, null, 0, 2, 3, 1], dica: "Como o Ré maior, mas a 1ª corda desce para a 1ª casa." },
  { id: "E7", symbol: "E7", nome: "Mi com sétima", rootNote: "E", categoria: "dom7", frets: [0, 2, 0, 1, 0, 0], dica: "O Mi maior soltando o dedo da 4ª corda. Som tenso, de blues." },
  { id: "A7", symbol: "A7", nome: "Lá com sétima", rootNote: "A", categoria: "dom7", frets: [null, 0, 2, 0, 2, 0], dica: "Como o Lá maior, deixando a 3ª corda solta." },
  { id: "D7", symbol: "D7", nome: "Ré com sétima", rootNote: "D", categoria: "dom7", frets: [null, null, 0, 2, 1, 2], dica: "Quatro cordas finas, formato diferente do Ré maior." },
  { id: "G7", symbol: "G7", nome: "Sol com sétima", rootNote: "G", categoria: "dom7", frets: [3, 2, 0, 0, 0, 1], dica: "Como o Sol, mas a 1ª corda desce da 3ª para a 1ª casa." },
];

export type OpenChordString = {
  string: number; // 0 = 6ª ... 5 = 1ª
  fret: number | null; // null = abafada
  noteName: NoteName | null;
  interval: number | null; // semitons a partir da tônica (0 = tônica)
  isRoot: boolean;
};

// Calcula, por teoria, a nota e o intervalo de cada corda de um acorde aberto.
export function openChordStrings(chord: OpenChord): OpenChordString[] {
  const rootPc = pitchClass(chord.rootNote);
  return chord.frets.map((fret, s) => {
    if (fret === null) {
      return { string: s, fret: null, noteName: null, interval: null, isRoot: false };
    }
    const pc = pitchClassAt(s, fret);
    const interval = ((pc - rootPc) % 12 + 12) % 12;
    return {
      string: s,
      fret,
      noteName: noteNameFromPitchClass(pc),
      interval,
      isRoot: interval === 0,
    };
  });
}

// As notas distintas do acorde, tônica primeiro, para exibir a formação.
export function openChordNotes(chord: OpenChord): NoteName[] {
  const strs = openChordStrings(chord).filter((x) => x.interval !== null);
  const seen = new Set<number>();
  const ordered = [...strs].sort((a, b) => (a.interval! - b.interval!));
  const notes: NoteName[] = [];
  for (const st of ordered) {
    if (!seen.has(st.interval!)) {
      seen.add(st.interval!);
      notes.push(st.noteName!);
    }
  }
  return notes;
}
