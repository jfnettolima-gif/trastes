// Licks para tocar junto: pequenas frases descritas como uma sequência de
// notas (corda + casa + duração em batidas). O braço destaca cada nota no
// tempo e o áudio toca a mesma nota, para o aluno ver e ouvir a frase andando.
// As casas são reais (posições clássicas no braço), e as notas ficam todas
// dentro da escala indicada, coerentes com o resto do app.

import { NoteName } from "./music";

export type LickNote = {
  string: number; // 0 = 6ª (Mi grave) ... 5 = 1ª (Mi agudo)
  fret: number;
  beats: number; // duração em batidas (1 = semínima, 0.5 = colcheia)
};

export type Lick = {
  id: string;
  nome: string;
  descricao: string;
  tonica: NoteName;
  escala: string; // rótulo da escala/desenho de referência
  escalaHref: string; // rota de estudo relacionada
  bpmSugerido: number;
  notas: LickNote[];
};

// Todos os licks abaixo estão no desenho 1 (caixa 1) da pentatônica de Lá
// menor, começando na 5ª casa: um terreno familiar para começar a improvisar.
export const LICKS: Lick[] = [
  {
    id: "penta-subida",
    nome: "Subida da pentatônica (Lá menor)",
    descricao:
      "A caixa 1 inteira subindo, duas notas por corda. Serve para gravar o desenho e aquecer.",
    tonica: "A",
    escala: "Pentatônica menor de Lá · desenho 1",
    escalaHref: "/pentatonica-menor",
    bpmSugerido: 70,
    notas: [
      { string: 0, fret: 5, beats: 0.5 },
      { string: 0, fret: 8, beats: 0.5 },
      { string: 1, fret: 5, beats: 0.5 },
      { string: 1, fret: 7, beats: 0.5 },
      { string: 2, fret: 5, beats: 0.5 },
      { string: 2, fret: 7, beats: 0.5 },
      { string: 3, fret: 5, beats: 0.5 },
      { string: 3, fret: 7, beats: 0.5 },
      { string: 4, fret: 5, beats: 0.5 },
      { string: 4, fret: 8, beats: 0.5 },
      { string: 5, fret: 5, beats: 0.5 },
      { string: 5, fret: 8, beats: 1 },
    ],
  },
  {
    id: "rock-classico",
    nome: "Frase de rock (Lá menor)",
    descricao:
      "Uma frase descendente com repetição no fim, o tipo de coisa que fecha um solo de rock.",
    tonica: "A",
    escala: "Pentatônica menor de Lá · desenho 1",
    escalaHref: "/pentatonica-menor",
    bpmSugerido: 80,
    notas: [
      { string: 5, fret: 8, beats: 0.5 },
      { string: 5, fret: 5, beats: 0.5 },
      { string: 4, fret: 8, beats: 0.5 },
      { string: 4, fret: 5, beats: 0.5 },
      { string: 3, fret: 7, beats: 0.5 },
      { string: 3, fret: 5, beats: 0.5 },
      { string: 4, fret: 5, beats: 0.5 },
      { string: 3, fret: 5, beats: 0.5 },
      { string: 2, fret: 7, beats: 1 },
      { string: 2, fret: 5, beats: 1 },
    ],
  },
  {
    id: "blues-box",
    nome: "Lambida de blues (Lá menor)",
    descricao:
      "Usa a blue note (b5) de passagem, o tempero que dá o sotaque de blues à pentatônica.",
    tonica: "A",
    escala: "Escala blues de Lá · desenho 1",
    escalaHref: "/escala-blues",
    bpmSugerido: 75,
    notas: [
      { string: 5, fret: 8, beats: 0.5 }, // C
      { string: 5, fret: 5, beats: 0.5 }, // A
      { string: 4, fret: 8, beats: 0.5 }, // G
      { string: 4, fret: 5, beats: 0.5 }, // E
      { string: 3, fret: 7, beats: 0.5 }, // D
      { string: 3, fret: 8, beats: 0.5 }, // Eb (blue note, b5)
      { string: 3, fret: 7, beats: 0.5 }, // D
      { string: 3, fret: 5, beats: 0.5 }, // C
      { string: 2, fret: 7, beats: 2 }, // A
    ],
  },
];
