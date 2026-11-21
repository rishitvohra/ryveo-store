const WHATSAPP_NUMBER="917827271703";
const products=[
{name:"Indigo baddie Streetwear Lookbook",price:649,image:"Indigo Adddie Streetwear Lookbook.png",description:"Everyday oversized streetwear",colours:["Denim"],sizes:["S","M","L","XL"],category:"girls",tag:"IT-GIRL FAV"},
{name:"diet joke",price:649,image:"a6432371-2522-4b9e-bc14-d75623ed1c41.jpg",description:"Get it on the front or back — your call",colours:["Black","White"],sizes:["S","M","L","XL"],category:"girls",tag:"MOOD"},
{name:"vodkas are best",price:599,image:"0aff0740-20ed-4c0f-a9c1-b2a85b6d619a.jpg",description:"Minimal fit, maximum vibe",colours:["Black"],sizes:["XS","S","M","L"],category:"girls",tag:"THE VIBE"},
{name:"might be drunk a little",price:619,image:"5ea8b75a-c186-421b-93be-34007164f423.jpg",description:"Are you sure you're seeing it perfectly?",colours:["Black"],sizes:["S","M","L","XL"],category:"girls",tag:"LOWKEY ICONIC"},
{name:"warned by mom",price:699,image:"warned by mom.jpeg",description:"Your Mom Knows Me!",colours:["White"],sizes:["S","M","L","XL"],category:"boys",tag:"RYVEO ORIGINAL"},
{name:"poisoned and venomous now",price:649,image:"venomous1.0.jpg",description:"Snake bite hard!",colours:["White"],sizes:["S","M","L","XL"],category:"boys",tag:"RYVEO ORIGINAL"},
{name:"Deathbed",price:599,image:"deathrow.jpg",description:"Must be cooler!",colours:["Black"],sizes:["S","M","L","XL"],category:"boys",tag:"DARK EDIT"},
{name:"Knights and the Warriors",price:699,image:"warriors.jpg",description:"Warriors of the battlefield",colours:["Black"],sizes:["S","M","L","XL"],category:"boys",tag:"RYVEO ORIGINAL"},
{name:"Pantherious",price:649,image:"black panther.jpg",description:"The panther has something to say",colours:["Black"],sizes:["S","M","L","XL"],category:"boys",tag:"BESTSELLER"},
{name:"Pantherious — White Panther",price:649,image:"white panther.jpg",description:"The panther has something to say",colours:["White"],sizes:["S","M","L","XL"],category:"boys",tag:"RYVEO ORIGINAL"},
{name:"absolut diva",price:699,image:"f86f3dd5-e6bc-43a2-ae7d-e9b7ec0ff237.jpg",description:"Slayy, gurl.",colours:["White"],sizes:["S","M","L","XL"],category:"girls",tag:"GIRL CODE"},
{name:"custom print baby",price:599,image:"image.png",description:"Let your T-shirt speak for you",colours:["Black","White"],sizes:["S","M","L","XL"],category:"boys",tag:"MAKE IT YOURS"},
{name:"Jaat Balwan",price:649,image:"jaat balwan.jpeg",description:"JAI JAAT",colours:["White"],sizes:["S","M","L","XL"],category:"boys",tag:"RYVEO ORIGINAL"},
{name:"Choti Advance",price:609,image:"choti adv.jpeg",description:"For the smokers",colours:["White"],sizes:["S","M","L","XL"],category:"boys",tag:"RYVEO ORIGINAL"}
];
const category=document.body.dataset.collection;
const grid=document.getElementById("collection-grid");
const money=n=>"₹"+n.toLocaleString("en-IN");
function order(p,colour,size,qty){
 const lines=["Hi RYVEO! I'd like to place an order.","","Product: "+p.name,"Price per item: Rs. "+p.price,"Quantity: "+qty,"Total product price: Rs. "+(p.price*qty),"Colour: "+colour,"Size: "+size,"",p.name==="custom print baby"?"I'd like to discuss my custom print idea.":"Please confirm availability and delivery charges."];
 window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(lines.join("\n")),"_blank","noopener,noreferrer");
}
function render(){
 const items=products.filter(p=>p.category===category);
 grid.innerHTML=items.map((p,i)=>'<article class="collection-product"><div class="collection-product-image"><img src="'+encodeURI(p.image)+'" alt="'+p.name+'" loading="'+(i<2?"eager":"lazy")+'"><span class="collection-product-tag">'+p.tag+'</span></div><div class="collection-product-info"><h3>'+p.name+'</h3><p>'+p.description+'</p><div class="collection-product-price">'+money(p.price)+'</div><select class="colour" aria-label="Choose colour">'+p.colours.map(c=>'<option>'+c+'</option>').join("")+'</select><select class="size" aria-label="Choose size">'+p.sizes.map(s=>'<option value="'+s+'">Size: '+s+'</option>').join("")+'</select><select class="qty" aria-label="Choose quantity">'+[1,2,3,4,5].map(n=>'<option value="'+n+'">Quantity: '+n+'</option>').join("")+'</select><button class="collection-order" type="button" data-order="'+i+'">ORDER ON WHATSAPP ↗</button></div></article>').join("");
 grid.querySelectorAll("[data-order]").forEach(btn=>btn.addEventListener("click",()=>{const p=items[Number(btn.dataset.order)],card=btn.closest(".collection-product");order(p,card.querySelector(".colour").value,card.querySelector(".size").value,Number(card.querySelector(".qty").value));}));
}
render();
document.getElementById("year").textContent=new Date().getFullYear();
