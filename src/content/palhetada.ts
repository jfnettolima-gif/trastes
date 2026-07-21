export type LicaoPalhetada = {
  slug: string;
  lessonKey: string;
  titulo: string;
  simbolo: string;
  paragrafos: string[];
};

export const LICOES_PALHETADA: LicaoPalhetada[] = [
  {
    slug: "empunhadura-alternada",
    lessonKey: "palhetada.empunhadura-alternada",
    titulo: "Empunhadura e palhetada alternada",
    simbolo: "⤈ ⤉",
    paragrafos: [
      "Segure a palheta entre o polegar e a lateral do indicador dobrado, deixando só uma pontinha para fora. Firme o suficiente para não escapar, solto o suficiente para o pulso trabalhar leve. O movimento vem do pulso, não do braço inteiro.",
      "A palhetada alternada é a base de tudo: alterna golpe para baixo (⤈) e para cima (⤉) sem exceção, mesmo trocando de corda. Isso mantém o ritmo estável e prepara o terreno para a velocidade, porque cada golpe já 'volta' na posição do próximo.",
      "Comece devagar dizendo em voz alta 'baixo-cima-baixo-cima' e mantendo os golpes do mesmo tamanho. Uma nota por clique do metrônomo, depois duas (colcheias), sempre limpo antes de acelerar. O Speed trainer é o lugar certo para subir o andamento.",
      "Erro comum: palhetar só para baixo por comodidade. Funciona no lento, mas trava na hora de correr. Force a alternância desde o começo, mesmo que pareça estranho no início.",
    ],
  },
  {
    slug: "palhetada-economia",
    lessonKey: "palhetada.palhetada-economia",
    titulo: "Palhetada de economia",
    simbolo: "eco",
    paragrafos: [
      "A palhetada de economia é uma otimização da alternada: ao trocar de corda, em vez de voltar, a palheta continua no mesmo sentido e 'cai' na corda seguinte. Se você vinha descendo e vai para uma corda mais aguda, um único movimento para baixo já toca as duas.",
      "Na prática: dentro da mesma corda você usa alternada normal; só na troca de corda, quando o sentido do golpe 'aponta' para a próxima corda, você aproveita e emenda. Isso poupa movimento e ajuda em escalas com número ímpar de notas por corda.",
      "É meio caminho para o sweep: a diferença é que na economia cada nota ainda soa separada e articulada, enquanto no sweep as notas de um arpejo são varridas quase como um só gesto.",
      "Cuidado para não virar preguiça rítmica: a economia só vale quando o sentido do golpe realmente favorece a troca. Forçar economia no lugar errado bagunça o tempo. Estude devagar sentindo qual golpe cai natural na próxima corda.",
    ],
  },
  {
    slug: "sweep-picking",
    lessonKey: "palhetada.sweep-picking",
    titulo: "Sweep picking (varredura)",
    simbolo: "⤋",
    paragrafos: [
      "No sweep picking a palheta varre várias cordas num movimento contínuo, como se 'derramasse' o golpe de uma corda para a outra. É a técnica clássica para tocar arpejos rápidos, som muito usado no rock e no metal instrumental.",
      "O segredo NÃO está na mão que palheta, e sim na mão esquerda: cada nota precisa ser abafada assim que você sai dela, levantando o dedo, para que as cordas não soem todas juntas feito um acorde. Sem esse abafamento, o sweep vira uma sujeira.",
      "Estude um arpejo pequeno (por exemplo, uma tríade em três cordas) bem devagar, cuidando para ouvir uma nota de cada vez, limpa e separada, mesmo no movimento de varredura. Só aumente a velocidade quando a separação estiver perfeita.",
      "O sweep combina com o sistema de arpejos e de tríades: você varre exatamente as notas do acorde. Vale visitar aquelas telas para saber QUAIS notas está varrendo, em vez de decorar a forma no escuro.",
    ],
  },
  {
    slug: "tapping",
    lessonKey: "palhetada.tapping",
    titulo: "Tapping (mão direita no braço)",
    simbolo: "t",
    paragrafos: [
      "No tapping você usa um dedo da mão da palhetada para 'martelar' uma casa diretamente no braço, como se fosse um hammer-on feito pela mão direita. Isso permite alcançar notas muito distantes das que a mão esquerda está segurando, abrindo saltos largos impossíveis de outro jeito.",
      "O movimento é: a mão direita martela (tap) uma casa alta, depois puxa a corda para o lado ao sair (pull-off), fazendo soar uma nota da mão esquerda. Alternando tap e as notas da esquerda, saem aquelas cascatas rápidas que ficaram famosas com o Eddie Van Halen.",
      "Na tablatura aparece com 't' sobre a nota tocada pela mão direita. Exemplo (corda Si):\ne|-----------------\nB|--12t--8p5-------\nG|-----------------\nD|-----------------\nA|-----------------\nE|-----------------\nAqui a mão direita bate a casa 12 e puxa para a 8 e a 5 da mão esquerda.",
      "Abafe as cordas que não estão tocando (com a lateral da mão ou um dedo folgado): o tapping deixa muitas cordas livres vibrando e sem abafamento vira barulho. Comece com um padrão curto de três notas e repita até o movimento ficar automático.",
    ],
  },
  {
    slug: "dedilhado-hibrido",
    lessonKey: "palhetada.dedilhado-hibrido",
    titulo: "Dedilhado e palhetada híbrida",
    simbolo: "p i m a",
    paragrafos: [
      "No dedilhado (fingerstyle) você toca com os dedos em vez da palheta: o polegar (p) cuida das cordas graves (6ª, 5ª, 4ª) e os dedos indicador (i), médio (m) e anular (a) tocam as cordas agudas (3ª, 2ª, 1ª). Isso permite tocar o baixo e a melodia ao mesmo tempo.",
      "Um bom ponto de partida é o baixo alternado: o polegar marca a tônica e a quinta do acorde no tempo, enquanto os dedos pontilham as cordas de cima. É a base do violão que acompanha canção, do folk ao pop.",
      "A palhetada híbrida junta os dois mundos: você continua segurando a palheta (para as cordas graves e as notas rápidas) e usa os dedos médio e anular para 'beliscar' as cordas agudas ao mesmo tempo. É muito usada em country, blues e rock para tocar acordes 'quebrados' com estalo.",
      "Comece sem pressa e sem palheta, sentindo cada dedo puxar sua corda. Depois experimente o híbrido em um acorde aberto: palheta no baixo, dedos nas duas cordas mais finas. A independência dos dedos vem com a repetição lenta.",
    ],
  },
];
