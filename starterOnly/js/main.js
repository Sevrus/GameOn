import { validate } from "./validateForm.js";

const modalBg = document.querySelector(".background-modal");
const closeModal = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.getElementById("inscription-form");
const navToggle = document.getElementById("nav-toggle");
const targetMain = document.getElementsByTagName("main");

/**
 * Event Listeners
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeModal.addEventListener("click", hideModal);
navToggle.addEventListener("click", editNav);

/**
 * Toggles the responsive class on the top navigation element.
 * If the top navigation element has the class "top-nav", adds the class "responsive";
 * otherwise, sets the class to "top-nav".
 * @param event
 */
function editNav(event) {
  event.preventDefault();
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
 * Displays the confirmation message
 */
function displayConfirmation() {
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
  <p class="confirm-message">Merci pour<br>votre inscription</p>
  <button class="btn-submit button close-modal-btn">Fermer</button>
  `;

  document.querySelector(".close-modal-btn").addEventListener("click", () => {
    hideModal();
  });
}

/**
 * Event listener for form submission
 */
form.addEventListener('submit', function(event) {
  if (validate()) {
    event.preventDefault();
    form.reset();
    displayConfirmation();
  } else {
    event.preventDefault();
  }
});
