export type Modulo = {
  slug: string;
  titulo: string;
  descricao: string;
  licoes: { key: string; titulo: string; href: string }[];
};

export const MODULOS: Modulo[] = [
  {
    slug: "fundamentos",
    titulo: "Fundamentos",
    descricao: "As bases de tudo: partes da guitarra, afinação, casas, notas e tablatura.",
    licoes: [
      { key: "fundamentos.partes-guitarra", titulo: "Partes da guitarra", href: "/fundamentos/partes-guitarra" },
      { key: "fundamentos.cordas-afinacao", titulo: "Cordas e afinação padrão", href: "/fundamentos/cordas-afinacao" },
      { key: "fundamentos.casas-trastes", titulo: "Casas e trastes", href: "/fundamentos/casas-trastes" },
      { key: "fundamentos.notas-naturais", titulo: "Notas naturais", href: "/fundamentos/notas-naturais" },
      { key: "fundamentos.sustenidos-bemois", titulo: "Sustenidos, bemóis, tons e semitons", href: "/fundamentos/sustenidos-bemois" },
      { key: "fundamentos.tablatura", titulo: "Como ler tablatura", href: "/fundamentos/tablatura" },
    ],
  },
  {
    slug: "localizacao-notas",
    titulo: "Localização das notas",
    descricao: "Treino interativo para decorar todas as notas do braço.",
    licoes: [
      { key: "localizacao-notas.treino", titulo: "Treino de localização", href: "/localizacao-notas" },
    ],
  },
  {
    slug: "intervalos",
    titulo: "Intervalos",
    descricao: "A base de toda escala e todo acorde: a distância entre duas notas.",
    licoes: [
      { key: "intervalos.teoria", titulo: "Teoria dos intervalos", href: "/intervalos" },
      { key: "intervalos.treino", titulo: "Treino auditivo", href: "/intervalos/treino" },
    ],
  },
  {
    slug: "pentatonica-menor",
    titulo: "Pentatônica menor",
    descricao: "Os 5 desenhos clássicos, conectados e prontos para improvisar.",
    licoes: [
      { key: "pentatonica-menor.desenho-1", titulo: "Desenho 1", href: "/pentatonica-menor/1" },
      { key: "pentatonica-menor.desenho-2", titulo: "Desenho 2", href: "/pentatonica-menor/2" },
      { key: "pentatonica-menor.desenho-3", titulo: "Desenho 3", href: "/pentatonica-menor/3" },
      { key: "pentatonica-menor.desenho-4", titulo: "Desenho 4", href: "/pentatonica-menor/4" },
      { key: "pentatonica-menor.desenho-5", titulo: "Desenho 5", href: "/pentatonica-menor/5" },
    ],
  },
  {
    slug: "pentatonica-maior",
    titulo: "Pentatônica maior",
    descricao: "As mesmas 5 posições, agora com som aberto e melódico.",
    licoes: [
      { key: "pentatonica-maior.desenho-1", titulo: "Desenho 1", href: "/pentatonica-maior/1" },
      { key: "pentatonica-maior.desenho-2", titulo: "Desenho 2", href: "/pentatonica-maior/2" },
      { key: "pentatonica-maior.desenho-3", titulo: "Desenho 3", href: "/pentatonica-maior/3" },
      { key: "pentatonica-maior.desenho-4", titulo: "Desenho 4", href: "/pentatonica-maior/4" },
      { key: "pentatonica-maior.desenho-5", titulo: "Desenho 5", href: "/pentatonica-maior/5" },
    ],
  },
  {
    slug: "escala-blues",
    titulo: "Escala blues",
    descricao: "A pentatônica menor com a nota de passagem que dá o tempero do blues.",
    licoes: [
      { key: "escala-blues.desenho-1", titulo: "Desenho 1", href: "/escala-blues/1" },
      { key: "escala-blues.desenho-2", titulo: "Desenho 2", href: "/escala-blues/2" },
      { key: "escala-blues.desenho-3", titulo: "Desenho 3", href: "/escala-blues/3" },
      { key: "escala-blues.desenho-4", titulo: "Desenho 4", href: "/escala-blues/4" },
      { key: "escala-blues.desenho-5", titulo: "Desenho 5", href: "/escala-blues/5" },
    ],
  },
  {
    slug: "escala-maior",
    titulo: "Escala maior",
    descricao: "As 7 posições no sistema de 3 notas por corda, a base de toda a teoria.",
    licoes: [
      { key: "escala-maior.posicao-1", titulo: "Posição 1", href: "/escala-maior/1" },
      { key: "escala-maior.posicao-2", titulo: "Posição 2", href: "/escala-maior/2" },
      { key: "escala-maior.posicao-3", titulo: "Posição 3", href: "/escala-maior/3" },
      { key: "escala-maior.posicao-4", titulo: "Posição 4", href: "/escala-maior/4" },
      { key: "escala-maior.posicao-5", titulo: "Posição 5", href: "/escala-maior/5" },
      { key: "escala-maior.posicao-6", titulo: "Posição 6", href: "/escala-maior/6" },
      { key: "escala-maior.posicao-7", titulo: "Posição 7", href: "/escala-maior/7" },
    ],
  },
  {
    slug: "escalas-menores",
    titulo: "Escalas menores",
    descricao: "Menor natural, harmônica e melódica, também em 3 notas por corda.",
    licoes: [
      { key: "escalas-menores.natural", titulo: "Menor natural", href: "/escalas-menores/natural" },
      { key: "escalas-menores.harmonica", titulo: "Menor harmônica", href: "/escalas-menores/harmonica" },
      { key: "escalas-menores.melodica", titulo: "Menor melódica", href: "/escalas-menores/melodica" },
    ],
  },
  {
    slug: "campo-harmonico",
    titulo: "Campo harmônico",
    descricao: "Os acordes que nascem de cada escala e como usá-los em progressões.",
    licoes: [
      { key: "campo-harmonico.teoria", titulo: "Campo harmônico", href: "/campo-harmonico" },
    ],
  },
  {
    slug: "modos-gregos",
    titulo: "Modos gregos",
    descricao: "As 7 cores da escala maior: jônio, dórico, frígio, lídio, mixolídio, eólio e lócrio.",
    licoes: [
      { key: "modos-gregos.jonio", titulo: "Jônio", href: "/modos-gregos/jonio" },
      { key: "modos-gregos.dorico", titulo: "Dórico", href: "/modos-gregos/dorico" },
      { key: "modos-gregos.frigio", titulo: "Frígio", href: "/modos-gregos/frigio" },
      { key: "modos-gregos.lidio", titulo: "Lídio", href: "/modos-gregos/lidio" },
      { key: "modos-gregos.mixolidio", titulo: "Mixolídio", href: "/modos-gregos/mixolidio" },
      { key: "modos-gregos.eolio", titulo: "Eólio", href: "/modos-gregos/eolio" },
      { key: "modos-gregos.locrio", titulo: "Lócrio", href: "/modos-gregos/locrio" },
    ],
  },
  {
    slug: "arpejos",
    titulo: "Arpejos",
    descricao: "As notas de cada acorde espalhadas pelo braço, as notas-alvo do solo.",
    licoes: [
      { key: "arpejos.teoria", titulo: "Arpejos", href: "/arpejos" },
    ],
  },
  {
    slug: "caged",
    titulo: "Sistema CAGED",
    descricao: "As 5 formas de acorde que conectam o braço inteiro e organizam tudo.",
    licoes: [
      { key: "caged.teoria", titulo: "Sistema CAGED", href: "/caged" },
    ],
  },
  {
    slug: "circulo-de-quintas",
    titulo: "Círculo das quintas",
    descricao: "O mapa das 12 tonalidades, armaduras de clave e relativas menores.",
    licoes: [
      { key: "circulo-de-quintas.teoria", titulo: "Círculo das quintas", href: "/circulo-de-quintas" },
    ],
  },
  {
    slug: "progressoes-harmonicas",
    titulo: "Progressões harmônicas",
    descricao: "As sequências de acordes por grau que sustentam quase toda a música.",
    licoes: [
      { key: "progressoes-harmonicas.teoria", titulo: "Progressões harmônicas", href: "/progressoes-harmonicas" },
    ],
  },
  {
    slug: "tecnicas",
    titulo: "Técnicas de mão",
    descricao: "Ligados, bends, vibrato, slides e palm mute: a expressão do instrumento.",
    licoes: [
      { key: "tecnicas.hammer-on-pull-off", titulo: "Hammer-on e pull-off", href: "/tecnicas/hammer-on-pull-off" },
      { key: "tecnicas.bend", titulo: "Bend", href: "/tecnicas/bend" },
      { key: "tecnicas.vibrato", titulo: "Vibrato", href: "/tecnicas/vibrato" },
      { key: "tecnicas.slide", titulo: "Slide", href: "/tecnicas/slide" },
      { key: "tecnicas.palm-mute", titulo: "Palm mute", href: "/tecnicas/palm-mute" },
    ],
  },
  {
    slug: "ritmo",
    titulo: "Ritmo e leitura",
    descricao: "Figuras, compasso, andamento e levadas: o lado do tempo na música.",
    licoes: [
      { key: "ritmo.figuras", titulo: "Figuras: duração das notas", href: "/ritmo/figuras" },
      { key: "ritmo.compasso", titulo: "Compasso e fórmula", href: "/ritmo/compasso" },
      { key: "ritmo.andamento", titulo: "Andamento e metrônomo", href: "/ritmo/andamento" },
      { key: "ritmo.levadas", titulo: "Levadas e palhetada", href: "/ritmo/levadas" },
    ],
  },
  {
    slug: "backing-tracks",
    titulo: "Backing tracks",
    descricao: "Bases de acompanhamento em vários estilos e tons para praticar as escalas.",
    licoes: [
      { key: "backing-tracks.pratica", titulo: "Praticar com backing track", href: "/backing-tracks" },
    ],
  },
  {
    slug: "dicionario-acordes",
    titulo: "Dicionário de acordes",
    descricao: "Consulte como montar qualquer acorde no braço, em qualquer tom.",
    licoes: [
      { key: "dicionario-acordes.consulta", titulo: "Consultar acordes", href: "/dicionario-acordes" },
    ],
  },
];

export function todasAsLicoes() {
  return MODULOS.flatMap((m) => m.licoes);
}
