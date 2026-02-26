// ======================================
// DOM Elements
// ======================================
const productgrid = document.getElementById("product-grid");
const categorySelect = document.getElementById("categorySelect");

// ======================================
// Render Products (Reusable)
// ======================================
function renderProducts(products) {
  productgrid.innerHTML = "";

  if (!products || products.length === 0) {
    productgrid.innerHTML = "<p style='text-align:center;color:#c46f8e'>No products found</p>";
    return;
  }

  products.forEach(product => {
    const productcard = document.createElement("div");
    productcard.classList.add("productcard");

    productcard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
      </div>
      <div class="product-description">
        <div class="product-image2">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-text">
          <p>${product.description}</p>
        </div>
        <div class="bottom">
          <p class="price">₹${product.price}</p>
          <a onclick="viewProduct('${product._id}')" class="buy-instagram">View Details</a>
        </div>
      </div>
    `;

    productgrid.appendChild(productcard);
  });
}

// ======================================
// Fetch Homepage Products
// ======================================
function viewProduct(id) {

  window.location.href = `./prods.html?id=${id}`;
}

async function getProducts() {
  try {
    const res = await fetch("http://localhost:3000/routes/allProd");
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error("Couldn't fetch homepage products:", err);
  }
}

// ======================================
// Fetch Categories and Populate Dropdown
// ======================================
async function getCategories() {
  try {
    const res = await fetch("http://localhost:3000/routes/allCategories");
    const categories = await res.json();

    // Clear dropdown first
    categorySelect.innerHTML = `<option value="all">All Products</option>;`

    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.name;
      option.textContent = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
      categorySelect.appendChild(option);
    });
  } catch (err) {
    console.error("Couldn't fetch categories:", err);
  }
}

// ======================================
// Fetch Products by Category Tag
// ======================================
async function getProductsByTag(tag) {
  try {
    const res = await fetch("http://localhost:3000/routes/categories", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: tag })
    });
    const products = await res.json();
    renderProducts(products);
  } catch (err) {
    console.error(`Couldn't fetch products for category "${tag}":`, err);
  }
}

// ======================================
// Slider Logic
// ======================================
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('.right-arrow');
const prev = document.querySelector('.left-arrow');

let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  document.querySelector('.slides').style.transform = `translateX(-${index * 100}%)`;
}

if (next && prev) {
  next.addEventListener('click', () => {
    current = (current + 1) % slides.length;
    showSlide(current);
  });

  prev.addEventListener('click', () => {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  setInterval(() => {
    current = (current + 1) % slides.length;
    showSlide(current);
  }, 5000);
}

// ======================================
// Event Listeners
// ======================================
categorySelect.addEventListener("change", (e) => {
  const selectedTag = e.target.value;
  if(selectedTag=="all"){
    getProducts();
  }else{
  getProductsByTag(selectedTag);
  }
});

// ======================================
// Initial Load
// ======================================
getProducts();
getCategories();
