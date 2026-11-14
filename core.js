/* Eletricista SENAI — núcleo de integração local v1
   Centraliza progresso e histórico entre os módulos no mesmo navegador.
   Não armazena senhas nem dados pessoais. */
(()=>{"use strict";
const KEY="eletricista-core-v1";
const empty=()=>({version:1,score:0,completed:{},history:[],updatedAt:null});
function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||"null");return v&&v.version===1?{...empty(),...v}:empty()}catch{return empty()}}
function write(state){state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));window.dispatchEvent(new CustomEvent("eletricista:state",{detail:state}));return state}
function completeChallenge(id,title,points=100){const s=read();if(s.completed[id])return s;s.completed[id]={id,title,points,completedAt:new Date().toISOString()};s.score+=points;s.history.unshift({type:"challenge",title,detail:"Desafio concluído",points,at:new Date().toISOString()});s.history=s.history.slice(0,40);return write(s)}
function record(type,title,detail=""){const s=read();s.history.unshift({type,title,detail,at:new Date().toISOString()});s.history=s.history.slice(0,40);return write(s)}
function getState(){return read()}
function resetProgress(){return write(empty())}
window.EletricistaCore=Object.freeze({getState,completeChallenge,record,resetProgress,storageKey:KEY});
})();