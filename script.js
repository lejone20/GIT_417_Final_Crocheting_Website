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



