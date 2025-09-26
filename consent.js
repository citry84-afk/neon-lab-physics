(function(){
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };
  gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  const KEY='lipa_consent_v2';
  let saved=null; try{ saved=JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){}
  if(saved&&saved.status){ upd(saved.status); return; }
  function upd(s){ const on=s==='granted'; gtag('consent','update',{ad_storage:on?'granted':'denied',analytics_storage:on?'granted':'denied',ad_user_data:on?'granted':'denied',ad_personalization:on?'granted':'denied'}); }
  function set(s){ upd(s); try{localStorage.setItem(KEY, JSON.stringify({status:s, ts:Date.now()}));}catch(e){}; if(bar.parentNode) bar.parentNode.removeChild(bar); }
  const bar=document.createElement('div');
  bar.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:100000;background:rgba(0,0,20,.95);border-top:2px solid #00ffff;color:#e8f6ff;padding:14px;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;';
  bar.innerHTML='<span style="max-width:680px;text-align:center">Usamos Analytics y AdSense. Ver <a href="/privacy.html" style="color:#00ffff">Privacidad</a>.</span>'+
    '<div style="display:flex;gap:10px;flex-wrap:wrap">'+
    '<button id="ok" style="background:#00ffff;color:#000;padding:10px 16px;border:none;border-radius:8px;font-weight:700;cursor:pointer">ACEPTAR</button>'+
    '<button id="no" style="background:#444;color:#fff;padding:10px 16px;border:1px solid #666;border-radius:8px;font-weight:700;cursor:pointer">RECHAZAR</button>'+
    '</div>';
  document.addEventListener('DOMContentLoaded', function(){ document.body.appendChild(bar); });
  bar.addEventListener('click', function(e){ if(e.target&&e.target.id==='ok') set('granted'); if(e.target&&e.target.id==='no') set('denied'); });
})();


