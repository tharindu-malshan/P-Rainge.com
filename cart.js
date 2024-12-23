 // Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Select elements
const cartItemList = document.getElementById('cart-item-list');
const totalAmountElement = document.getElementById('total-amount');

// Display cart items
function displayCartItems() {
  cartItemList.innerHTML = ''; // Clear existing list

  let totalAmount = 0;

  if (cart.length === 0) {
    cartItemList.innerHTML = '<li class="list-group-item">Your cart is empty</li>';
  } else {
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      
      // Display the product with its size, quantity, and total price for that item
      const itemTotalPrice = item.price * item.quantity;
      listItem.innerHTML = `${item.product} (Size: ${item.size}, Quantity: ${item.quantity}) - Rs.${itemTotalPrice}
                            <span class="badge bg-primary rounded-pill">Remove</span>`;

      // Remove item button functionality
      listItem.querySelector('.badge').addEventListener('click', () => {
        removeCartItem(index);
      });

      cartItemList.appendChild(listItem);

      // Add item total price to the overall total amount
      totalAmount += itemTotalPrice;
    });
  }

  // Update total amount
  totalAmountElement.innerText = `Total Amount: Rs.${totalAmount}`;
}

// Remove item from cart
function removeCartItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
}

// Clear cart
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
});

// Initial display of cart items
displayCartItems();

// Handle "Next" button click
document.getElementById('nextButton').addEventListener('click', () => {
  // Store cart and total amount in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Get the total amount from the displayed text
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  localStorage.setItem('totalAmount', totalAmount);

  // Navigate to form.html
  window.location.href = 'form.html'; // Adjust path based on your project structure
});

     
