const CACHE_NAME="eletricista-senai-v11";
const APP_FILES=["./","./index.html","./core.js","./manifest.webmanifest","./icon.svg","./painel-integrado.html","./laboratorio.html","./quadro-distribuicao.html","./planta-residencial.html","./projeto-residencial.html","./clientes.html","./aluno.html","./escola.html","./gestao.html"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match("./index.html"))))});
