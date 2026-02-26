const productDetails = document.getElementById("product-details");

// get ?id= from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
  if (!productId) {
    productDetails.innerHTML = `<p>No product ID provided in URL.</p>`;
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/routes/prods/${productId}`);
    if (!res.ok) throw new Error("Product not found");

    const product = await res.json();

    // ✅ Normalize additional images to always be a clean array
    let additional = [];
    if (Array.isArray(product.ad_images)) {
      additional = product.ad_images.filter(img => typeof img === "string" && img.trim() !== "");
    } else if (typeof product.ad_images === "string" && product.ad_images.trim() !== "") {
      additional = product.ad_images.split(",").map(img => img.trim()).filter(Boolean);
    }

    // ✅ Render HTML
    productDetails.innerHTML = `
      <div class="product-gallery">
        <div class="main-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        
        ${
          additional.length
            ? `<div class="thumbnail-row">
                ${additional.map(img => `
                  <img src="${img}" class="thumbnail" alt="extra image">
                `).join("")}
              </div>`
            : `<p class="no-images">No additional images available.</p>`
        }
      </div>

      <div class="product-info">
        <h2>${product.name}</h2>
        <p class="product-desc">${product.description}</p>
        <p class="price">₹${product.price}</p>
        <a href="#" class="buy-btn">Buy on Instagram</a>
      </div>
    `;

    // ✅ Thumbnail switching logic
    document.querySelectorAll(".thumbnail").forEach(thumb => {
      thumb.addEventListener("click", () => {
        document.querySelector(".main-image img").src = thumb.src;
      });
    });

  } catch (err) {
    console.error("Error loading product:", err);
    productDetails.innerHTML = `<p>Unable to load product details.</p>`;
  }
}

loadProduct();
