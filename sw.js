const C='olympos-v3';const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const same=new URL(e.request.url).origin===location.origin;
 e.respondWith(fetch(e.request,same?{cache:'no-cache'}:{}).then(res=>{if(same&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}if(!res.ok&&same)return caches.match(e.request).then(r=>r||res);return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
