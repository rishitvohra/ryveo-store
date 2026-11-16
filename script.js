"use strict";

// WhatsApp number: country code + 10-digit number.
const WHATSAPP_NUMBER = "917827271703";

const products = [
  {
    name: "Indigo baddie Streetwear Lookbook",
    price: 649,
    image: "Indigo Adddie Streetwear Lookbook.png",
    description: "Everyday oversized streetwear",
    colours: ["Denim"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "diet joke",
    price: 649,
    image: "a6432371-2522-4b9e-bc14-d75623ed1c41.jpg",
    description: "Get it on the front or back — your call",
    colours: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "vodkas are best",
    price: 599,
    image: "0aff0740-20ed-4c0f-a9c1-b2a85b6d619a.jpg",
    description: "Minimal fit, maximum vibe",
    colours: ["Black"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    name: "might be drunk a little",
    price: 619,
    image: "5ea8b75a-c186-421b-93be-34007164f423.jpg",
    description: "Are you sure you're seeing it perfectly?",
    colours: ["Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "warned by mom",
    price: 699,
    image: "warned by mom.jpeg",
    description: "Your Mom Knows Me!",
    colours: ["White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "poisoned and venomous now",
    price: 649,
    image: "venomous1.0.jpg",
    description: "Snake bite hard!",
    colours: ["White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Deathbed",
    price: 599,
    image: "deathrow.jpg",
    description: "Must be cooler!",
    colours: ["Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Knights and the Warriors",
    price: 699,
    image: "warriors.jpg",
    description: "Warriors of the battlefield",
    colours: ["Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Pantherious",
    price: 649,
    image: "black panther.jpg",
    description: "The panther has something to say",
    colours: ["Black"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Pantherious — White Panther",
    price: 649,
    image: "white panther.jpg",
    description: "The panther has something to say",
    colours: ["White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "absolut diva",
    price: 699,
    image: "f86f3dd5-e6bc-43a2-ae7d-e9b7ec0ff237.jpg",
    description: "Slayy, gurl.",
    colours: ["White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "custom print baby",
    price: 599,
    image: "image.png",
    description: "Let your T-shirt speak for you",
    colours: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Jaat Balwan",
    price: 649,
    image: "jaat balwan.jpeg",
    description: "JAI JAAT",
    colours: ["White"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    name: "Choti Advance",
    price: 609,
    image: "choti adv.jpeg",
    description: "For the smokers",
    colours: ["White"],
    sizes: ["S", "M", "L", "XL"]
  }
];

// Boys and Girls categories
const boysNames = new Set([
  "warned by mom",
  "custom print baby",
  "poisoned and venomous now",
  "Deathbed",
  "Knights and the Warriors",
  "Pantherious",
  "Pantherious — White Panther",
  "Jaat Balwan",
  "Choti Advance"
]);

products.forEach(product => {
  product.category = boysNames.has(product.name)
    ? "boys"
    : "girls";
});

let activeProduct = null;


// Create dropdowns
function makeSelect(options, ariaLabel, prefix = "") {
  const select = document.createElement("select");

  select.setAttribute("aria-label", ariaLabel);

  options.forEach(value => {
    select.add(new Option(prefix + value, value));
  });

  return select;
}


// WhatsApp order function
function sendOrder(product, colour, size, quantity) {

  if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {
    alert("Please check the WhatsApp number in js/script.js.");
    return;
  }

  const qty = Number(quantity);
  const total = product.price * qty;

  const message = [
    "Hi Ryveo! I'd like to place an order.",
    "",
    "Product: " + product.name,
    "Price per item: Rs. " + product.price,
    "Quantity: " + qty,
    "Total product price: Rs. " + total,
    "Colour: " + colour,
    "Size: " + size,
    "",
    "Please confirm availability and delivery charges."
  ].join("\n");

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}


// Open product quick view
function openProduct(product) {

  activeProduct = product;

  const modal = document.getElementById("product-modal");

  document.getElementById("modal-image").src = product.image;
  document.getElementById("modal-image").alt = product.name;

  document.getElementById("modal-title").textContent =
    product.name;

  document.getElementById("modal-description").textContent =
    product.description;

  document.getElementById("modal-price").textContent =
    "₹" + product.price;

  const colour = document.getElementById("modal-colour");
  const size = document.getElementById("modal-size");
  const quantity = document.getElementById("modal-quantity");

  colour.replaceChildren();
  size.replaceChildren();
  quantity.replaceChildren();

  product.colours.forEach(value => {
    colour.add(new Option(value, value));
  });

  product.sizes.forEach(value => {
    size.add(new Option("Size: " + value, value));
  });

  for (let n = 1; n <= 5; n++) {
    quantity.add(new Option("Quantity: " + n, String(n)));
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  document.getElementById("modal-close").focus();
}


// Close product quick view
function closeProduct() {

  const modal = document.getElementById("product-modal");

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  activeProduct = null;
}


// Create product cards
function createProductCard(product, index) {

  const card = document.createElement("article");
  card.className = "product";

  const imageWrap = document.createElement("div");
  imageWrap.className = "image-wrap";

  imageWrap.addEventListener("click", () => {
    openProduct(product);
  });

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.name;
  image.loading = index < 4 ? "eager" : "lazy";

  image.onerror = () => {

    image.style.display = "none";

    imageWrap.classList.add("image-missing");

    const fallback = document.createElement("span");

    fallback.className = "image-fallback";

    fallback.textContent =
      "Image not found: " + product.image;

    imageWrap.append(fallback);
  };


  const tag = document.createElement("span");
  tag.className = "product-tag";

  tag.textContent =
    product.name === "custom print baby"
      ? "Make it yours"
      : index === 0
        ? "Featured"
        : "Ryveo original";


  const hint = document.createElement("span");
  hint.className = "view-hint";
  hint.textContent = "Tap to view ↗";

  imageWrap.append(image, tag, hint);


  const info = document.createElement("div");
  info.className = "product-info";


  const title = document.createElement("h3");
  title.textContent = product.name;

  title.addEventListener("click", () => {
    openProduct(product);
  });


  const description = document.createElement("p");
  description.textContent = product.description;


  const priceRow = document.createElement("div");
  priceRow.className = "price-row";


  const price = document.createElement("strong");
  price.className = "price";
  price.textContent = "₹" + product.price;


  const priceLabel = document.createElement("span");
  priceLabel.className = "price-label";
  priceLabel.textContent = "PRODUCT PRICE";

  priceRow.append(price, priceLabel);


  const colour = makeSelect(
    product.colours,
    "Choose colour for " + product.name
  );

  const size = makeSelect(
    product.sizes,
    "Choose size for " + product.name,
    "Size: "
  );

  const quantity = makeSelect(
    ["1", "2", "3", "4", "5"],
    "Choose quantity for " + product.name,
    "Quantity: "
  );


  const order = document.createElement("button");

  order.type = "button";
  order.className = "order";
  order.textContent = "ORDER ON WHATSAPP ↗";

  order.addEventListener("click", () => {
    sendOrder(
      product,
      colour.value,
      size.value,
      quantity.value
    );
  });


  info.append(
    title,
    description,
    priceRow,
    colour,
    size,
    quantity,
    order
  );

  card.append(imageWrap, info);

  return card;
}


// Render all products
function renderProducts() {

  const allGrid = document.getElementById("products");
  const boysGrid = document.getElementById("boys-products");
  const girlsGrid = document.getElementById("girls-products");

  if (!allGrid || !boysGrid || !girlsGrid) {

    console.error(
      "Ryveo: one or more product grid containers are missing from index.html."
    );

    return;
  }

  allGrid.replaceChildren();
  boysGrid.replaceChildren();
  girlsGrid.replaceChildren();

  products.forEach((product, index) => {

    allGrid.append(
      createProductCard(product, index)
    );

    const categoryCard = createProductCard(product, index);

    if (product.category === "boys") {
      boysGrid.append(categoryCard);
    } else {
      girlsGrid.append(categoryCard);
    }

  });
}


// Website initialization
document.addEventListener("DOMContentLoaded", () => {

  renderProducts();


  // Close button
  document
    .getElementById("modal-close")
    .addEventListener("click", closeProduct);


  // Click outside modal to close
  document
    .getElementById("product-modal")
    .addEventListener("click", event => {

      if (event.target.id === "product-modal") {
        closeProduct();
      }

    });


  // Escape key closes modal
  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeProduct();
    }

  });


  // Modal WhatsApp order
  document
    .getElementById("modal-order")
    .addEventListener("click", () => {

      if (!activeProduct) return;

      sendOrder(
        activeProduct,
        document.getElementById("modal-colour").value,
        document.getElementById("modal-size").value,
        document.getElementById("modal-quantity").value
      );

    });

});
