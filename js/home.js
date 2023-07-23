function addToCart(event, productName, price) {
  const product = {
    name: productName,
    quantity: 1,
    price: price,
    total: price
  };

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    const confirmed = confirm("Item already in Cart. Go to Cart?");
    if (confirmed) {
      window.location.href = 'cart.html';
    }
  } else {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    const goToCartConfirmed = confirm("Go to Cart?");
    if (goToCartConfirmed) {
      window.location.href = 'cart.html';
    }
  }
}

function goToCart() {
  window.location.href = 'cart.html';
}
