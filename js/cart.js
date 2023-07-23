const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
let cartTotal = 0;

cartItems.forEach(item => {
    if (item.quantity > 0) {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('cart-item');

        const itemImage = document.createElement('img');
        itemImage.src = `../images/${item.name.toLowerCase()}.jpg`;
        itemImage.alt = "Image Not Found";
        itemImage.classList.add('item-image');

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');

        const itemName = document.createElement('h3');
        itemName.innerText = item.name;

        const itemPrice = document.createElement('p');
        itemPrice.classList.add('item-price');
        itemPrice.innerText = `Price: Rs ${item.price}`;

        const itemQuantityWrapper = document.createElement('div');
        itemQuantityWrapper.classList.add('item-quantity-wrapper');

        const decreaseQuantityButton = document.createElement('button');
        decreaseQuantityButton.classList.add('quantity-btn');
        decreaseQuantityButton.innerText = '-';
        decreaseQuantityButton.addEventListener('click', () => decreaseQuantity(item));

        const itemQuantity = document.createElement('span');
        itemQuantity.classList.add('item-quantity');
        itemQuantity.innerText = item.quantity;

        const increaseQuantityButton = document.createElement('button');
        increaseQuantityButton.classList.add('quantity-btn');
        increaseQuantityButton.innerText = '+';
        increaseQuantityButton.addEventListener('click', () => increaseQuantity(item));

        itemQuantityWrapper.appendChild(decreaseQuantityButton);
        itemQuantityWrapper.appendChild(itemQuantity);
        itemQuantityWrapper.appendChild(increaseQuantityButton);

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash-alt');
        deleteIcon.addEventListener('click', () => removeItem(item.name));

        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemPrice);
        itemDetails.appendChild(itemQuantityWrapper);
        itemDetails.appendChild(deleteIcon);

        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemDetails);

        cartItemsContainer.appendChild(itemContainer);

        const totalPrice = item.price * item.quantity;
        cartTotal += totalPrice;
    }
});

cartTotalElement.innerText = cartTotal.toFixed(2);

function clearCart() {
    localStorage.removeItem('cart');
    cartItemsContainer.innerHTML = '';
    cartTotalElement.innerText = '0';
}

function removeItem(productName) {
    const updatedItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    location.reload();
}

function increaseQuantity(item) {
    item.quantity++;
    updateCart();
}

function decreaseQuantity(item) {
    if (item.quantity > 0) {
        item.quantity--;
        updateCart();
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    location.reload();
}

function goBack() {
    window.history.back();
}

function placeOrder() {
  if (cartItems.length === 0) {
      alert("Cart empty! Please select an item.");
      window.location.href = "home.html";
  } else {
      const confirmed = confirm("Do you want to place an order?");
      if (confirmed) {
          alert("Order Placed. Thank you for Shopping!");
          localStorage.removeItem('cart');
          location.reload();
      }
  }
}

function goToCart() {
    window.location.href = 'cart.html';
}

function renderCartActions() {
  const cartActionsDiv = document.querySelector('.cart-actions');
  const clearCartButton = document.querySelector('.clear-cart-btn');

  // Check if the "Clear Cart" button already exists, if not, create and append it
  if (!clearCartButton) {
      const clearCartButton = document.createElement('button');
      clearCartButton.classList.add('clear-cart-btn');
      clearCartButton.textContent = 'Clear Cart';
      clearCartButton.onclick = clearCart;
      cartActionsDiv.appendChild(clearCartButton);
  }
}



function updateCartActionsVisibility() {
    const clearCartButton = document.querySelector('.clear-cart-btn');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        clearCartButton.style.display = 'block';
    } else {
        clearCartButton.style.display = 'none';
    }
}

renderCartActions();
updateCartActionsVisibility();
