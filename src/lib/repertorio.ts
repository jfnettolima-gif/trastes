// Repertório de "cifra viva": progressões e músicas de domínio público /
// formas clássicas, com os acordes clicáveis. A ideia é sair da teoria solta e
// aplicar tudo (campo harmônico, escala para improvisar, formas de acorde) em
// sequências reais. Não usamos letras protegidas, só as cifras e a estrutura,
// que são conhecimento comum de harmonia.

export type Secao = {
  nome: string;
  cifra: string[]; // acordes na ordem
};

export type Musica = {
  id: string;
  titulo: string;
  estilo: string;
  tom: string; // tom sugerido, para casar com o assistente de improviso
  escalaDica: string; // que escala usar para solar
  descricao: string;
  secoes: Secao[];
  progressaoParaAnalise: string; // string pronta para colar no assistente
};

export const REPERTORIO: Musica[] = [
  {
    id: "blues-12-la",
    titulo: "Blues de 12 compassos em Lá",
    estilo: "Blues",
    tom: "A",
    escalaDica: "Pentatônica menor de Lá / escala blues de Lá",
    descricao:
      "A forma mais tocada do blues. Três acordes dominantes (I, IV, V) em 12 compassos. Base de quase todo rock antigo.",
    secoes: [
      { nome: "Volta completa (12 compassos)", cifra: ["A7", "A7", "A7", "A7", "D7", "D7", "A7", "A7", "E7", "D7", "A7", "E7"] },
    ],
    progressaoParaAnalise: "A7 D7 E7",
  },
  {
    id: "pop-1546",
    titulo: "Sequência pop (I–V–vi–IV) em Sol",
    estilo: "Pop / Rock",
    tom: "G",
    escalaDica: "Escala maior de Sol (ou pentatônica de Mi menor)",
    descricao:
      "As quatro casas mágicas do pop. Milhares de sucessos giram nesta mesma roda de acordes. Ótima para treinar troca limpa e cantar por cima.",
    secoes: [
      { nome: "Roda principal", cifra: ["G", "D", "Em", "C"] },
    ],
    progressaoParaAnalise: "G D Em C",
  },
  {
    id: "ii-v-i-do",
    titulo: "ii–V–I de jazz em Dó",
    estilo: "Jazz",
    tom: "C",
    escalaDica: "Escala maior de Dó sobre tudo; arpejos de cada acorde nas viradas",
    descricao:
      "A cadência que sustenta o jazz. Serve para ouvir a tensão do V7 resolvendo no I e para praticar acordes com sétima.",
    secoes: [
      { nome: "Cadência", cifra: ["Dm7", "G7", "C7M"] },
      { nome: "Encadeada (turnaround)", cifra: ["C7M", "A7", "Dm7", "G7"] },
    ],
    progressaoParaAnalise: "Dm7 G7 C7M",
  },
  {
    id: "rock-eol-mi",
    titulo: "Cadência de rock em Mi menor",
    estilo: "Rock",
    tom: "Em",
    escalaDica: "Pentatônica de Mi menor / escala menor natural de Mi",
    descricao:
      "A queda i–bVII–bVI que soa pesada e épica. Muito usada em rock e trilhas. A tônica menor dá o clima sombrio.",
    secoes: [
      { nome: "Riff de acordes", cifra: ["Em", "D", "C", "D"] },
    ],
    progressaoParaAnalise: "Em D C D",
  },
  {
    id: "canon-re",
    titulo: "Canon (Pachelbel) em Ré",
    estilo: "Clássico / Pop",
    tom: "D",
    escalaDica: "Escala maior de Ré",
    descricao:
      "A progressão de domínio público mais reaproveitada da história. Percorre quase todo o campo harmônico de Ré maior e ensina como os graus se conectam.",
    secoes: [
      { nome: "Sequência completa", cifra: ["D", "A", "Bm", "F#m", "G", "D", "G", "A"] },
    ],
    progressaoParaAnalise: "D A Bm F#m G D G A",
  },
  {
    id: "rising-sun",
    titulo: "The House of the Rising Sun (tradicional)",
    estilo: "Folk (domínio público)",
    tom: "Am",
    escalaDica: "Escala menor natural de Lá / pentatônica de Lá menor",
    descricao:
      "Canção folk tradicional, de domínio público. A roda em compasso 6/8 mistura acordes do campo de Lá menor com um Mi maior (dominante) de tensão.",
    secoes: [
      { nome: "Roda principal", cifra: ["Am", "C", "D", "F", "Am", "E", "Am", "E"] },
    ],
    progressaoParaAnalise: "Am C D F Am E Am E",
  },
];
