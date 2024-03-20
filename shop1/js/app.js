window.addEventListener('DOMContentLoaded', showCategories);

function submitOrder(event) {
  event.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const city = document.getElementById('city').value;
  const postOffice = document.getElementById('postOffice').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  const quantity = document.getElementById('quantity').value;
  const comment = document.getElementById('comment').value;

  if (!fullName || !city || !postOffice || !paymentMethod || !quantity) {
    alert("Будь ласка, заповніть всі обов'язкові поля.");
    return;
  }

  const selectedCategory = data.find(category => category.key === categoryId);
  const selectedProduct = selectedCategory.products.find(product => product.id == productId);

  const order = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    product: selectedProduct.name,
    price: selectedProduct.price,
    fullName,
    city,
    postOffice,
    paymentMethod,
    quantity,
    comment
  };

  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  const info = document.getElementById('info');
  info.innerHTML = `
    <h2>Інформація про замовлення</h2>
    <p><strong>Товар:</strong> ${order.product}</p>
    <p><strong>Ціна:</strong> ${order.price}</p>
    <p><strong>ПІБ покупця:</strong> ${order.fullName}</p>
    <p><strong>Місто:</strong> ${order.city}</p>
    <p><strong>Склад Нової пошти:</strong> ${order.postOffice}</p>
    <p><strong>Спосіб оплати:</strong> ${order.paymentMethod}</p>
    <p><strong>Кількість:</strong> ${order.quantity}</p>
    <p><strong>Коментар:</strong> ${order.comment}</p>
  `;

  clearOrderForm();
}

function showMyOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const info = document.getElementById('info');
  info.innerHTML = '';

  if (orders.length === 0) {
    info.innerHTML = '<p>У вас немає збережених замовлень.</p>';
  } else {
    const ordersList = document.createElement('ul');
    orders.forEach(order => {
      const orderItem = document.createElement('li');
      orderItem.innerHTML = `
        <p>Дата: ${order.date}</p>
        <p>Ціна: ${order.price}</p>
        <button onclick="deleteOrder(${order.id})">Видалити</button>
      `;
      ordersList.appendChild(orderItem);
    });
    info.appendChild(ordersList);
  }

  const categoriesDiv = document.getElementById('categories');
  categoriesDiv.style.display = 'none';
}

function deleteOrder(orderId) {
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders = orders.filter(order => order.id !== orderId);
  localStorage.setItem('orders', JSON.stringify(orders));
  showMyOrders();
}

function clearOrderForm() {
  document.getElementById('checkoutForm').reset();
  document.getElementById('buyButton').style.display = 'block';
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
