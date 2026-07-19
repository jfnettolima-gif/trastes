export type OnboardingQuestion = {
  key: string;
  question: string;
  type: "select" | "text";
  options?: { value: string; label: string }[];
};

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    key: "tempoTocando",
    question: "Há quanto tempo você toca guitarra?",
    type: "select",
    options: [
      { value: "nunca", label: "Nunca toquei" },
      { value: "menos_6m", label: "Menos de 6 meses" },
      { value: "6m_2a", label: "Entre 6 meses e 2 anos" },
      { value: "mais_2a", label: "Mais de 2 anos" },
    ],
  },
  {
    key: "conheceNotas",
    question: "Você já conhece as notas no braço da guitarra?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "algumas", label: "Só algumas" },
      { value: "sim", label: "Sim, bem" },
    ],
  },
  {
    key: "conhecePentatonica",
    question: "Você conhece a escala pentatônica?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "ouvi_falar", label: "Já ouvi falar" },
      { value: "sim", label: "Sim, uso normalmente" },
    ],
  },
  {
    key: "conheceEscalaMaior",
    question: "Você conhece a escala maior?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "ouvi_falar", label: "Já ouvi falar" },
      { value: "sim", label: "Sim" },
    ],
  },
  {
    key: "conheceCampoHarmonico",
    question: "Você conhece campo harmônico?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "ouvi_falar", label: "Já ouvi falar" },
      { value: "sim", label: "Sim" },
    ],
  },
  {
    key: "consegueImprovisar",
    question: "Você consegue improvisar um solo simples?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "um_pouco", label: "Um pouco" },
      { value: "sim", label: "Sim" },
    ],
  },
  {
    key: "usaMetronomo",
    question: "Você usa metrônomo para estudar?",
    type: "select",
    options: [
      { value: "nunca", label: "Nunca usei" },
      { value: "as_vezes", label: "Às vezes" },
      { value: "sempre", label: "Sempre" },
    ],
  },
  {
    key: "conheceTablatura",
    question: "Você sabe ler tablatura?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "mais_ou_menos", label: "Mais ou menos" },
      { value: "sim", label: "Sim" },
    ],
  },
  {
    key: "conheceIntervalos",
    question: "Você conhece intervalos musicais?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "ouvi_falar", label: "Já ouvi falar" },
      { value: "sim", label: "Sim" },
    ],
  },
  {
    key: "conheceCaged",
    question: "Você conhece o sistema CAGED?",
    type: "select",
    options: [
      { value: "nao", label: "Não" },
      { value: "ouvi_falar", label: "Já ouvi falar" },
      { value: "sim", label: "Sim" },
    ],
  },
  {
    key: "estilos",
    question: "Quais estilos você mais quer tocar?",
    type: "text",
  },
  {
    key: "tempoDisponivel",
    question: "Quanto tempo você pode estudar por dia?",
    type: "select",
    options: [
      { value: "15", label: "15 minutos" },
      { value: "30", label: "30 minutos" },
      { value: "45", label: "45 minutos" },
      { value: "60", label: "60 minutos" },
      { value: "90", label: "90 minutos" },
    ],
  },
  {
    key: "dificuldades",
    question: "Quais são suas principais dificuldades hoje?",
    type: "text",
  },
  {
    key: "objetivo",
    question: "Qual é o seu principal objetivo com a guitarra?",
    type: "text",
  },
];
