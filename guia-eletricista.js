/* Guia animado VM Soluções Elétricas — navegação por voz */
(() => {
  const nav = document.querySelector('.vm-bottom-nav');
  if (document.querySelector('.vm-guide')) return;
  const items = nav ? [...nav.querySelectorAll('a')] : [];
  const routes = [
    {file:'index.html', title:'Início', desc:'Aqui começa sua jornada. Você encontra a bancada de aprendizagem, desafios e seu progresso.'},
    {file:'aluno.html', title:'Aprender', desc:'Nesta aba você estuda os conteúdos, acompanha as etapas e desenvolve suas habilidades de eletricista.'},
    {file:'painel-integrado.html', title:'Módulos', desc:'Aqui ficam reunidas as ferramentas do aplicativo: laboratório, projetos, clientes e outros recursos.'},
    {file:'quadro-distribuicao.html', title:'Quadro', desc:'Neste módulo você conhece os componentes do quadro de distribuição e pratica uma montagem didática.'},
    {file:'alexa.html', title:'Alexa', desc:'Aqui você encontra a área de integração com a Alexa e os recursos de assistência por voz.'}
  ];
  const path = location.pathname.split('/').pop() || 'index.html';
  const active = path === 'index.html' ? 0 : path === 'aluno.html' ? 1 : path === 'quadro-distribuicao.html' ? 3 : path === 'alexa.html' ? 4 : 2;
  const savedVoice = localStorage.getItem('vmGuideVoice') === 'on';
  const guide = document.createElement('div');
  guide.className = 'vm-guide';
  guide.innerHTML = '<div class="vm-guide-bubble" role="status" aria-live="polite"></div><div class="vm-guide-walker" aria-label="Eletricista virtual caminhando"><img src="./eletricista-mascote.svg" alt="" /></div><button class="vm-guide-toggle" type="button" aria-expanded="false">☰ Abas</button><button class="vm-guide-voice" type="button" aria-pressed="'+savedVoice+'">🔊 Voz '+(savedVoice?'ligada':'desligada')+'</button>';
  (nav || document.body.firstElementChild)?.before(guide) || document.body.appendChild(guide);
  const bubble = guide.querySelector('.vm-guide-bubble');
  const walker = guide.querySelector('.vm-guide-walker');
  const mascotImage = walker.querySelector('img');
  mascotImage.addEventListener('error', () => { walker.textContent = '👷‍♂️'; walker.setAttribute('aria-label','Eletricista virtual'); });
  const toggle = guide.querySelector('.vm-guide-toggle');
  const voice = guide.querySelector('.vm-guide-voice');
  const say = (message) => {
    bubble.textContent = message;
    bubble.classList.add('show');
    if (localStorage.getItem('vmGuideVoice') === 'on' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.96;
      utterance.pitch = 1.02;
      window.speechSynthesis.speak(utterance);
    }
  };
  const placeWalker = (index) => {
    const link = items[index];
    if (!link) return;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    walker.style.left = (linkRect.left + linkRect.width / 2) + 'px';
    walker.classList.remove('walking');
    void walker.offsetWidth;
    walker.classList.add('walking');
    mascotImage.classList.remove('stepping');
    void mascotImage.offsetWidth;
    mascotImage.classList.add('stepping');
    window.clearTimeout(walker._walkTimer);
    walker._walkTimer = window.setTimeout(() => { walker.classList.remove('walking'); mascotImage.classList.remove('stepping'); }, 1250);
  };
  routes.forEach((route, i) => {
    const link = items[i];
    if (!link) return;
    link.removeAttribute('aria-current');
    if (i === active) link.setAttribute('aria-current','page');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      placeWalker(i);
      say('Vamos para '+route.title+'. '+route.desc);
      const href = link.getAttribute('href');
      if (href && href !== '#') window.setTimeout(() => { location.href = href; }, localStorage.getItem('vmGuideVoice') === 'on' ? 2200 : 1450);
    });
  });
  toggle.addEventListener('click', () => {
    const expanded = nav ? nav.classList.toggle('vm-nav-expanded') : false;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? '✕ Fechar abas' : '☰ Abas';
    say(expanded ? 'Escolha uma aba. Eu vou caminhar até ela e explicar para que serve.' : 'Menu de abas recolhido. Toque em Abas quando quiser navegar.');
  });
  voice.addEventListener('click', () => {
    const on = localStorage.getItem('vmGuideVoice') !== 'on';
    localStorage.setItem('vmGuideVoice', on ? 'on' : 'off');
    voice.textContent = '🔊 Voz '+(on?'ligada':'desligada');
    voice.setAttribute('aria-pressed', String(on));
    if (on) {
      say('Olá! Eu sou seu eletricista virtual. Vou acompanhar você pelos módulos e explicar cada aba.');
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      say('Áudio desligado. As explicações continuam aparecendo em texto.');
    }
  });
  if (nav) nav.classList.remove('vm-nav-expanded');
  placeWalker(active);
  const current = routes[active] || routes[0];
  say('Você está em '+current.title+'. '+current.desc+' Ative a voz para ouvir minhas orientações.');
  window.addEventListener('resize', () => placeWalker(active));
})();