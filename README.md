# Eletricista Master ⚡

Projeto educativo de instalações elétricas residenciais, com desafios progressivos e simulador visual de ligações.

## Como executar
Abra `index.html` no navegador ou publique o repositório com GitHub Pages (Settings → Pages → Deploy from a branch → main → /root).

## Versão inicial
- Simulação didática de circuitos desenergizados.
- Desafios de interruptor simples, lâmpadas em paralelo e tomada.
- Conferência de ligações, sinalização de acerto/erro e pontuação.
- Conteúdo de segurança e aprendizagem progressiva.

## Segurança
Este jogo é exclusivamente educativo. Não conecte circuitos reais com base apenas no simulador. Instalações reais exigem projeto, desenergização, verificação de ausência de tensão, proteção adequada e acompanhamento de profissional habilitado, conforme normas aplicáveis (incluindo ABNT NBR 5410 e NR-10).

## Próximas etapas
Adicionar diagramas interativos, mais níveis, avaliação, histórico de progresso e conteúdo alinhado ao curso.


## Painel integrado — evolução inicial

- `painel-integrado.html`: central de navegação para os módulos existentes e novos.
- `laboratorio.html`: multímetro virtual didático e desafios de diagnóstico de falhas simuladas.
- A bancada registra pontuação e desafios concluídos no armazenamento local do navegador.
- O service worker inclui os novos módulos e os principais módulos existentes no cache da aplicação.

### Próximas etapas de integração

1. Unificar os dados da planta, circuitos e projeto residencial.
2. Criar quadro de distribuição didático com validação de proteções.
3. Evoluir os componentes 2D para uma casa 3D interativa com circuitos compartilhados.
4. Consolidar histórico de aprendizagem e relatórios do aluno.

Os resultados de medição e diagnóstico são simulados e não devem ser usados para orientar intervenções em instalações reais.


## Integração entre módulos — versão 0.4

- `core.js`: núcleo local compartilhado de progresso e histórico.
- A bancada registra desafios concluídos no núcleo integrado, mantendo compatibilidade com os pontos antigos.
- O painel integrado apresenta o histórico recente e consolida a pontuação.
- Os dados ficam no armazenamento local do navegador/aparelho; não são sincronizados automaticamente entre dispositivos.
- Para sincronização entre aparelhos e turmas, será necessária a integração autenticada com o banco de dados e políticas de acesso.

