let selectedSize = "";

// DOM READy
document.addEventListener("DOMContentLoaded", () => {
  // CAROUSEL (SLIDER)

  const images = [
    "Images/shirt.jpg",
    "Images/phones.jpg",
    "Images/walld.jpg",
    "Images/wm.jpg",
    "Images/lights.jpg",
  ];

  let index = 0;
  const slider = document.getElementById("sliderImage");

  function updateCarousel() {
    if (slider) slider.src = images[index];
  }

  function nextSlide() {
    index = (index + 1) % images.length;
    updateCarousel();
  }

  function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
  }

  document.querySelector(".next")?.addEventListener("click", nextSlide);
  document.querySelector(".prev")?.addEventListener("click", prevSlide);

  setInterval(nextSlide, 3000);

  // SEARCH FILTER

  const input = document.querySelector(".search input");
  const sections = document.querySelectorAll(".section");

  if (input) {
    input.addEventListener("keyup", () => {
      let val = input.value.toLowerCase();

      sections.forEach((sec) => {
        if (sec.innerText.toLowerCase().includes(val)) {
          sec.style.display = "";
        } else {
          sec.style.display = "none";
        }
      });
    });
  }

  // CART COUNT LOAD
  updateCartCount();

  // SIZE SELECTION (PRODUCT PAGE)
  const sizeOptions = document.querySelectorAll("#sizes span");

  if (sizeOptions.length > 0) {
    sizeOptions.forEach((size) => {
      size.addEventListener("click", () => {
        // remove highlight from all
        sizeOptions.forEach((s) => (s.style.background = ""));

        size.style.background = "#ddd";

        selectedSize = size.innerText;
      });
    });
  }
});

// NAVIGATION FUNCTIONS

// open shoes page
function openShoespage() {
  window.location.href = "shoes.html";
}

// open product details page
function openProduct(id) {
  window.location.href = "product.html?id=" + id;
}

// CART SYSTEM

// update cart count in navbar
function updateCartCount() {
  const cartDisplay = document.querySelector(".cart");

  if (cartDisplay) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;
    cart.forEach((item) => {
      totalItems += item.quantity || 1;
    });

    cartDisplay.textContent = `Cart (${totalItems})`;
  }
}

// add item to cart
function addToCart() {
  if (!selectedSize) {
    alert("Please select a size first");
    return;
  }

  const item = {
    title: document.getElementById("pTitle")?.innerText,
    price: document.getElementById("pPrice")?.innerText,
    img: document.getElementById("pImage")?.src,
    size: selectedSize,

    quantity: 1,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((cartItem) => {
    return cartItem.title === item.title && cartItem.size === item.size;
  });

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  alert("Added to cart 🛒");
}
