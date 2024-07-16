import {validate} from "./validateForm.js";

const modalBg = document.querySelector(".background-modal");
const closeModal = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementById("inscription-form");
const formData = form.elements;


/**
 * Event Listeners
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModal.addEventListener("click", hideModal);

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
 * Displays the modal.
 */
function launchModal() {
  modalBg.style.display = "block";
}

/**
 * Hide the modal.
 */
function hideModal() {
  modalBg.style.display = "none";
}

/**
 * Event listener for form submission
 */
form.addEventListener('submit', function(event) {
  if (!validate()) {
    event.preventDefault();
  }
});