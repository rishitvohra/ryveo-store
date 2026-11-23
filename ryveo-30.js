/* RYVEO 3.0 — seven storefront upgrades. Front-end only; WhatsApp remains the order channel. */
(function(){
 "use strict";
 const catalog=window.RYVEO_CATALOG||[];
 const money=n=>"₹"+Number(n||0).toLocaleString("en-IN");
 const clean=s=>String(s||"").toLowerCase().trim();
 const productFor=card=>{
  const img=card&&card.querySelector("img");
  if(!img)return null;
  const src=decodeURIComponent((img.getAttribute("src")||"").split("/").pop().split("?")[0]);
  return catalog.find(p=>p.image===src)||null;
 };
 function addSelect(parent,label,options,cls){
  const wrap=document.createElement("label");wrap.className="rv30-filter";
  const title=document.createElement("span");title.textContent=label;
  const select=document.createElement("select");select.className=cls;select.setAttribute("aria-label",label);
  options.forEach(o=>{const opt=document.createElement("option");opt.value=o.value;opt.textContent=o.label;select.append(opt)});
  wrap.append(title,select);parent.append(wrap);return select;
 }
 function initHomeFilters(){
  const grid=document.getElementById("products"),bar=document.querySelector(".rv-shop-tools");
  if(!grid||!bar||bar.dataset.rv30)return;bar.dataset.rv30="1";
  const size=addSelect(bar,"SIZE",[{value:"",label:"All sizes"},...["XS","S","M","L","XL"].map(x=>({value:x,label:x}))],"rv30-size");
  const colour=addSelect(bar,"COLOUR",[{value:"",label:"All colours"},...["Black","White","Denim"].map(x=>({value:x,label:x}))],"rv30-colour");
  const price=addSelect(bar,"PRICE",[{value:"",label:"Any price"},{value:"under-600",label:"Under ₹600"},{value:"600-649",label:"₹600–₹649"},{value:"650-699",label:"₹650–₹699"},{value:"700-plus",label:"₹700+"}],"rv30-price");
  const search=document.getElementById("rv-product-search"),category=document.getElementById("rv-category-filter"),sort=document.getElementById("rv-sort"),count=document.getElementById("rv-result-count");
  function apply(){
   const cards=[...grid.querySelectorAll(".product")],q=clean(search&&search.value),cat=category&&category.value||"all";
   cards.forEach(card=>{
    const p=productFor(card);if(!p){card.hidden=true;return}
    const matchText=!q||clean([p.name,p.description,p.details,p.tag].join(" ")).includes(q);
    const matchCat=cat==="all"||p.category===cat,matchSize=!size.value||p.sizes.includes(size.value),matchColour=!colour.value||p.colours.includes(colour.value);
    let matchPrice=true;if(price.value==="under-600")matchPrice=p.price<600;else if(price.value==="600-649")matchPrice=p.price>=600&&p.price<=649;else if(price.value==="650-699")matchPrice=p.price>=650&&p.price<=699;else if(price.value==="700-plus")matchPrice=p.price>=700;
    card.hidden=!(matchText&&matchCat&&matchSize&&matchColour&&matchPrice);
   });
   const visible=cards.filter(c=>!c.hidden);
   visible.sort((a,b)=>{const pa=productFor(a),pb=productFor(b);if(!pa||!pb)return 0;switch(sort&&sort.value){case"price-low":return pa.price-pb.price;case"price-high":return pb.price-pa.price;case"name":return pa.name.localeCompare(pb.name);default:return Number(a.dataset.featured||0)-Number(b.dataset.featured||0)}});
   visible.forEach(c=>grid.append(c));if(count)count.textContent=visible.length+" "+(visible.length===1?"piece":"pieces")+" found";
   let empty=grid.parentNode.querySelector(".rv30-empty");if(!visible.length){if(!empty){empty=document.createElement("p");empty.className="rv30-empty";empty.textContent="NO MATCHES. TRY ANOTHER FILTER.";grid.insertAdjacentElement("afterend",empty)}}else if(empty)empty.remove();
  }
  [search,category,sort,size,colour,price].filter(Boolean).forEach(el=>el.addEventListener(el===search?"input":"change",apply));
  apply();
 }
 function initCollectionFilters(){
  const grid=document.getElementById("collection-grid"),bar=grid&&grid.parentElement.querySelector(".ryveo-tools");
  if(!grid||!bar||bar.dataset.rv30)return;bar.dataset.rv30="1";
  const colour=addSelect(bar,"COLOUR",[{value:"",label:"All colours"},...["Black","White","Denim"].map(x=>({value:x,label:x}))],"rv30-colour");
  const price=addSelect(bar,"PRICE",[{value:"",label:"Any price"},{value:"under-600",label:"Under ₹600"},{value:"600-649",label:"₹600–₹649"},{value:"650-699",label:"₹650–₹699"},{value:"700-plus",label:"₹700+"}],"rv30-price");
  const oldSearch=bar.querySelector('input[type="search"]'),oldSize=bar.querySelectorAll("select")[0],sort=bar.querySelectorAll("select")[1];
  const count=document.createElement("p");count.className="rv30-count";count.setAttribute("aria-live","polite");bar.append(count);
  function apply(){
   const cards=[...grid.querySelectorAll(".collection-product")],q=clean(oldSearch&&oldSearch.value);
   cards.forEach(card=>{const p=productFor(card);if(!p){card.hidden=true;return}
    const textOk=!q||clean([p.name,p.description,p.details,p.tag].join(" ")).includes(q);
    const sizeOk=!oldSize||!oldSize.value||p.sizes.includes(oldSize.value);
    const colourOk=!colour.value||p.colours.includes(colour.value);
    let priceOk=true;if(price.value==="under-600")priceOk=p.price<600;else if(price.value==="600-649")priceOk=p.price>=600&&p.price<=649;else if(price.value==="650-699")priceOk=p.price>=650&&p.price<=699;else if(price.value==="700-plus")priceOk=p.price>=700;
    card.hidden=!(textOk&&sizeOk&&colourOk&&priceOk);
   });
   const visible=cards.filter(c=>!c.hidden);visible.sort((a,b)=>{const pa=productFor(a),pb=productFor(b);if(!pa||!pb)return 0;if(sort&&sort.value==="low")return pa.price-pb.price;if(sort&&sort.value==="high")return pb.price-pa.price;if(sort&&sort.value==="az")return pa.name.localeCompare(pb.name);return 0});
   visible.forEach(c=>grid.append(c));count.textContent=visible.length+" / "+cards.length+" PIECES";
   let empty=grid.parentNode.querySelector(".rv30-empty");if(!visible.length){if(!empty){empty=document.createElement("p");empty.className="rv30-empty";empty.textContent="NO MATCHES. CLEAR A FILTER TO SEE MORE.";grid.insertAdjacentElement("afterend",empty)}}else if(empty)empty.remove();
  }
  [oldSearch,oldSize,sort,colour,price].filter(Boolean).forEach(el=>el.addEventListener(el===oldSearch?"input":"change",apply));apply();
 }
 function trustSection(){
  const main=document.querySelector("body[data-collection] main");if(!main||main.querySelector(".rv30-trust"))return;
  const section=document.createElement("section");section.className="rv30-trust";
  section.innerHTML='<div class="rv30-trust-head"><span>THE DETAILS THAT MATTER</span><h2>SHOP WITH <em>CLARITY.</em></h2><p>No guesswork. Ask us before you lock in your fit.</p></div><div class="rv30-trust-grid"><article><b>01 / FIT CHECK</b><h3>Know your size.</h3><p>Need exact garment measurements or fit advice? We will confirm the details for your selected tee on WhatsApp.</p><a href="https://wa.me/917827271703?text=Hi%20RYVEO!%20Please%20share%20the%20size%20measurements%20and%20fit%20details." target="_blank" rel="noopener">ASK ABOUT SIZING ↗</a></article><article><b>02 / DELIVERY</b><h3>Across India.</h3><p>Delivery charges and estimated timeline are confirmed with you before your order is accepted.</p><a href="https://wa.me/917827271703?text=Hi%20RYVEO!%20Please%20confirm%20delivery%20charges%20and%20estimated%20timeline." target="_blank" rel="noopener">CHECK DELIVERY ↗</a></article><article><b>03 / ORDER SUPPORT</b><h3>Real conversation.</h3><p>Orders are confirmed directly with RYVEO on WhatsApp. Ask about fabric, care, availability and return or exchange eligibility before ordering.</p><a href="https://wa.me/917827271703" target="_blank" rel="noopener">CHAT WITH RYVEO ↗</a></article></div><div class="rv30-social"><span>THE RYVEO COMMUNITY</span><p>See the latest brand visuals and updates on Instagram.</p><a href="https://www.instagram.com/ryveo.in/" target="_blank" rel="noopener">FOLLOW @RYVEO.IN ↗</a></div>';
  const custom=main.querySelector(".collection-custom,.girls-mantra");(custom||main.lastElementChild).insertAdjacentElement("beforebegin",section);
 }
 function productInfo(){
  const root=document.getElementById("ryveo-product-page"),layout=root&&root.querySelector(".ryveo-product-layout");if(!layout||root.dataset.rv30Info)return;root.dataset.rv30Info="1";
  const copy=layout.querySelector(".ryveo-product-copy");if(!copy)return;
  const note=document.createElement("section");note.className="rv30-product-details";
  note.innerHTML='<span>RYVEO / PRODUCT NOTES</span><h2>BEFORE YOU <em>BUY.</em></h2><div class="rv30-detail-grid"><article><b>FIT & MEASUREMENTS</b><p>Oversized streetwear direction. Exact chest, length and shoulder measurements are confirmed on request—no guessed size chart.</p><a href="https://wa.me/917827271703?text=Hi%20RYVEO!%20Please%20share%20exact%20measurements%20for%20this%20tee." target="_blank" rel="noopener">GET SIZE DETAILS ↗</a></article><article><b>FABRIC & CARE</b><p>Ask us to confirm fabric composition, GSM and wash-care details for this specific product before ordering.</p><a href="https://wa.me/917827271703?text=Hi%20RYVEO!%20Please%20share%20fabric%2C%20GSM%20and%20wash-care%20details." target="_blank" rel="noopener">ASK ABOUT FABRIC ↗</a></article><article><b>DELIVERY & EXCHANGES</b><p>Delivery estimate, shipping charge and return or exchange eligibility are confirmed on WhatsApp before the order is accepted.</p><a href="https://wa.me/917827271703" target="_blank" rel="noopener">CONFIRM BEFORE ORDER ↗</a></article></div>';
  layout.insertAdjacentElement("afterend",note);
 }
 function customStudio(){
  const form=document.getElementById("ryveo-custom-form"),stage=document.getElementById("rv-custom-tee-stage");if(!form||!stage||stage.dataset.rv30)return;stage.dataset.rv30="1";
  const file=form.querySelector('input[type="file"]');if(!file)return;
  let art=stage.querySelector(".rv30-art-preview");if(!art){art=document.createElement("img");art.className="rv30-art-preview";art.alt="Uploaded design over the illustrative tee preview";stage.append(art)}
  file.addEventListener("change",()=>{const f=file.files&&file.files[0];if(!f){art.removeAttribute("src");art.hidden=true;return}if(!f.type.startsWith("image/")||f.size>8*1024*1024)return;const url=URL.createObjectURL(f);art.src=url;art.hidden=false;});
  const title=document.createElement("p");title.className="rv30-preview-note";title.textContent="Your uploaded artwork is layered onto the concept preview. Final print scale and placement are confirmed by RYVEO.";stage.insertAdjacentElement("afterend",title);
 }
 function checkoutSteps(){
  const form=document.getElementById("ryveo-checkout-form");if(!form||form.querySelector(".rv30-checkout-steps"))return;
  const steps=document.createElement("div");steps.className="rv30-checkout-steps";steps.innerHTML='<span class="is-active"><b>01</b> YOUR BAG</span><i></i><span class="is-active"><b>02</b> DELIVERY DETAILS</span><i></i><span><b>03</b> WHATSAPP CONFIRMATION</span>';
  form.insertAdjacentElement("beforebegin",steps);
 }
 function fasterLoader(){
  const loader=document.getElementById("site-loader");if(!loader)return;
  let done=false;const finish=()=>{if(done)return;done=true;loader.classList.add("is-done");loader.setAttribute("aria-hidden","true");document.body.classList.remove("site-loading")};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(finish,180),{once:true});else setTimeout(finish,180);
  setTimeout(finish,1000);
 }
 document.addEventListener("DOMContentLoaded",()=>{
  initHomeFilters();initCollectionFilters();trustSection();productInfo();customStudio();checkoutSteps();fasterLoader();
 });
})();