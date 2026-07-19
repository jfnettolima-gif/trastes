export type LicaoFundamentos = {
  slug: string;
  lessonKey: string;
  titulo: string;
  paragrafos: string[];
  mostrarBraco?: boolean;
};

export const LICOES_FUNDAMENTOS: LicaoFundamentos[] = [
  {
    slug: "partes-guitarra",
    lessonKey: "fundamentos.partes-guitarra",
    titulo: "Partes da guitarra",
    paragrafos: [
      "A guitarra tem três partes principais: a cabeça (onde ficam as tarraxas, que afinam as cordas), o braço (onde ficam os trastes, ou 'casas') e o corpo (a parte maior, onde ficam os captadores e a ponte).",
      "As tarraxas ajustam a tensão de cada corda, deixando ela mais aguda ou mais grave. Os trastes são as divisões metálicas no braço: cada uma delas representa um semitom (a menor distância entre duas notas na música ocidental).",
      "Não precisa decorar tudo isso de uma vez. O importante agora é saber: cabeça afina, braço tem as casas onde você aperta as cordas, corpo é onde o som sai.",
    ],
  },
  {
    slug: "cordas-afinacao",
    lessonKey: "fundamentos.cordas-afinacao",
    titulo: "Cordas e afinação padrão",
    paragrafos: [
      "A guitarra tem 6 cordas. Da mais grossa (grave) para a mais fina (aguda), na afinação padrão, os nomes são: Mi, Lá, Ré, Sol, Si, Mi.",
      "Um jeito clássico de decorar é a frase: 'Marcos Almeida Riu Sozinho Sem Motivo' (Mi Lá Ré Sol Si Mi). Use o braço interativo para ouvir cada corda solta e ir se acostumando com o som de cada uma.",
      "Nas tablaturas, a corda mais grave (Mi grave) normalmente aparece embaixo, e a mais aguda (Mi agudo) aparece em cima.",
    ],
    mostrarBraco: true,
  },
  {
    slug: "casas-trastes",
    lessonKey: "fundamentos.casas-trastes",
    titulo: "Casas e trastes",
    paragrafos: [
      "Cada divisão metálica no braço é um 'traste'. O espaço entre dois trastes é uma 'casa'. Quando dizemos 'aperte a corda na casa 3', significa apertar entre o segundo e o terceiro traste.",
      "A casa 0 é a corda solta, sem apertar nada. Cada casa que você sobe (em direção ao corpo da guitarra) aumenta a nota em um semitom.",
      "Experimente no braço interativo: clique na mesma corda em casas seguidas (0, 1, 2, 3...) e note como o som vai ficando mais agudo, um semitom de cada vez.",
    ],
  },
  {
    slug: "notas-naturais",
    lessonKey: "fundamentos.notas-naturais",
    titulo: "Notas naturais",
    paragrafos: [
      "As notas naturais são: Dó, Ré, Mi, Fá, Sol, Lá, Si (em inglês: C, D, E, F, G, A, B). Elas se repetem em ciclo. Neste sistema usamos os nomes em inglês (C, D, E, F, G, A, B), que é o padrão internacional usado em cifras e tablaturas.",
      "Entre a maioria das notas naturais existe a distância de um tom (2 casas). Mas entre Mi e Fá, e entre Si e Dó, a distância é de apenas um semitom (1 casa) — não existe nota 'preta' entre elas.",
      "Use o braço interativo com a opção 'Todas as notas' ativada para explorar onde cada nota aparece.",
    ],
    mostrarBraco: true,
  },
  {
    slug: "sustenidos-bemois",
    lessonKey: "fundamentos.sustenidos-bemois",
    titulo: "Sustenidos, bemóis, tons e semitons",
    paragrafos: [
      "Um sustenido (#) sobe a nota em um semitom. Um bemol (b) desce a nota em um semitom. Por isso C# (Dó sustenido) e Db (Ré bemol) são, na prática, a mesma tecla/casa no braço.",
      "Um semitom é a menor distância entre duas notas (1 casa no braço). Um tom é a soma de dois semitons (2 casas).",
      "Essas notas 'com sustenido/bemol' preenchem os espaços entre as notas naturais, exceto entre Mi-Fá e Si-Dó, que já são vizinhas por um semitom.",
    ],
  },
  {
    slug: "tablatura",
    lessonKey: "fundamentos.tablatura",
    titulo: "Como ler tablatura",
    paragrafos: [
      "A tablatura (ou 'tab') representa as 6 cordas da guitarra como 6 linhas horizontais. A linha de cima geralmente é a corda mais aguda (Mi agudo) e a linha de baixo é a mais grave (Mi grave).",
      "Os números escritos em cima das linhas indicam a casa que você deve apertar naquela corda. Um '0' significa corda solta.",
      "Exemplo simples (subindo casa por casa na corda Mi grave):\ne|-----------------\nB|-----------------\nG|-----------------\nD|-----------------\nA|-----------------\nE|--0--1--2--3--4--",
    ],
  },
];
