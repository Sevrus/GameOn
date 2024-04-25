// DOM Elements
const modalBg = document.querySelector(".background-modal");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".form-data");

// Event Listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * Toggles the responsive class on the top navigation element.
 * If the top navigation element has the class "top-nav", adds the class "responsive";
 * otherwise, sets the class to "top-nav".
 */
function editNav() {
  const topNavElement = document.getElementById("top-nav");
  topNavElement.className === "top-nav" ? topNavElement.className += " responsive" : topNavElement.className = "top-nav";
}

/**
 * Displays the modal background element.
 */
function launchModal() {
  modalBg.style.display = "block";
}
