const productGrid = document.getElementById('product-grid');

async function loadProducts() {
  try {
    const res = await fetch('/routes/allProd'); // your backend endpoint
    const products = await res.json();

    productGrid.innerHTML = ''; // clear existing

    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ₹${product.price}</p>
        <p>${product.description}</p>
        <button class="buy" onclick="buyOnInstagram()">Buy on Instagram</button>
      `;

      productGrid.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

function buyOnInstagram() {
  window.open('https://www.instagram.com/resinresire._/', '_blank');
}

loadProducts();
