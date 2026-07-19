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
];

export function todasAsLicoes() {
  return MODULOS.flatMap((m) => m.licoes);
}
