
"use strict";

/* =====================================
   RYVEO WEBSITE CONFIGURATION
===================================== */

// WhatsApp number with India country code
const WHATSAPP_NUMBER = "917827271703";

const INSTAGRAM_URL = "https://www.instagram.com/ryveo.in/";


/* =====================================
   PRODUCT DATABASE
===================================== */

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


/* =====================================
   PRODUCT CATEGORIES
===================================== */

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


/* =====================================
   HELPER FUNCTIONS
===================================== */

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createSelect(options, ariaLabel, prefix = "") {
  const select = document.createElement("select");

  select.setAttribute("aria-label", ariaLabel);

  options.forEach(option => {
    select.add(
      new Option(prefix + option, option)
    );
  });

  return select;
}

function createQuantitySelect() {
  const select = document.createElement("select");

  select.setAttribute("aria-label", "Select quantity");

  for (let i = 1; i <= 5; i++) {
    select.add(
      new Option("Quantity: " + i, String(i))
    );
  }

  return select;
}


/* =====================================
   PRODUCT CARD
===================================== */

function createProductCard(product, index) {

  const card = createElement("article", "product");

  // IMAGE
  const imageWrap = createElement("div", "image-wrap");

  const image = document.createElement("img");

  image.src = product.image;
  image.alt = product.name;
  image.loading = index < 4 ? "eager" : "lazy";

  image.onerror = function () {
    this.style.display = "none";

    const error = createElement(
      "div",
      "",
      "Image missing: " + product.image
    );

    error.style.cssText =
      "padding:20px;color:#aaa;text-align:center;font-size:12px";

    imageWrap.append(error);
  };

  const tag = createElement(
    "span",
    "product-tag",
    product.name === "custom print baby"
      ? "Make it yours"
      : index === 0
        ? "Featured"
        : "Ryveo original"
  );

  const hint = createElement(
    "span",
    "view-hint",
    "Tap to view ↗"
  );

  imageWrap.append(image, tag, hint);

  imageWrap.addEventListener("click", () => {
    openProduct(product);
  });


  // PRODUCT INFORMATION
  const info = createElement("div", "product-info");

  const title = createElement(
    "h3",
    "",
    product.name
  );

  title.addEventListener("click", () => {
    openProduct(product);
  });

  const description = createElement(
    "p",
    "",
    product.description
  );


  // PRICE
  const priceRow = createElement("div", "price-row");

  const price = createElement(
    "div",
    "price",
    "₹" + product.price
  );

  const priceLabel = createElement(
    "span",
    "",
    "PRODUCT PRICE"
  );

  priceLabel.style.cssText =
    "font-size:9px;color:#aaa99d;letter-spacing:1px";

  priceRow.append(price, priceLabel);


  // OPTIONS
  const colour = createSelect(
    product.colours,
    "Choose colour for " + product.name
  );

  const size = createSelect(
    product.sizes,
    "Choose size for " + product.name,
    "Size: "
  );

  const quantity = createQuantitySelect();


  // ORDER BUTTON
  const button = createElement(
    "button",
    "order",
    "ORDER ON WHATSAPP ↗"
  );

  button.type = "button";

  button.addEventListener("click", () => {
    sendOrder(
      product,
      colour.value,
      size.value,
      Number(quantity.value)
    );
  });


  // FINAL CARD
  info.append(
    title,
    description,
    priceRow,
    colour,
    size,
    quantity,
    button
  );

  card.append(imageWrap, info);

  return card;
}


/* =====================================
   RENDER PRODUCTS
===================================== */

function renderProducts() {

  const allContainer = document.getElementById("products");
  const boysContainer = document.getElementById("boys-products");
  const girlsContainer = document.getElementById("girls-products");

  if (!allContainer || !boysContainer || !girlsContainer) {
    console.error("Ryveo product containers are missing.");
    return;
  }

  allContainer.replaceChildren();
  boysContainer.replaceChildren();
  girlsContainer.replaceChildren();

  products.forEach((product, index) => {

    // All products
    allContainer.appendChild(
      createProductCard(product, index)
    );

    // Boys collection
    if (product.category === "boys") {
      boysContainer.appendChild(
        createProductCard(product, index)
      );
    }

    // Girls collection
    if (product.category === "girls") {
      girlsContainer.appendChild(
        createProductCard(product, index)
      );
    }

  });
}


/* =====================================
   WHATSAPP ORDER SYSTEM
===================================== */

function sendOrder(product, colour, size, quantity) {

  if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {
    alert("Please check your Ryveo WhatsApp number.");
    return;
  }

  if (!colour || !size || quantity < 1) {
    alert("Please select all product options.");
    return;
  }

  const total = product.price * quantity;

  const message = [
    "Hi Ryveo! I'd like to place an order.",
    "",
    "Product: " + product.name,
    "Price per item: Rs. " + product.price,
    "Quantity: " + quantity,
    "Total product price: Rs. " + total,
    "Colour: " + colour,
    "Size: " + size,
    "",
    "Please confirm availability and delivery charges.",
    "",
    "Thank you!"
  ].join("\n");

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =====================================
   PRODUCT QUICK VIEW MODAL
===================================== */

const modal = document.getElementById("product-modal");

const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");

const modalColour = document.getElementById("modal-colour");
const modalSize = document.getElementById("modal-size");
const modalQuantity = document.getElementById("modal-quantity");

const closeButton = document.getElementById("modal-close");
const orderButton = document.getElementById("modal-order");

let activeProduct = null;


function openProduct(product) {

  if (!modal) return;

  activeProduct = product;

  modalImage.src = product.image;
  modalImage.alt = product.name;

  modalTitle.textContent = product.name;

  modalDescription.textContent = product.description;

  modalPrice.textContent = "₹" + product.price;

  // Colour options
  modalColour.replaceChildren();

  product.colours.forEach(colour => {
    modalColour.add(
      new Option(colour, colour)
    );
  });

  // Size options
  modalSize.replaceChildren();

  product.sizes.forEach(size => {
    modalSize.add(
      new Option("Size: " + size, size)
    );
  });

  // Quantity options
  modalQuantity.replaceChildren();

  for (let i = 1; i <= 5; i++) {
    modalQuantity.add(
      new Option("Quantity: " + i, String(i))
    );
  }

  modal.classList.add("open");

  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  closeButton.focus();
}


function closeProduct() {

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  activeProduct = null;
}


/* =====================================
   MODAL EVENTS
===================================== */

if (closeButton) {
  closeButton.addEventListener("click", closeProduct);
}

if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeProduct();
    }

  });

}

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeProduct();
  }

});

if (orderButton) {

  orderButton.addEventListener("click", () => {

    if (!activeProduct) return;

    sendOrder(
      activeProduct,
      modalColour.value,
      modalSize.value,
      Number(modalQuantity.value)
    );

  });

}


/* =====================================
   WEBSITE INITIALIZATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  renderProducts();

  console.log("RYVEO website successfully initialized.");

});
