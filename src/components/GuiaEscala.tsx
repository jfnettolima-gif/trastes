import Link from "next/link";

// Guia reutilizável de execução e estudo de escalas. Diferencia os dois
// sistemas de digitação usados no Trastes: "caixa" (pentatônicas e blues, com
// 2 notas por corda) e "3nps" (escala maior, menores e modos, com 3 notas por
// corda). O texto é o mesmo para todas as tônicas porque a mecânica da mão não
// muda com o tom, só a posição no braço.
export default function GuiaEscala({
  sistema,
}: {
  sistema: "caixa" | "3nps";
}) {
  return (
    <>
      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como reproduzir na guitarra</h2>

        {sistema === "caixa" ? (
          <>
            <p>
              <strong>Um dedo por casa:</strong> o desenho inteiro cabe numa janela de
              quatro casas. Mantenha a mão parada nessa janela, com um dedo pronto para
              cada casa (indicador, médio, anelar e mínimo), em vez de ficar
              "andando" com a mão. Assim cada nota tem sempre o mesmo dedo.
            </p>
            <p>
              <strong>Dois dedos por corda:</strong> na pentatônica há só duas notas em
              cada corda. Quando elas estão a dois trastes de distância, use indicador
              (1) e anelar (3); quando estão a três trastes, use indicador (1) e mínimo
              (4). Deixe os outros dedos flutuando logo acima das cordas, prontos.
            </p>
            <p>
              <strong>Ancore na tônica:</strong> antes de tocar, ache as bolinhas
              vermelhas (a tônica) e memorize sob quais dedos elas caem. É a partir
              delas que você monta as frases e sabe em que tom está improvisando.
            </p>
            <p>
              <strong>Mão da palheta:</strong> comece com palhetada alternada, um golpe
              para baixo e o próximo para cima, uma nota por vez. Deixe o pulso solto e
              a palheta com pouca sobra para fora, o movimento é pequeno.
            </p>
            <p>
              <strong>Ponta do dedo e economia:</strong> pressione com a ponta do dedo,
              logo atrás do traste (não em cima dele), para o som sair limpo sem forçar.
              Mantenha os dedos rentes às cordas para não perder tempo entre as notas.
            </p>
          </>
        ) : (
          <>
            <p>
              <strong>Três notas por corda:</strong> cada corda recebe exatamente três
              notas da escala antes de você passar para a próxima. A posição cobre uma
              faixa de quatro a cinco casas e é o sistema ideal para velocidade e para
              ligados.
            </p>
            <p>
              <strong>Digitação por corda:</strong> conforme o espaçamento das três
              notas, use os dedos <strong>1-2-4</strong> ou <strong>1-3-4</strong>. A
              regra prática: o indicador pega a primeira nota da corda e o mínimo pega a
              mais aguda; o dedo do meio escolhe entre médio e anelar conforme a
              distância. Nunca force um alargamento doloroso.
            </p>
            <p>
              <strong>Palhetada alternada ou ligado:</strong> há dois caminhos
              clássicos. No <strong>ligado</strong>, palheteie só a primeira nota de
              cada corda e faça hammer-on subindo e pull-off descendo, o que dá
              fluidez. Na <strong>palhetada alternada</strong>, alterne baixo-cima em
              todas as notas, o que dá clareza e ataque. Treine os dois.
            </p>
            <p>
              <strong>Deslize, não estique demais:</strong> se o alcance de uma corda
              ficar difícil, é normal deslocar a mão inteira uma casa em vez de esticar
              o mínimo. Mantenha o punho relaxado e o polegar apoiado atrás do braço.
            </p>
            <p>
              <strong>Ancore na tônica:</strong> localize as bolinhas vermelhas (a
              tônica) dentro da posição e use-as como referência. Começar e terminar na
              tônica é o que faz a escala "soar resolvida".
            </p>
          </>
        )}
      </div>

      <div className="card p-6 mt-4 space-y-3 text-neutral-700 leading-relaxed">
        <h2 className="font-semibold text-amber-900">Como estudar</h2>
        <p>
          <strong>Comece devagar, com metrônomo:</strong> escolha um andamento em que
          você acerte tudo sem travar (muitas vezes 50 a 60 BPM, uma nota por clique).
          Só suba 5 BPM depois de tocar três vezes seguidas sem nenhum erro. Velocidade
          é consequência de precisão, nunca o contrário. Use o{" "}
          <Link href="/metronomo" className="text-amber-700 underline">
            metrônomo
          </Link>{" "}
          do próprio Trastes.
        </p>
        <p>
          <strong>Suba e desça o desenho inteiro:</strong> toque da corda mais grave
          até a mais aguda e volte, sem parar nas pontas e mantendo o pulso constante.
          Esse é o aquecimento base de toda sessão.
        </p>
        {sistema === "caixa" ? (
          <p>
            <strong>Sequências:</strong> em vez de tocar reto, quebre em blocos de 3 e
            depois de 4 notas, sempre voltando à tônica. Isso solta os dedos e já
            transforma a escala em ideia de frase.
          </p>
        ) : (
          <p>
            <strong>Sequências de 3:</strong> toque em grupos deslizantes (1-2-3, depois
            2-3-4, depois 3-4-5...) subindo e descendo. É o exercício clássico de
            três-notas-por-corda e vira frase musical na hora.
          </p>
        )}
        <p>
          <strong>Diga as notas ou os graus:</strong> toque bem devagar dizendo em voz
          alta o nome da nota (ou o grau: 1, b3, 4, 5, b7...). Ligar som + posição +
          nome ao mesmo tempo é o que tira a escala do "decoreba" e a coloca no ouvido.
        </p>
        <p>
          <strong>Conecte com a posição vizinha:</strong> depois de dominar este
          desenho, toque as últimas notas dele e emende direto no desenho seguinte, sem
          parar. O objetivo final é enxergar o braço inteiro conectado, não caixas
          soltas.
        </p>
        <p>
          <strong>Faça música com ela:</strong> abra uma{" "}
          <Link href="/backing-tracks" className="text-amber-700 underline">
            backing track
          </Link>{" "}
          no tom certo e improvise usando só este desenho, sempre resolvendo na tônica.
          É aí que a escala deixa de ser exercício e vira solo de verdade.
        </p>
      </div>
    </>
  );
}
