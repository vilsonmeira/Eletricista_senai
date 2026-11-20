/* Acesso único, presença em tempo real e dica diária — VM Soluções Elétricas */
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.80.0/+esm";

const SUPABASE_URL = "https://pzkwxlxhawrbnjbsdxpo.supabase.co";
const SUPABASE_KEY = "sb_publishable_BcTki-0Wb62BvddGw68cow_dqJvY_8o";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const file = location.pathname.split("/").pop() || "index.html";
const isHome = file === "index.html" || file === "";
const next = new URLSearchParams(location.search).get("next");
const tips = [
  "Antes de qualquer intervenção, confirme a ausência de tensão com instrumento adequado e procedimento seguro.",
  "Identifique fase, neutro e condutor de proteção antes de iniciar qualquer ligação.",
  "O condutor de proteção (PE) não deve ser usado como neutro nem interrompido por interruptores comuns.",
  "Escolha cabos e dispositivos de proteção conforme o projeto e as normas aplicáveis; não dimensione por tentativa.",
  "Organize e identifique os circuitos no quadro para facilitar inspeção e manutenção.",
  "Nunca trabalhe em circuito energizado como rotina. A desenergização e os procedimentos da NR-10 vêm primeiro.",
  "Confira o aperto dos terminais conforme a especificação do fabricante; conexões frouxas podem aquecer.",
  "Use ferramentas isoladas e equipamentos de proteção adequados à atividade e ao risco avaliado.",
  "Em instalações residenciais, o DR e o DPS devem ser especificados e instalados conforme o projeto e as normas.",
  "Mantenha os eletrodutos sem excesso de ocupação e preserve a integridade da isolação dos condutores.",
  "Separe circuitos por finalidade e faça a identificação clara no quadro de distribuição.",
  "Nunca confie apenas na cor do fio: confirme a função do condutor por documentação e medição segura."
];
const day = new Date();
const dateKey = day.getFullYear()*10000 + (day.getMonth()+1)*100 + day.getDate();
const tip = tips[dateKey % tips.length];

function addStyles(){
  if(document.getElementById("vm-auth-style")) return;
  const style=document.createElement("style"); style.id="vm-auth-style";
  style.textContent=`
  .vm-auth-cover{position:fixed;inset:0;z-index:2147483600;display:grid;place-items:center;padding:22px;background:linear-gradient(145deg,#071a35f5,#123f76f5);font-family:system-ui,sans-serif}
  .vm-auth-card{width:min(100%,430px);background:#fffaf0;color:#142b45;border:3px solid #f2b705;border-radius:22px;padding:25px;box-shadow:0 16px 50px #0006}
  .vm-auth-card h2{margin:0 0 8px;color:#174ea6}.vm-auth-card p{color:#52657a}
  .vm-auth-card label{display:grid;gap:6px;margin:12px 0;color:#142b45;font-weight:700}
  .vm-auth-card input{width:100%;box-sizing:border-box;padding:13px;border:2px solid #b8c5d2;border-radius:10px;font:inherit;background:#fff;color:#142b45}
  .vm-auth-card button{width:100%;padding:13px;border:0;border-radius:10px;background:#174ea6;color:white;font-weight:900;font-size:16px}
  .vm-auth-msg{min-height:22px;color:#a32626!important;font-size:13px}
  .vm-community{max-width:1100px;margin:12px auto;padding:0 14px;display:grid;gap:9px}
  .vm-online,.vm-daily{background:#fff9e8;color:#142b45;border:2px solid #17365d;border-radius:14px;padding:12px 15px;box-shadow:3px 3px 0 #17365d}
  .vm-online{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;font-weight:800}
  .vm-online-count{background:#e9f7ee;color:#146c35;border:1px solid #9bd4ad;border-radius:99px;padding:5px 10px}
  .vm-daily strong{display:block;color:#174ea6;margin-bottom:3px}
  .vm-account{display:flex;align-items:center;justify-content:flex-end;gap:8px;max-width:1100px;margin:8px auto;padding:0 14px;font-size:12px;color:#eaf2ff}
  .vm-account button{padding:6px 10px;border-radius:99px;border:1px solid #f2b705;background:#142b45;color:#fff;font-weight:800}
  @media(max-width:600px){.vm-auth-card{padding:20px}.vm-community{padding:0 10px}.vm-account{padding:0 10px}}
  `;
  document.head.appendChild(style);
}
function showLogin(message=""){
  addStyles();
  let cover=document.querySelector(".vm-auth-cover");
  if(!cover){
    cover=document.createElement("div"); cover.className="vm-auth-cover";
    cover.innerHTML='<section class="vm-auth-card"><div style="font-size:42px">⚡👷</div><h2>VM Soluções Elétricas</h2><p>Entre com seu e-mail e senha para acessar o aplicativo.</p><form id="vmLoginForm"><label>E-mail<input name="email" type="email" autocomplete="username" required></label><label>Senha<input name="password" type="password" autocomplete="current-password" required></label><button type="submit">Entrar no aplicativo</button></form><p class="vm-auth-msg" id="vmLoginMsg" role="status"></p><small>O acesso é feito com uma conta já cadastrada. Não há cadastro público nesta versão.</small></section>';
    document.body.appendChild(cover);
    cover.querySelector("#vmLoginForm").addEventListener("submit",async e=>{
      e.preventDefault(); const button=cover.querySelector("button"); button.disabled=true; button.textContent="Entrando...";
      const data=Object.fromEntries(new FormData(e.currentTarget));
      const {data:result,error}=await supabase.auth.signInWithPassword({email:data.email,password:data.password});
      button.disabled=false; button.textContent="Entrar no aplicativo";
      if(error){cover.querySelector("#vmLoginMsg").textContent="Não foi possível entrar. Confira e-mail e senha.";return}
      if(next && /^[a-z0-9-]+\.html$/i.test(next) && !["aluno.html","escola.html"].includes(next)) location.replace("./"+next);
      else location.replace("./index.html");
    });
  }
  cover.querySelector("#vmLoginMsg").textContent=message;
}
function showCommunity(user){
  addStyles();
  if(document.querySelector(".vm-community")) return;
  const panel=document.createElement("section"); panel.className="vm-community";
  panel.innerHTML='<div class="vm-online"><span>👥 Pessoas usando o aplicativo agora</span><span class="vm-online-count" id="vmOnlineCount">Conectando...</span></div><div class="vm-daily"><strong>⚡ Sugestão diária do eletricista</strong><span>'+tip+'</span></div>';
  const header=document.querySelector("header");
  if(header) header.insertAdjacentElement("afterend",panel); else document.body.prepend(panel);
  const account=document.createElement("div"); account.className="vm-account";
  account.innerHTML='<span>Conectado: '+(user.email||"usuário")+'</span><button type="button" id="vmSignOut">Sair</button>';
  panel.insertAdjacentElement("beforebegin",account);
  account.querySelector("#vmSignOut").addEventListener("click",async()=>{
    if(window.vmPresenceChannel){await supabase.removeChannel(window.vmPresenceChannel);window.vmPresenceChannel=null}
    await supabase.auth.signOut(); location.replace("./index.html");
  });
  const presenceKey=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():String(Date.now())+"-"+Math.random();
  const channel=supabase.channel("vm-eletricista-online",{config:{presence:{key:presenceKey}}});
  window.vmPresenceChannel=channel;
  const render=()=>{
    const state=channel.presenceState(); const ids=new Set();
    Object.values(state).flat().forEach(p=>{if(p&&p.userId)ids.add(p.userId)});
    const el=document.getElementById("vmOnlineCount");
    if(el) el.textContent=ids.size+" "+(ids.size===1?"pessoa conectada":"pessoas conectadas");
  };
  channel.on("presence",{event:"sync"},render).on("presence",{event:"join"},render).on("presence",{event:"leave"},render)
    .subscribe(async status=>{
      const el=document.getElementById("vmOnlineCount");
      if(status==="SUBSCRIBED"){await channel.track({userId:user.id,onlineAt:new Date().toISOString()});render()}
      else if(status==="CHANNEL_ERROR"||status==="TIMED_OUT"){if(el)el.textContent="Contagem indisponível"}
    });
}
async function start(){
  if(file==="aluno.html"||file==="escola.html"){location.replace("./index.html");return}
  const {data:{session},error}=await supabase.auth.getSession();
  if(!session){
    if(!isHome){location.replace("./index.html?next="+encodeURIComponent(file));return}
    showLogin(error?"Não foi possível validar a sessão. Entre novamente.":"");return;
  }
  showCommunity(session.user);
}
start();
