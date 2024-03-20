function showCategories() {
  const parent = document.getElementById('categories');

  data.forEach(category => {
    const myCategoryElement = document.createElement('div');
    myCategoryElement.textContent = category.name;
    myCategoryElement.setAttribute('data-category', category.key);

    myCategoryElement.addEventListener('click', () => {
      const categoryId = myCategoryElement.getAttribute('data-category');
      showProductsByCategory(categoryId);
    });

    parent.appendChild(myCategoryElement);
  });
}

function showProductsByCategory(categoryId) {
  const selectedCategory = data.find(category => category.key === categoryId);

  const parent = document.getElementById('products');
  parent.innerHTML = '';

  selectedCategory.products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.textContent = product.name;
    productElement.setAttribute('data-product', product.id);
    productElement.setAttribute('data-category', categoryId);

    productElement.addEventListener('click', () => {
      const productId = productElement.getAttribute('data-product');
      showProductInfo(categoryId, productId);
    });

    parent.appendChild(productElement);
  });
}

function showProductInfo(categoryId, productId) {
  const selectedCategory = data.find(category => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(product => product.id == productId);

  const parent = document.getElementById('product');
  parent.innerHTML = `
    <h2>${selectedProduct.name}</h2>
    <p>Price: $${selectedProduct.price}</p>
    <p>${selectedProduct.description}</p>
  `;

  const buyButton = document.getElementById('buyButton');
  buyButton.style.display = 'block';
  buyButton.onclick = () => handleBuyButtonClick(categoryId, productId);
}

function handleBuyButtonClick(categoryId, productId) {
  const orderForm = document.getElementById('orderForm');
  orderForm.style.display = 'block';
  const buyButton = document.getElementById('buyButton');
  buyButton.style.display = 'none';
}