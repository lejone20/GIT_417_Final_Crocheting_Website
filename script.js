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
// Product data
const products = {
  cookie: {
    name: 'Cookie Monster Hat',
    img: 'Images/cookie_monster2_hat.jpg',
    description: 'This hat is made with soft, acrylic yarn that can be washed in cold water and dried on low heat.',
    price: '$55.00'
  },
  monkey: {
    name: 'Monkey Hat & Diaper Cover',
    img: 'Images/monkey_baby_set.jpg',
    description: 'This set is made with wool yarn. Hand wash in cold water and air/tumble dry to avoid shrinkage.',
    price: '$75.00'
  },
  hello_kitty: {
    name: 'Hello Kitty Hat and Purse',
    img: 'Images/hello_kitty_hat_purse.jpg',
    description: 'This hat, purse, and scarf are made with soft, acrylic yarn. Available in pink, purple, yellow, and blue.',
    price: '$95.00'
  },
  preemie_hat: {
    name: 'Preemie Hat with bow',
    img: 'Images/premie_hat_bow.jpg',
    description: 'This hat is seen on a micro-preemie at about 3 lbs.  It can be made for any size child and is available in any color at your request.  It is made with soft acrylic variegated yarn on the main part of the hat with a matching color for edging',
    price: '$25.00'
  },
  dress: {
    name: 'Micro-Preemie Dress & Hat',
    img: 'Images/premie_dress_headband.jpg',
    description: 'This set can be modified to fit any tiny preemie or newborn.  It is made with soft, acrylic baby yarn.  When ordering this item, I will need the length and weight of your child to accurately make the dress.  The headband is adjustable.  The headband has optional beads that are crocheted into the item and not sewn on so they will not fall off.',
    price: '$55.00'
  },
  owls: {
    name: 'Owl Hat',
    img: 'Images/owl_hat_set.jpg',
    description: 'The Owl hat can be sized from preemie to adult.  It is made with soft, acrylic yarn.  When ordering this item, please specify desired colors and if you would like an awake owl (as pictured) or a baby sleeping owl.  Price is for one hat.',
    price: '$25.00' 
  }
};

// Function to display a product
function displayProduct(key) {
  const product = products[key];
  const container = document.getElementById('product-display');
  container.innerHTML = `
    <section>
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>${product.price}</p>
    </section>
  `;
}

// Set event listeners on buttons
document.querySelectorAll('.product-controls button').forEach(btn => {
  btn.addEventListener('click', () => {
    const productKey = btn.getAttribute('data-product');
    displayProduct(productKey);
  });
});

// Display default product on load
window.addEventListener('DOMContentLoaded', () => {
  displayProduct('cookie');
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




