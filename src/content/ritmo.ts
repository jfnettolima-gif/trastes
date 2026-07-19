export type LicaoRitmo = {
  slug: string;
  lessonKey: string;
  titulo: string;
  paragrafos: string[];
  usarMetronomo?: boolean;
};

export const LICOES_RITMO: LicaoRitmo[] = [
  {
    slug: "figuras",
    lessonKey: "ritmo.figuras",
    titulo: "Figuras: a duração das notas",
    paragrafos: [
      "Na música, cada nota tem uma duração. As figuras principais, da mais longa para a mais curta, são: semibreve, mínima, semínima, colcheia e semicolcheia.",
      "A relação entre elas é sempre a metade: uma semibreve vale 2 mínimas, uma mínima vale 2 semínimas, uma semínima vale 2 colcheias, e uma colcheia vale 2 semicolcheias.",
      "Se a semínima recebe 1 tempo (o mais comum), então: semibreve = 4 tempos, mínima = 2 tempos, semínima = 1 tempo, colcheia = meio tempo, semicolcheia = um quarto de tempo.",
      "Cada figura também tem uma pausa equivalente (silêncio da mesma duração). Tocar bem o ritmo é tanto tocar as notas certas quanto respeitar os silêncios.",
    ],
  },
  {
    slug: "compasso",
    lessonKey: "ritmo.compasso",
    titulo: "Compasso e fórmula",
    paragrafos: [
      "O compasso agrupa os tempos em ciclos regulares. A fórmula de compasso são dois números no início da partitura: o de cima diz quantos tempos há em cada compasso, o de baixo diz qual figura vale 1 tempo.",
      "O compasso 4/4 (quatro por quatro) é o mais comum: 4 tempos por compasso, e a semínima (o '4' de baixo) vale 1 tempo. É a base de quase todo o rock e pop. Por isso é chamado de 'compasso simples' ou 'tempo comum' (C).",
      "Outros comuns: 3/4 (valsa, 3 tempos por compasso) e 6/8 (sensação de balanço, contado em 2 grupos de 3 colcheias).",
      "Contar em voz alta ('1 e 2 e 3 e 4 e') enquanto toca é o melhor jeito de internalizar o compasso e não acelerar nem atrasar.",
    ],
  },
  {
    slug: "andamento",
    lessonKey: "ritmo.andamento",
    titulo: "Andamento e o metrônomo",
    paragrafos: [
      "Andamento (ou 'tempo', BPM) é a velocidade da música, medida em batidas por minuto. 60 BPM = uma batida por segundo; 120 BPM = duas por segundo.",
      "O metrônomo é a ferramenta que marca esse pulso de forma constante. Estudar com metrônomo é o que separa quem toca 'redondo' de quem acelera nas partes fáceis e trava nas difíceis.",
      "Método de estudo: comece devagar (num andamento em que você acerta 100%), repita até ficar fácil, e só então suba de 5 em 5 BPM. Velocidade é consequência de precisão, não o contrário.",
      "Use o metrônomo do Trastes para praticar: toque uma nota exatamente junto com cada clique, sentindo o tempo forte (o '1' de cada compasso).",
    ],
    usarMetronomo: true,
  },
  {
    slug: "levadas",
    lessonKey: "ritmo.levadas",
    titulo: "Levadas e direção da palhetada",
    paragrafos: [
      "Levada (ou 'batida') é o padrão rítmico da mão direita ao acompanhar uma música com acordes. Ela combina palhetadas para baixo (↓) e para cima (↑) em um desenho que se repete a cada compasso.",
      "A regra de ouro do 'palhetar alternado': em 4/4 contando '1 e 2 e 3 e 4 e', os números (tempos) costumam ser palhetada para baixo e os 'e' (contratempos) para cima. Isso mantém a mão em movimento constante de vaivém.",
      "Uma levada pop clássica em 4/4: ↓ ↓↑ ↑↓↑ (baixo, baixo-cima, cima-baixo-cima). Toque só o movimento da mão no ar primeiro, sem se preocupar com o acorde.",
      "O segredo de uma boa levada não é a complexidade, mas a constância: manter o vaivém da mão sempre no tempo, tocando as cordas só nos momentos certos e 'errando' de propósito as cordas nos outros.",
    ],
  },
];
