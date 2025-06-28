"use strict";
//toggle button for light and dark mode
document.addEventListener("DOMContentLoaded", function() {
    const toggleBtn = document.getElementById("toggleTheme");

    toggleBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
});

//calculate order total
document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculate");
  calculateBtn.addEventListener("click", function () {
    const quantities = document.querySelectorAll(".qty");
    let subtotal = 0;

    quantities.forEach((input) => {
      const quantity = parseInt(input.value) || 0;
      const price = parseFloat(input.dataset.price);
      subtotal += quantity * price;
    });

    const tax = subtotal * 0.08;
    const shipping = subtotal > 0 ? 25 : 0;
    const total = subtotal + tax + shipping;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("tax").textContent = tax.toFixed(2);
    document.getElementById("shipping").textContent = shipping.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);
  });
});

//DOM for game play
const correctNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
  const userGuess = parseInt(document.getElementById('guessInput').value);
  const message = document.getElementById('resultMessage');

  if (userGuess === correctNumber) {
    message.textContent = "🎉 Congratulations! You win a keychain!";
    message.style.color = "dk-green";
  } else {
    message.textContent = "❌ Sorry, try again!";
    message.style.color = "red";
  }
}
//reset game to keep trying to play
document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("resetGame");

  resetButton.addEventListener("click", function () {
  
    document.querySelectorAll("input").forEach(input => {
      if (input.type !== "submit" && input.type !== "button") input.value = "";
    });

    //  remove a result message
    const result = document.getElementById("resultMessage");
    if (result) result.textContent = "";


     location.reload();
  });
});
document.querySelector('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  const errors = {}; // Store errors here

  // Grab input values
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const comments = document.getElementById('comments').value.trim();
  const zipCode = document.getElementById('zipCode').value.trim();
  const contactPrefEmail = document.getElementById('email-pref').checked;
  const contactPrefPhone = document.getElementById('phone-pref').checked;

  // Clear previous errors
  document.querySelectorAll('.error').forEach(e => e.remove());

  // RegEx patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;
  const zipPattern = /^\d{5}$/;

  // Validations
  if (!name) errors.fname = 'Full name is required.';
  if (!comments) errors.comments = 'Comments are required.';
  if (!zipPattern.test(zipCode)) errors.zipCode = 'ZIP Code must be exactly 5 digits.';
  if (contactPrefEmail && !emailPattern.test(email)) errors.email = 'Please enter a valid email address.';
  if (contactPrefPhone && !phonePattern.test(phone)) errors.phone = 'Phone must be exactly 10 digits.';

  // Show errors
  Object.entries(errors).forEach(([field, message]) => {
    const fieldElement = document.getElementById(field);
    const errorTag = document.createElement('span');
    errorTag.className = 'error';
    errorTag.style.color = 'red';
    errorTag.textContent = message;
    fieldElement.insertAdjacentElement('afterend', errorTag);
  });

  // If errors exist, don't continue
  if (Object.keys(errors).length > 0) return;

  // If everything's valid, create customer object
  const customer = {
    name,
    email,
    phone,
    zipCode,
    comments,
    preferredContact: contactPrefEmail ? 'Email' : 'Phone'
  };

  // Reset form and show thank-you message
  this.reset();
  const thankYou = document.createElement('p');
  thankYou.style.color = 'white';
  thankYou.innerHTML = `Thank you for your request, <strong>${customer.name}</strong>! We’ll contact you via <strong>${customer.preferredContact}</strong>.`;
  this.insertAdjacentElement('beforebegin', thankYou);
});




