const WHATSAPP_NUMBER="917827271703";
const products=window.RYVEO_CATALOG;
const category=document.body.dataset.collection;
const grid=document.getElementById("collection-grid");
const money=n=>"₹"+n.toLocaleString("en-IN");
function order(p,colour,size,qty){
 const lines=["Hi RYVEO! I'd like to place an order.","","Product: "+p.name,"Price per item: Rs. "+p.price,"Quantity: "+qty,"Total product price: Rs. "+(p.price*qty),"Colour: "+colour,"Size: "+size,"",p.slug==="custom-print-baby"?"I'd like to discuss my custom print idea.":"Please confirm availability and delivery charges."];
 window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");
}
function render(){
 const items=products.filter(p=>p.category===category);
 grid.innerHTML=items.map((p,i)=>'<article class="collection-product"><div class="collection-product-image"><img src="'+encodeURI(p.image)+'" alt="'+p.name+'" loading="'+(i<2?"eager":"lazy")+'"><span class="collection-product-tag">'+p.tag+'</span></div><div class="collection-product-info"><h3>'+p.name+'</h3><p>'+p.description+'</p><div class="collection-product-price">'+money(p.price)+'</div><select class="colour" aria-label="Choose colour">'+p.colours.map(c=>'<option>'+c+'</option>').join("")+'</select><select class="size" aria-label="Choose size">'+p.sizes.map(s=>'<option value="'+s+'">Size: '+s+'</option>').join("")+'</select><select class="qty" aria-label="Choose quantity">'+[1,2,3,4,5].map(n=>'<option value="'+n+'">Quantity: '+n+'</option>').join("")+'</select><button class="collection-order" type="button" data-order="'+i+'">ORDER ON WHATSAPP ↗</button></div></article>').join("");
 grid.querySelectorAll("[data-order]").forEach(btn=>btn.addEventListener("click",()=>{const p=items[Number(btn.dataset.order)],card=btn.closest(".collection-product");order(p,card.querySelector(".colour").value,card.querySelector(".size").value,Number(card.querySelector(".qty").value));}));
}
render();
document.getElementById("year").textContent=new Date().getFullYear();


/* Smooth navigation between RYVEO collection pages */
(function(){
  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion)return;
  document.addEventListener("click",function(event){
    const link=event.target.closest("a");
    if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    if(link.target==="_blank"||link.hasAttribute("download"))return;
    const url=new URL(link.href,window.location.href);
    if(url.origin!==window.location.origin||url.pathname===window.location.pathname&&url.hash)return;
    if(!/\.html?$/i.test(url.pathname))return;
    event.preventDefault();
    document.body.classList.add("ryveo-page-leaving");
    window.setTimeout(function(){window.location.href=url.href;},190);
  });
})();
