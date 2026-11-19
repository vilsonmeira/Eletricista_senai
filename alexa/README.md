# Alexa Eletricista SENAI

Skill personalizada em português do Brasil para estudar instalações elétricas por voz.

## Conteúdo incluído
- Quadro de distribuição e seus componentes
- Disjuntores, DR e DPS
- Barramentos de fase, neutro e proteção (PE)
- Identificação de condutores
- Interruptores, tomadas e iluminação
- Noções de NR-10 e ABNT NBR 5410
- Quiz introdutório por voz

## Como ativar
1. Entre em https://developer.amazon.com/alexa/console/ask com sua conta Amazon.
2. Crie uma skill chamada **Eletricista SENAI**.
3. Escolha **Custom** e **Alexa-hosted (Node.js)** para que a hospedagem inicial do código seja feita pela Amazon.
4. Em Build > Interaction Model > JSON Editor, copie o conteúdo de `interactionModels/custom/pt-BR.json` e salve.
5. Clique em Build Model.
6. Na aba Code, substitua o conteúdo de `lambda/index.js` pelo arquivo deste repositório e implante.
7. Na aba Test, habilite o teste para Development e teste em português (Brasil).

## Frases de exemplo
- “Alexa, abrir Eletricista SENAI.”
- “Explique disjuntor.”
- “Para que serve o DR?”
- “Explique os barramentos.”
- “Fale sobre segurança.”
- “Iniciar quiz.”

## Limites e segurança
Esta é uma assistente educacional com conteúdo inicial local. Não é um projeto elétrico, não dimensiona circuitos e não autoriza intervenções. Não fornece instruções para trabalhar energizado. Dimensionamento, montagem e verificação reais exigem projeto, normas vigentes e profissional habilitado.

A publicação na loja Alexa exige preencher os dados da skill, executar testes e passar pela análise da Amazon. O código no GitHub, sozinho, não cria nem publica a skill: a conta Amazon precisa concluir as etapas no Developer Console.
