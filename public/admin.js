const tableBody = document.getElementById('product-table-body');
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "./login.html";
}
async function checkvalidity() {

  const res = await fetch("/login/verify_token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  if(!res.ok){
    window.location.href="./login.html";
  }

}
checkvalidity();


async function loadProducts() {
  try {
    const res = await fetch('/routes/allProd'); // your backend endpoint
    const products = await res.json();


    // Clear table body
    tableBody.innerHTML = '';

    // Loop through products and add rows
    products.forEach(product => {
      const row = document.createElement('tr');
      row.dataset.id = product._id;
      row.innerHTML = `
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td><img src="${product.image}" alt="${product.name}" width="50" height="50"></td>
    <td>${product.description}</td>
    <td>${product.tags}</td>
    <td>
      <button onclick="editProduct('${product._id}', '${product.name}', '${product.price}', '${product.image}', '${product.ad_images}','${product.description}','${product.tags}')">Edit</button>
      <button onclick="deleteProduct('${product._id}')">Delete</button>
      <button class="move-up">↑</button>
      <button class="move-down">↓</button>
    </td>
  `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}
tableBody.addEventListener('click', async (e) => {
  if (!e.target.classList.contains('move-up') && !e.target.classList.contains('move-down')) return;

  const row = e.target.closest('tr');
  const productId = row.dataset.id;
  const direction = e.target.classList.contains('move-up') ? -1 : 1;

  try {
    const res = await fetch('/routes/move_priority', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, direction })
    });

    if (res.ok) {
      await loadProducts(); // refresh list
    } else {
      console.error('Failed to move product');
    }
  } catch (err) {
    console.error('Error moving product:', err);
  }
});

// Call the function to load products when page loads
loadProducts();


const addForm = document.getElementById('add-product-form');

addForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = document.getElementById('productId').value;
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const image = document.getElementById('image').value;
  const ad_images = document.getElementById('ad_images').value;
  const description = document.getElementById('description').value;
  const tags=document.getElementById('tags').value;

  const productData = { name, price, image,ad_images, description,tags };


  try {
    if (id) {
      // UPDATE existing product
      const res = await fetch(`/routes/updateProd/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
      showMessage("✅ Product updated successfully!");
      console.log('Product updated:', await res.json());
    } else {
      // ADD new product
      const res = await fetch('/routes/newProd', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
      showMessage("✅ Product added successfully!");
      console.log('Product added:', await res.json());
    }
    // Reset form
    addForm.reset();
    document.getElementById('productId').value = '';
    document.querySelector('#add-product-form button').textContent = 'Add Product';


    // Refresh product list
    loadProducts();
    // After successful product add/update

  } catch (err) {
    console.error('Error saving product:', err);
  }
});

const logout = document.getElementById("logout");
logout.addEventListener('click',async (e) =>{
  localStorage.removeItem("token");
  window.location.href="./login.html";
})




async function deleteProduct(id) {

  try {
    const res = await fetch(`/routes/deltProd/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (res.ok) {
      console.log(`Product ${id} deleted`);
      alert("✅ Product deleted successfully!");
      loadProducts(); // refresh table after delete
    } else {
      console.error('Failed to delete product');
    }
  } catch (err) {
    console.error('Error deleting product:', err);
  }
}
function editProduct(id, name, price, image,ad_images, description,tags) {
  document.getElementById('productId').value = id;
  document.getElementById('name').value = name;
  document.getElementById('price').value = price;
  document.getElementById('image').value = image;
  document.getElementById('ad_images').value = ad_images;
  document.getElementById('description').value = description;
  document.getElementById('tags').value=tags;

  // Change button text
  document.querySelector('#add-product-form button').textContent = 'Update Product';
}
function showMessage(text, type = "success") {
  const msgDiv = document.getElementById('message');
  msgDiv.textContent = text;
  msgDiv.style.color = type === "success" ? "green" : "red";

  // Auto hide after 3 seconds
  setTimeout(() => {
    msgDiv.textContent = '';
  }, 3000);
}
