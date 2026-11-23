/* RYVEO Phase 3 — hybrid editorial shopping experience.
   Client-side enhancements only. Existing WhatsApp order and localStorage cart remain unchanged. */
(function(){
 "use strict";
 const catalog=window.RYVEO_CATALOG||[];
 const money=n=>"₹"+Number(n||0).toLocaleString("en-IN");
 const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const bySlug=s=>catalog.find(p=>p.slug===s);
 function initVibeFinder(){
  const button=document.getElementById("rv-vibe-submit"),result=document.getElementById("rv-vibe-result");
  if(!button||!result)return;
  button.addEventListener("click",()=>{
   const mood=document.getElementById("rv-vibe-mood").value,category=document.getElementById("rv-vibe-category").value;
   let pool=catalog.filter(p=>category==="all"||p.category===category);
   if(mood==="custom")pool=pool.filter(p=>/custom|make it yours/i.test(p.name+" "+p.tag+" "+p.description));
   else if(mood==="playful")pool=pool.filter(p=>p.category==="girls"||/tipsy|punchline|diva|choti|mom said/i.test(p.name+" "+p.description));
   else if(mood==="bold")pool=pool.filter(p=>p.category==="boys"||/venom|panther|kingdom|jaat|rebels|flex/i.test(p.name+" "+p.description));
   if(!pool.length)pool=catalog.filter(p=>category==="all"||p.category===category);
   const picks=pool.slice(0,3);
   result.innerHTML='<div class="rv-vibe-result-heading"><span>YOUR RYVEO MATCH</span><b>'+picks.length+' PICKS / '+(mood==="any"?"NO RULES":mood.toUpperCase())+'</b></div><div class="rv-vibe-picks">'+picks.map(p=>'<a class="rv-vibe-pick" href="product.html?item='+encodeURIComponent(p.slug)+'"><img src="'+encodeURI(p.image)+'" alt="'+esc(p.name)+'" loading="lazy"><span><strong>'+esc(p.name)+'</strong><small>'+money(p.price)+' · VIEW PIECE ↗</small></span></a>').join("")+'</div>';
  });
 }
 function initProductEnhancements(){
  const root=document.getElementById("ryveo-product-page");if(!root||root.dataset.phase3Ready)return;
  const enhance=()=>{
   const layout=root.querySelector(".ryveo-product-layout");if(!layout||root.dataset.phase3Ready)return;
   root.dataset.phase3Ready="1";
   const photo=layout.querySelector(".ryveo-product-photo"),copy=layout.querySelector(".ryveo-product-copy"),add=document.getElementById("pd-add");
   if(photo){
    photo.classList.add("rv-product-zoomable");photo.setAttribute("tabindex","0");photo.setAttribute("role","button");photo.setAttribute("aria-label","Open product image zoom");
    const open=()=>{const overlay=document.createElement("div");overlay.className="rv-image-lightbox";overlay.innerHTML='<button type="button" aria-label="Close image">×</button><img src="'+photo.src+'" alt="'+esc(photo.alt)+'">';document.body.append(overlay);const close=()=>overlay.remove();overlay.querySelector("button").addEventListener("click",close);overlay.addEventListener("click",e=>{if(e.target===overlay)close()});const onKey=e=>{if(e.key==="Escape"){close();document.removeEventListener("keydown",onKey)}};document.addEventListener("keydown",onKey)};
    photo.addEventListener("click",open);photo.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open()}});
   }
   if(copy){
    const tools=document.createElement("div");tools.className="rv-product-tools";
    const share=document.createElement("button");share.type="button";share.textContent="↗ SHARE THIS PIECE";
    share.addEventListener("click",async()=>{const data={title:document.title,text:"Check out "+(copy.querySelector("h1")?.textContent||"this RYVEO piece"),url:location.href};try{if(navigator.share)await navigator.share(data);else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);share.textContent="LINK COPIED ✓";setTimeout(()=>share.textContent="↗ SHARE THIS PIECE",1800)}}catch(e){}});
    const guide=document.createElement("a");guide.href="#rv-fit-note";guide.textContent="SIZE & FIT NOTES ↓";tools.append(share,guide);copy.insertBefore(tools,copy.querySelector(".ryveo-info-grid")||copy.lastChild);
    const note=document.createElement("div");note.id="rv-fit-note";note.className="rv-fit-note";note.innerHTML='<strong>FIT & CARE / BEFORE YOU ORDER</strong><p>Designed around an oversized streetwear look. Choose the size that suits your preferred fit. Exact garment measurements, fabric composition and wash-care instructions should be confirmed with RYVEO before ordering.</p><a href="https://wa.me/917827271703?text='+encodeURIComponent("Hi RYVEO! Please share the exact size measurements and fabric/care details for this product.")+'" target="_blank" rel="noopener noreferrer">ASK RYVEO FOR MEASUREMENTS ↗</a>';
    const oldGuide=copy.querySelector(".ryveo-info-grid");if(oldGuide)oldGuide.insertAdjacentElement("afterend",note);else copy.append(note);
   }
   if(add&&!document.querySelector(".rv-mobile-buybar")){
    const sticky=document.createElement("div");sticky.className="rv-mobile-buybar";sticky.innerHTML='<span>READY WHEN YOU ARE</span><button type="button">ADD TO CART · '+(copy?.querySelector(".ryveo-price")?.textContent||"")+'</button>';sticky.querySelector("button").addEventListener("click",()=>add.click());document.body.append(sticky);
    const show=()=>sticky.classList.toggle("is-visible",window.scrollY>320);window.addEventListener("scroll",show,{passive:true});show();
   }
  };
  enhance();
  const observer=new MutationObserver(enhance);observer.observe(root,{childList:true,subtree:true});
 } function initCustomPreview(){
  const form=document.getElementById("ryveo-custom-form"),stage=document.getElementById("rv-custom-tee-stage");if(!form||!stage)return;
  const textInput=form.querySelector('[name="idea"]'),colour=form.querySelector('[name="colour"]'),placement=form.querySelector('[name="placement"]'),preview=document.getElementById("rv-custom-preview-text"),shape=document.getElementById("rv-shirt-shape");
  function update(){const value=(textInput?.value||"").trim();preview.textContent=(value||"YOUR IDEA").slice(0,30).toUpperCase();preview.setAttribute("font-size",preview.textContent.length>18?"12":preview.textContent.length>12?"15":"18");const isWhite=colour?.value==="White";shape.setAttribute("fill",isWhite?"#eeeae2":"url(#rv-shirt-shade)");shape.setAttribute("stroke",isWhite?"#b8b3aa":"#77796b");preview.setAttribute("fill",isWhite?"#20211d":"#f5f4ec");stage.dataset.placement=placement?.value||"Front";stage.classList.toggle("is-back",placement?.value==="Back");stage.classList.toggle("is-both",placement?.value==="Front and back");}
  [textInput,colour,placement].filter(Boolean).forEach(el=>el.addEventListener("input",update));[colour,placement].filter(Boolean).forEach(el=>el.addEventListener("change",update));update();
  const submit=form.querySelector('[type="submit"]');if(submit)submit.addEventListener("click",()=>{if(textInput&&textInput.value.trim())textInput.value=textInput.value.trim()});
 }
 function initCartRecommendations(){
  const root=document.getElementById("ryveo-cart-page");if(!root||root.dataset.phase3Observer)return;root.dataset.phase3Observer="1";
  const render=()=>{if(!root.querySelector(".ryveo-cart-row")||root.querySelector(".rv-cart-discover"))return;let cart=[];try{cart=JSON.parse(localStorage.getItem("ryveo-cart-v1")||"[]")}catch(e){}const used=new Set(cart.map(x=>x.slug));const first=cart.map(x=>bySlug(x.slug)).find(Boolean);const picks=catalog.filter(p=>!used.has(p.slug)&&(!first||p.category===first.category)).slice(0,3);if(!picks.length)return;const section=document.createElement("section");section.className="rv-cart-discover";section.innerHTML='<span class="kicker">KEEP THE ROTATION GOING</span><h2>COMPLETE YOUR EDIT.</h2><div>'+picks.map(p=>'<a href="product.html?item='+encodeURIComponent(p.slug)+'"><img src="'+encodeURI(p.image)+'" alt="'+esc(p.name)+'" loading="lazy"><strong>'+esc(p.name)+'</strong><small>'+money(p.price)+' · VIEW ↗</small></a>').join("")+'</div>';root.append(section)};
  new MutationObserver(render).observe(root,{childList:true,subtree:true});render();
 }
 document.addEventListener("DOMContentLoaded",()=>{initVibeFinder();initProductEnhancements();initCustomPreview();initCartRecommendations()});
})();