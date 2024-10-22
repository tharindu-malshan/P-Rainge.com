

// Cart items storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on page load
const cartCountElement = document.getElementById('cart-count');
cartCountElement.innerText = cart.length;

// Add item to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.getAttribute('data-product');

    // Get selected size based on product type (Regular or Oversized)
    const sizeType = product.includes("Regular") ? 'regular-size' : 'oversized-size';
    const selectedSize = document.querySelector(`input[name="${sizeType}"]:checked`);

    // Validate if size is selected
    if (!selectedSize) {
      alert(`Please select a size for the ${product} before adding to the cart.`);
      return;
    }

    // Determine price based on product type
    const price = product.includes("Oversized") ? 2597 : 2297;

    // Add the selected product, size, and price to the cart
    cart.push({ product, size: selectedSize.value, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    cartCountElement.innerText = cart.length;

    // Show success message without redirect
    alert(`${product} (${selectedSize.value}) added to cart for Rs.${price}`);
  });
});
