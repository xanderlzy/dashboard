var C="kanban-v19",F=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}))});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.pathname.indexOf("/__/")===0)return;
  if(u.hostname==="www.gstatic.com"){
    e.respondWith(fetch(r).then(function(x){var c=x.clone();caches.open(C).then(function(k){k.put(r,c)});return x}).catch(function(){return caches.match(r)}));
    return;
  }
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(r).then(function(x){return x||fetch(r)}));
});
