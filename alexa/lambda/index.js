const Alexa = require('ask-sdk-core');

const TOPICS = {
  quadro: 'O quadro de distribuição reúne os dispositivos de proteção e os circuitos da instalação. Em um exercício, estudamos disjuntor geral, disjuntores dos circuitos, DR, DPS e barramentos. A montagem real depende do projeto e das instruções dos fabricantes.',
  disjuntor: 'O disjuntor protege o circuito contra sobrecorrentes, como sobrecarga e curto-circuito. Sua corrente nominal e sua curva precisam ser escolhidas por cálculo e conforme o projeto. Não escolha apenas pela potência do aparelho.',
  dr: 'O DR, ou dispositivo diferencial residual, detecta diferenças de corrente e pode desligar o circuito para reduzir riscos de choque elétrico. A seleção, a sensibilidade e a instalação dependem do projeto e das normas aplicáveis.',
  dps: 'O DPS limita sobretensões transitórias, como surtos. A classe, a tensão, a capacidade e a coordenação devem ser definidas para a instalação. Ele não substitui disjuntor, DR nem aterramento.',
  aterramento: 'O aterramento e o condutor de proteção PE fazem parte das medidas de segurança. O PE não deve ser confundido com o neutro. O esquema de aterramento e as ligações precisam seguir o projeto.',
  barramento: 'O barramento de fase distribui condutores ativos; o barramento de neutro reúne neutros conforme o esquema; e o barramento PE reúne condutores de proteção. Neutro e PE têm funções distintas e não devem ser unidos indiscriminadamente.',
  fios: 'Em instalações brasileiras, o azul-claro é reservado ao neutro e verde ou verde-amarelo ao condutor de proteção. As fases usam outras cores permitidas. A identificação deve ser consistente e seguir a norma aplicável.',
  interruptor: 'O interruptor simples comanda um ponto de iluminação. No circuito convencional, o interruptor interrompe o condutor fase, e o retorno segue para a lâmpada. A ligação deve ser estudada em diagrama e executada com circuito desenergizado.',
  tomada: 'Uma tomada deve receber os condutores previstos no sistema: fase, neutro quando aplicável e condutor de proteção PE. A posição dos contatos e o circuito precisam respeitar o padrão e o projeto.',
  iluminacao: 'O circuito de iluminação alimenta pontos de luz e seus comandos. A divisão dos circuitos, a seção dos condutores e a proteção são definidas pelo projeto, não por tentativa.',
  nr10: 'A NR dez trata da segurança em instalações e serviços em eletricidade. Entre os cuidados estão análise de risco, medidas de controle, desenergização, impedimento de reenergização e verificação de ausência de tensão por trabalhador autorizado.',
  nbr5410: 'A NBR cinco mil quatrocentos e dez trata de instalações elétricas de baixa tensão. Ela orienta projeto, seleção e instalação de componentes, proteção e verificação. Consulte sempre a edição vigente e um profissional habilitado.'
};

const TOPIC_ALIASES = {
  'quadro de luz':'quadro','quadro de distribuição':'quadro','quadro elétrico':'quadro',
  'disjuntores':'disjuntor','proteção':'disjuntor',
  'interruptor diferencial':'dr','diferencial residual':'dr',
  'protetor de surto':'dps','proteção contra surto':'dps',
  'terra':'aterramento','fio terra':'aterramento','pe':'aterramento',
  'barramentos':'barramento','neutro':'barramento','fase':'barramento',
  'cabos':'fios','condutores':'fios','cores dos fios':'fios',
  'lâmpada':'iluminacao','luz':'iluminacao',
  'tomadas':'tomada','segurança':'nr10','norma':'nbr5410','nbr 5410':'nbr5410'
};

function normalize(value='') {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}
function findTopic(value='') {
  const key=normalize(value);
  if(TOPICS[key]) return key;
  for(const [alias,target] of Object.entries(TOPIC_ALIASES)) if(key.includes(normalize(alias))) return target;
  for(const key of Object.keys(TOPICS)) if(normalize(key)===key && normalize(value).includes(key)) return key;
  return null;
}
const speak = (text, reprompt='Você pode perguntar sobre quadro, disjuntor, DR, DPS, aterramento, barramentos, fios, tomadas ou segurança.') =>
  Alexa.ResponseBuilder.create().speak(text).reprompt(reprompt).getResponse();

const LaunchRequestHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='LaunchRequest'; },
  handle(handlerInput) {
    return speak('Olá! Eu sou a Eletricista SENAI. Posso explicar instalações elétricas, quadro de distribuição, disjuntores, DR, DPS, barramentos, fios, tomadas e segurança. O que você quer estudar?');
  }
};
const AskTopicIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope)==='AskTopicIntent'; },
  handle(handlerInput) {
    const raw=Alexa.getSlotValue(handlerInput.requestEnvelope,'topic') || '';
    const topic=findTopic(raw);
    if(!topic) return speak('Ainda não identifiquei esse assunto. Tente perguntar sobre disjuntor, quadro de distribuição, DR, DPS, aterramento, barramentos, cores dos fios, tomadas ou iluminação.');
    return speak(TOPICS[topic]+' Quer estudar outro assunto?');
  }
};
const QuizIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope)==='QuizIntent'; },
  handle(handlerInput) {
    return speak('Vamos ao quiz. Primeira pergunta: qual barramento recebe os condutores de proteção? Diga terra, neutro ou fase.', 'Responda terra, neutro ou fase.');
  }
};
const AnswerIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope)==='AnswerIntent'; },
  handle(handlerInput) {
    const answer=normalize(Alexa.getSlotValue(handlerInput.requestEnvelope,'answer') || '');
    if(answer.includes('terra') || answer==='pe') return speak('Correto! O barramento PE recebe os condutores de proteção. Próxima pergunta: qual dispositivo detecta corrente diferencial residual?');
    if(answer.includes('neutro') || answer.includes('fase')) return speak('Não é essa. A resposta é barramento de proteção PE, também chamado terra. Neutro e PE têm funções diferentes.');
    return speak('Não consegui entender. Você pode responder terra, neutro ou fase.');
  }
};
const SafetyIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope)==='SafetyIntent'; },
  handle(handlerInput) {
    return speak('Atenção: não execute ligações com o circuito energizado. Serviços elétricos exigem análise de risco, desenergização, impedimento de reenergização, verificação de ausência de tensão e profissional autorizado conforme a NR dez. Esta skill é educativa e não substitui projeto, treinamento ou profissional habilitado.');
  }
};
const HelpIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope)==='AMAZON.HelpIntent'; },
  handle(handlerInput) { return speak('Você pode dizer: explique disjuntor, o que é DR, para que serve o DPS, explique barramentos, como identificar os fios, iniciar quiz ou falar sobre segurança.'); }
};
const StopIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && ['AMAZON.StopIntent','AMAZON.CancelIntent'].includes(Alexa.getIntentName(handlerInput.requestEnvelope)); },
  handle(handlerInput) { return Alexa.ResponseBuilder.create().speak('Até a próxima aula. Estude com segurança!').withShouldEndSession(true).getResponse(); }
};
const FallbackIntentHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='IntentRequest' && Alexa.getIntentName(handlerInput.requestEnvelope)==='AMAZON.FallbackIntent'; },
  handle(handlerInput) { return speak('Não entendi. Tente perguntar sobre instalações, quadro de distribuição, disjuntor, DR, DPS ou aterramento.'); }
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) { return Alexa.getRequestType(handlerInput.requestEnvelope)==='SessionEndedRequest'; },
  handle(handlerInput) { return Alexa.ResponseBuilder.create().getResponse(); }
};
const ErrorHandler = {
  canHandle() { return true; },
  handle(handlerInput,error) {
    console.log('Alexa skill error:',error && error.message);
    return speak('Desculpe, ocorreu um erro. Tente novamente.');
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler,AskTopicIntentHandler,QuizIntentHandler,AnswerIntentHandler,SafetyIntentHandler,HelpIntentHandler,StopIntentHandler,FallbackIntentHandler,SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
