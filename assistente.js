/* Assistente integrado Eletricista SENAI. Alexa Skill física é integração separada. */
(()=>{'use strict';
if(document.getElementById('eletricista-assistant-root'))return;
const root=document.createElement('div');root.id='eletricista-assistant-root';
root.innerHTML=`
<style>
#eletricista-assistant-root{font-family:system-ui,Arial;color:#102b50}
#esa-launch{position:fixed;right:17px;bottom:18px;z-index:99990;border:3px solid #68131a;border-radius:999px;background:linear-gradient(145deg,#ff5b5b,#bd101b);color:#fff;padding:13px 17px;font-weight:950;font-size:15px;box-shadow:0 5px 0 #650b14,0 9px 22px #0005;cursor:pointer}
#esa-launch:active{transform:translateY(3px);box-shadow:0 2px 0 #650b14}
#esa-panel{position:fixed;right:14px;bottom:82px;z-index:99991;width:min(390px,calc(100vw - 24px));max-height:min(76vh,680px);display:none;flex-direction:column;background:#fffdf7;border:3px solid #102b50;border-radius:18px;box-shadow:0 12px 40px #0006;overflow:hidden}
#esa-panel.open{display:flex}
#esa-head{background:linear-gradient(110deg,#9d1018,#e32932);color:#fff;padding:13px 14px;display:flex;justify-content:space-between;align-items:center;font-weight:950}
#esa-head small{display:block;font-weight:600;opacity:.9}
#esa-close{background:#fff;color:#86131b;border:0;border-radius:9px;padding:5px 10px;font-size:18px}
#esa-tools{padding:10px 12px;background:#f4ead8;border-bottom:1px solid #c9bda9;display:flex;gap:7px;flex-wrap:wrap}
#esa-tools a,#esa-tools button{border:1px solid #102b50;border-radius:9px;background:#fff;color:#102b50;padding:7px 9px;font-size:12px;font-weight:800;text-decoration:none}
#esa-log{padding:12px;overflow:auto;min-height:155px;max-height:38vh;display:flex;flex-direction:column;gap:9px}
.esa-msg{padding:10px 11px;border-radius:12px;max-width:95%;font-size:13px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}
.esa-bot{background:#e7eff9;border:1px solid #9bb3d0;align-self:flex-start}
.esa-user{background:#fff0c2;border:1px solid #d9b54a;align-self:flex-end}
#esa-form{display:flex;gap:6px;padding:10px;border-top:1px solid #c9bda9;background:#fff}
#esa-query{min-width:0;flex:1;border:2px solid #102b50;border-radius:10px;padding:10px;font:inherit;font-size:14px;color:#102b50}
#esa-send,#esa-mic{border:2px solid #102b50;border-radius:10px;background:#075eb1;color:#fff;padding:8px 11px;font-weight:900}
#esa-mic{background:#b71823}
#esa-foot{font-size:10px;color:#52647b;padding:0 12px 10px}
@media(max-width:480px){#esa-panel{right:8px;bottom:76px;width:calc(100vw - 16px)}#esa-launch{right:12px;bottom:12px}}
</style>
<button id="esa-launch" type="button" aria-label="Abrir assistente Eletricista SENAI">🔴 Alexa • Assistente</button>
<section id="esa-panel" role="dialog" aria-label="Assistente Eletricista SENAI" aria-modal="false">
 <div id="esa-head"><div>⚡ Assistente Eletricista SENAI<small>Pesquisa técnica • Dicionário • Voz</small></div><button id="esa-close" type="button" aria-label="Fechar">×</button></div>
 <div id="esa-tools"><a href="./dicionario-eletricista.html">📖 Dicionário completo</a><button id="esa-search-web" type="button">🌐 Pesquisar na web</button></div>
 <div id="esa-log" aria-live="polite"><div class="esa-msg esa-bot">Olá! Posso pesquisar no dicionário técnico, explicar conceitos e ajudar a encontrar módulos deste aplicativo. Pergunte, por exemplo: “O que é DPS?” ou “Explique barramento neutro”.</div></div>
 <form id="esa-form"><input id="esa-query" autocomplete="off" placeholder="Digite sua dúvida ou termo..." aria-label="Pergunta ou termo"/><button id="esa-mic" type="button" title="Falar">🎙️</button><button id="esa-send" type="submit">Enviar</button></form>
 <div id="esa-foot">Assistente de voz do aplicativo: não é uma conexão direta com a caixa Echo. A Skill Alexa na Amazon precisa ser ativada separadamente. Pesquisas externas abrem resultados no navegador. Conteúdo educacional; não substitui projeto ou profissional habilitado.</div>
</section>`;
document.body.appendChild(root);
const panel=root.querySelector('#esa-panel'),log=root.querySelector('#esa-log'),input=root.querySelector('#esa-query');
const open=()=>{panel.classList.add('open');input.focus()};root.querySelector('#esa-launch').onclick=()=>panel.classList.toggle('open');root.querySelector('#esa-close').onclick=()=>panel.classList.remove('open');
function add(text,who='bot'){const el=document.createElement('div');el.className='esa-msg esa-'+who;el.textContent=text;log.appendChild(el);log.scrollTop=log.scrollHeight}
function norm(s){return String(s||'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase()}
function respond(q){
 const query=String(q||'').trim();if(!query)return;add(query,'user');
 const dict=window.EletricistaDictionary;
 const term=dict?.find(query.replace(/^(o que e|o que significa|explique|defina|significado de|para que serve)\\s+/i,''));
 let answer='';
 if(term) answer=term.term+' ('+term.category+')\\n'+term.definition;
 else if(dict){const hits=dict.search(query).slice(0,4);if(hits.length)answer='Encontrei estes termos no dicionário:\\n'+hits.map(x=>'• '+x.term+': '+x.definition).join('\\n');}
 const qn=norm(query);
 const pages=[['quadro','./quadro-distribuicao.html','Quadro de distribuição'],['planta','./planta-residencial.html','Planta residencial'],['orçamento','./projeto-residencial.html','Projeto e orçamento'],['laboratório','./laboratorio.html','Laboratório e diagnóstico'],['alexa','./alexa.html','Configuração da Skill Alexa'],['aluno','./aluno.html','Portal do aluno'],['clientes','./clientes.html','Clientes e imóveis']];
 const found=pages.filter(x=>qn.includes(norm(x[0])));
 if(found.length)answer+=(answer?'\\n\\n':'')+'Módulo relacionado: '+found.map(x=>x[2]+' ('+x[1]+')').join('; ')+'.';
 if(!answer)answer='Não encontrei uma definição exata no dicionário local. Você pode pesquisar a expressão na web pelo botão “Pesquisar na web”. Se quiser, reformule usando o nome do componente ou da norma.';
 add(answer);
 try{window.EletricistaCore?.record('assistente','Consulta à assistente',query)}catch(e){}
 if('speechSynthesis'in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(answer.slice(0,900));u.lang='pt-BR';window.speechSynthesis.speak(u)}
}
root.querySelector('#esa-form').addEventListener('submit',e=>{e.preventDefault();const q=input.value;input.value='';respond(q)});
root.querySelector('#esa-search-web').onclick=()=>{const q=input.value.trim()||prompt('O que deseja pesquisar na web?');if(q)window.open('https://www.google.com/search?q='+encodeURIComponent(q+' instalações elétricas'),'_blank','noopener')};
const mic=root.querySelector('#esa-mic'),Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!Speech){mic.disabled=true;mic.title='Reconhecimento de voz não disponível neste navegador';}
else mic.onclick=()=>{const rec=new Speech();rec.lang='pt-BR';rec.interimResults=false;rec.maxAlternatives=1;mic.textContent='…';rec.onresult=e=>{input.value=e.results[0][0].transcript;respond(input.value);input.value=''};rec.onerror=()=>add('Não consegui reconhecer sua fala. Verifique a permissão do microfone e tente novamente.');rec.onend=()=>mic.textContent='🎙️';rec.start()};
})();
