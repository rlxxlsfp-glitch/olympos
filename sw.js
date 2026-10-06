const C='olympos-v4';const F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==location.origin)return;
  e.respondWith(
    fetch(url.href,{cache:'no-cache'}).then(res=>{
      if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(req.mode==='navigate'?'./index.html':req,cp));return res;}
      return caches.match(req.mode==='navigate'?'./index.html':req).then(r=>r||res);
    }).catch(()=>caches.match(req.mode==='navigate'?'./index.html':req).then(r=>r||caches.match('./index.html')))
  );
});
