// Retrieve cart data from localStorage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Display the cart items and total amount
const orderItemsList = document.getElementById('order-items');
cartItems.forEach(item => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<span>${item.product} (Size: ${item.size}, Quantity: ${item.quantity})</span>
                        <span>Rs.${item.price * item.quantity}</span>`;
  orderItemsList.appendChild(listItem);
});

// Display the total amount
document.getElementById('order-total').textContent = `Total Amount: Rs.${totalAmount}`;

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Prepare order details as a string
  let orderDetails = cartItems.map(item =>
    `${item.product} (Size: ${item.size}, Quantity: ${item.quantity}) - Rs.${item.price * item.quantity}`
  ).join('\n');
  orderDetails += `\n\nTotal Amount: Rs.${totalAmount}`;

  // Create a data object to send
  const formData = {
    access_key: this.access_key.value,
    name: this.name.value,
    email: this.email.value,
    contact_number: this['contact-number'].value,
    address: this.address.value,
    order_details: orderDetails,
  };

  // Alert before sending the order
  alert('Your Order Sent Successfully!');

  // Send the form data using Fetch API
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Display success message
        document.getElementById('success-message').style.display = 'block';
        // Optionally clear the cart
        localStorage.removeItem('cart');
        setTimeout(() => {
          window.location.href = 'index.html'; // Redirect to another page after success
        }, 3000);
      } else {
        alert('Error placing the order. Please try again.');
      }
    })
    .catch(error => {
      alert('An error occurred while placing the order. Please try again.');
      console.error('Error:', error);
    });
});

