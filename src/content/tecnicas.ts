export type LicaoTecnica = {
  slug: string;
  lessonKey: string;
  titulo: string;
  simbolo: string;
  paragrafos: string[];
};

export const LICOES_TECNICAS: LicaoTecnica[] = [
  {
    slug: "hammer-on-pull-off",
    lessonKey: "tecnicas.hammer-on-pull-off",
    titulo: "Hammer-on e pull-off (ligados)",
    simbolo: "h / p",
    paragrafos: [
      "O hammer-on ('martelada') é tocar uma nota mais aguda sem palhetar de novo: você palheta a primeira nota e depois 'martela' o dedo em uma casa mais alta da mesma corda, com força, para a nota soar.",
      "O pull-off é o movimento contrário: você já está apertando uma casa mais alta e 'puxa' o dedo para o lado ao soltar, fazendo soar uma nota mais grave (uma casa solta ou apertada por outro dedo). Só a primeira nota é palhetada.",
      "Na tablatura aparecem com 'h' e 'p' entre os números. Exemplo (corda Sol):\ne|-----------------\nB|-----------------\nG|--5h7----7p5-----\nD|-----------------\nA|-----------------\nE|-----------------",
      "Juntos, hammer-on e pull-off são a base dos 'ligados', que dão fluidez e velocidade ao solo sem precisar palhetar cada nota.",
    ],
  },
  {
    slug: "bend",
    lessonKey: "tecnicas.bend",
    titulo: "Bend (dobra)",
    simbolo: "b",
    paragrafos: [
      "O bend é empurrar (ou puxar) a corda para o lado enquanto ela soa, esticando-a para elevar a altura da nota. É uma das técnicas mais expressivas da guitarra, aquele 'choro' típico do blues e do rock.",
      "O bend mais comum é o de um tom (sobe 2 casas de altura) e o de meio tom (sobe 1 casa). Use vários dedos juntos para ter força e afine o bend de ouvido: a nota alvo deve bater certinho com a nota real daquela altura.",
      "Na tablatura aparece com 'b' (às vezes com o alvo entre parênteses). Exemplo:\ne|-----------------\nB|--7b9------------\nG|-----------------\nD|-----------------\nA|-----------------\nE|-----------------\nAqui você toca a casa 7 e a dobra até soar como a casa 9.",
      "Variações: o 'release' é voltar a corda à posição normal depois do bend, e o 'pre-bend' é já dobrar a corda antes de palhetar e depois soltar.",
    ],
  },
  {
    slug: "vibrato",
    lessonKey: "tecnicas.vibrato",
    titulo: "Vibrato",
    simbolo: "~",
    paragrafos: [
      "O vibrato é variar levemente a altura da nota de forma rápida e repetida, dando vida e sustentação ao som. É basicamente uma sequência de mini-bends de ida e volta na mesma nota.",
      "Pode ser feito com o movimento do pulso (empurrando e soltando a corda de leve) ou, em guitarras clássicas, deslizando o dedo no sentido da corda. A velocidade e a amplitude do vibrato fazem parte da 'assinatura' de cada guitarrista.",
      "Na tablatura aparece como um '~' depois da nota. Exemplo:\ne|-----------------\nB|--8~~~~----------\nG|-----------------\nD|-----------------\nA|-----------------\nE|-----------------",
      "Dica: um vibrato bem feito em uma nota longa costuma soar melhor do que muitas notas rápidas sem expressão. Trabalhe o controle antes da velocidade.",
    ],
  },
  {
    slug: "slide",
    lessonKey: "tecnicas.slide",
    titulo: "Slide (deslize)",
    simbolo: "/ \\",
    paragrafos: [
      "O slide é deslizar o dedo de uma casa para outra sem soltar a corda, mantendo o som contínuo entre as duas notas. Palheta-se apenas a primeira nota (ou nenhuma, no caso de ligar frases).",
      "A barra '/' indica slide subindo (para casas mais altas) e a barra '\\' indica slide descendo. Exemplo:\ne|-----------------\nB|-----------------\nG|--5/9----9\\5-----\nD|-----------------\nA|-----------------\nE|-----------------",
      "O slide é ótimo para conectar posições diferentes do braço (por exemplo, mudar de um desenho da pentatônica para o próximo) sem que a passagem soe cortada.",
      "Existe também o slide 'sem destino definido', que sobe ou desce a corda saindo ou chegando a uma nota, muito usado como efeito de entrada e saída de frases.",
    ],
  },
  {
    slug: "palm-mute",
    lessonKey: "tecnicas.palm-mute",
    titulo: "Palm mute (abafado)",
    simbolo: "P.M.",
    paragrafos: [
      "O palm mute é apoiar levemente a lateral da mão da palhetada sobre as cordas, bem perto da ponte, para abafar parcialmente o som. O resultado é um som mais curto, encorpado e percussivo.",
      "É a base do peso do rock e do metal (aquele 'chug' nas cordas graves), mas também aparece de forma suave em música pop e acústica para dar controle e dinâmica.",
      "Na tablatura/partitura aparece como 'P.M.' com uma linha tracejada sobre as notas afetadas. A pressão da mão controla o quanto o som fica abafado: mais perto da ponte, mais aberto; mais para o meio, mais surdo.",
      "Combine palm mute com notas abertas (sem abafar) para criar contraste e dinâmica dentro do mesmo riff.",
    ],
  },
];
