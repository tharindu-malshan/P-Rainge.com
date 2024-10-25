
// Cart items storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on page load
const cartCountElement = document.getElementById('cart-count');
cartCountElement.innerText = cart.length;

// Add item to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');
    const sizeType = product.includes("Regular") ? 'regular-size' : 'oversized-size';
    const selectedSize = button.parentElement.querySelector(`input[name="${sizeType}"]:checked`);
    const quantityInput = button.parentElement.querySelector('#quantity');
    const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

    // Validate if size is selected
    if (!selectedSize) {
      alert(`Please select a size for the ${product} before adding to the cart.`);
      return;
    }

    // Validate if quantity is valid
    if (isNaN(quantity) || quantity < 1) {
      alert('Please select a valid quantity.');
      return;
    }

    // Determine price based on product type
    const price = product.includes("Oversized") ? 2597 : 2297;

    // Add the selected product, size, quantity, and price to the cart
    cart.push({ product, size: selectedSize.value, quantity: quantity, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCountElement.innerText = cart.length;

    // Show success message
    alert(`${product} (${selectedSize.value}) x${quantity} added to cart for Rs.${price * quantity}`);
  });
});

// Function to update cart items in local storage
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  cartCountElement.innerText = cart.length;
}

// Load cart items from local storage on page load
window.addEventListener('load', () => {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCountElement.innerText = cart.length;
});

// Function to increase quantity
function increaseQuantity(button) {
  const input = button.parentElement.querySelector('input[type="number"]');
  input.value = parseInt(input.value, 10) + 1;
}

// Function to decrease quantity
function decreaseQuantity(button) {
  const input = button.parentElement.querySelector('input[type="number"]');
  if (input.value > 1) {
    input.value = parseInt(input.value, 10) - 1;
  }
}
