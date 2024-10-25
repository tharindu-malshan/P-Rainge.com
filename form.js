// Retrieve cart data and total amount from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const totalAmount = localStorage.getItem('totalAmount');

// Display cart items in the order summary
const summaryItems = document.getElementById('summary-items');
cart.forEach(item => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  
  // Calculate total price for the item based on its quantity
  const itemTotalPrice = item.price * item.quantity; // Total price for this item
  
  // Display the product details along with the calculated total price
  listItem.innerText = `${item.product} (Size: ${item.size}) (Quantity: ${item.quantity}) - Total: Rs.${itemTotalPrice}`;
  
  summaryItems.appendChild(listItem);
});

// Display total amount
document.getElementById('summary-total').innerText = totalAmount;

// JavaScript form validation
const form = document.getElementById('checkoutForm');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Check if the form is valid
  if (!form.checkValidity()) {
    event.stopPropagation();
    form.classList.add('was-validated');
    return;
  }

  // Collect form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('telephone').value;
  const address = document.getElementById('address').value;

  // Display confirmation
  alert(`Order placed successfully!\n\nName: ${name}\nEmail: ${email}\nTelephone: ${telephone}\nAddress: ${address}`);

  // Clear form data
  form.reset();
  form.classList.remove('was-validated');

  // Clear cart data from localStorage
  localStorage.removeItem('cart');
  localStorage.removeItem('totalAmount');

  // Optionally clear the order summary display
  summaryItems.innerHTML = '';
  document.getElementById('summary-total').innerText = '';
});
