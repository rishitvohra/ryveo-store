/* RYVEO hybrid storefront enhancements: local-only recents, related pieces and shipping progress. */
(function(){
  "use strict";
  const catalog=window.RYVEO_CATALOG||[];
  const money=n=>"₹"+Number(n||0).toLocaleString("en-IN");
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}};
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function productUrl(p){return "product.html?item="+encodeURIComponent(p.slug)}
  function rememberProduct(){
    const slug=new URLSearchParams(location.search).get("item");
    if(!slug||!catalog.some(p=>p.slug===slug))return;
    const recent=read("ryveo-recent-v1",[]).filter(x=>x!==slug);
    recent.unshift(slug);localStorage.setItem("ryveo-recent-v1",JSON.stringify(recent.slice(0,6)));
  }
  function renderRecent(){
    const section=document.getElementById("ryveo-recently-viewed"),grid=document.getElementById("ryveo-recent-grid");
    if(!section||!grid)return;
    const items=read("ryveo-recent-v1",[]).map(slug=>catalog.find(p=>p.slug===slug)).filter(Boolean);
    if(!items.length)return;
    grid.innerHTML=items.slice(0,4).map(p=>'<a class="ryveo-recent-card" href="'+productUrl(p)+'"><img src="'+encodeURI(p.image)+'" alt="'+esc(p.name)+'" loading="lazy"><strong>'+esc(p.name)+'</strong><span>'+money(p.price)+'</span></a>').join("");
    section.hidden=false;
  }
  function renderRelated(){
    const root=document.getElementById("ryveo-product-page");
    if(!root||root.dataset.relatedReady||!root.querySelector(".ryveo-product-layout"))return;
    const slug=new URLSearchParams(location.search).get("item"),current=catalog.find(p=>p.slug===slug);
    if(!current)return;
    root.dataset.relatedReady="1";
    const picks=catalog.filter(p=>p.category===current.category&&p.slug!==current.slug).slice(0,3);
    if(!picks.length)return;
    const section=document.createElement("section");section.className="ryveo-related";
    section.innerHTML='<div class="ryveo-editorial-heading"><div><span class="ryveo-breadcrumb">KEEP THE ENERGY GOING</span><h2>YOU MAY ALSO LIKE<span>.</span></h2></div></div><div class="ryveo-related-grid">'+picks.map(p=>'<a class="ryveo-related-card" href="'+productUrl(p)+'"><img src="'+encodeURI(p.image)+'" alt="'+esc(p.name)+'" loading="lazy"><span><strong>'+esc(p.name)+'</strong><span>'+money(p.price)+'</span><small>VIEW PIECE ↗</small></span></a>').join("")+'</div>';
    root.append(section);
  }
  function updateShippingProgress(){
    const root=document.getElementById("ryveo-cart-page"),summary=root&&root.querySelector(".ryveo-summary");
    if(!summary)return;
    const cart=read("ryveo-cart-v1",[]);
    if(!cart.length)return;
    const subtotal=cart.reduce((sum,item)=>{const p=catalog.find(x=>x.slug===item.slug);return sum+(p?p.price*(Number(item.qty)||1):0)},0);
    const coupon=localStorage.getItem("ryveo-coupon-v1")||"";
    const discount=coupon==="NEWMEM10"?Math.round(subtotal*.1):0;
    const afterDiscount=subtotal-discount;
    const pct=Math.min(100,Math.round(afterDiscount/1000*100));
    let panel=summary.querySelector(".ryveo-shipping-progress");
    if(!panel){panel=document.createElement("div");panel.className="ryveo-shipping-progress";const title=summary.querySelector(".ryveo-summary-title");if(title)title.insertAdjacentElement("afterend",panel);else summary.prepend(panel);}
    const markup=afterDiscount>=1000?'<p><strong>FREE DELIVERY UNLOCKED.</strong> Your order qualifies for free delivery.</p><div class="ryveo-shipping-track"><span style="width:100%"></span></div>':'<p>You’re <strong>'+money(1000-afterDiscount)+' away</strong> from free delivery.</p><div class="ryveo-shipping-track"><span style="width:'+pct+'%"></span></div>';
    if(panel.innerHTML!==markup)panel.innerHTML=markup;
  }
  function watchDynamicSections(){
    const product=document.getElementById("ryveo-product-page");
    if(product){renderRelated();new MutationObserver(renderRelated).observe(product,{childList:true,subtree:true});}
    const cart=document.getElementById("ryveo-cart-page");
    if(cart){updateShippingProgress();new MutationObserver(updateShippingProgress).observe(cart,{childList:true,subtree:true});}
  }
  document.addEventListener("DOMContentLoaded",function(){
    rememberProduct();renderRecent();watchDynamicSections();
  });
})();