// Estrutura da navegação lateral, agrupada nos mesmos blocos pedagógicos da
// trilha (ver src/content/curriculo.ts) mais as ferramentas de prática livre.
// É a única fonte de verdade do menu: a Sidebar e a busca ⌘K leem daqui.

export type NavItem = { label: string; href: string };
export type NavSection = { titulo: string; itens: NavItem[] };

export const NAV_SECTIONS: NavSection[] = [
  {
    titulo: "Fundamentos",
    itens: [
      { label: "Fundamentos", href: "/fundamentos" },
      { label: "Localizar notas", href: "/localizacao-notas" },
      { label: "Intervalos", href: "/intervalos" },
    ],
  },
  {
    titulo: "Primeiros acordes",
    itens: [
      { label: "Acordes abertos", href: "/acordes-abertos" },
      { label: "Ritmo e leitura", href: "/ritmo" },
      { label: "Pestana", href: "/pestana" },
    ],
  },
  {
    titulo: "Escalas",
    itens: [
      { label: "Pentatônica menor", href: "/pentatonica-menor" },
      { label: "Pentatônica maior", href: "/pentatonica-maior" },
      { label: "Escala blues", href: "/escala-blues" },
    ],
  },
  {
    titulo: "Teoria e harmonia",
    itens: [
      { label: "Escala maior", href: "/escala-maior" },
      { label: "Escalas menores", href: "/escalas-menores" },
      { label: "Tríades no braço", href: "/triades" },
      { label: "Arpejos", href: "/arpejos" },
      { label: "Campo harmônico", href: "/campo-harmonico" },
      { label: "CAGED", href: "/caged" },
      { label: "Modos gregos", href: "/modos-gregos" },
      { label: "Círculo das quintas", href: "/circulo-de-quintas" },
      { label: "Progressões", href: "/progressoes-harmonicas" },
    ],
  },
  {
    titulo: "Técnica",
    itens: [
      { label: "Técnicas de mão", href: "/tecnicas" },
      { label: "Palhetada e mão direita", href: "/palhetada" },
      { label: "Speed trainer", href: "/speed-trainer" },
    ],
  },
  {
    titulo: "Prática e ferramentas",
    itens: [
      { label: "Braço interativo", href: "/braco" },
      { label: "Dicionário de acordes", href: "/dicionario-acordes" },
      { label: "Identificador reverso", href: "/identificador" },
      { label: "Afinações", href: "/afinacoes" },
      { label: "Backing tracks", href: "/backing-tracks" },
      { label: "Play-along de licks", href: "/play-along" },
      { label: "Repertório", href: "/repertorio" },
      { label: "Assistente de improviso", href: "/assistente-improviso" },
      { label: "Treino de acordes", href: "/treino-acordes" },
      { label: "Metrônomo", href: "/metronomo" },
    ],
  },
];

// Lista achatada de todos os itens (usada pela busca ⌘K), já com a seção.
export const NAV_FLAT: (NavItem & { secao: string })[] = NAV_SECTIONS.flatMap(
  (s) => s.itens.map((i) => ({ ...i, secao: s.titulo }))
);
