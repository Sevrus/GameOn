// DOM Elements
const modalBg = document.querySelector(".background-modal");
const closeModal = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.getElementById("inscription-form").elements;
// const formData = document.querySelectorAll(".form-data");


// REGEX
const regExpMail = new RegExp('^[a-zA-Z0-9_-][a-zA-Z0-9._-]*[a-zA-Z0-9_-]@[a-zA-Z0-9_-][a-zA-Z0-9._-]*[a-zA-Z0-9_-]\.[a-z]{2,10}$', 'g');
const regExpName = new RegExp('^[A-Z][a-z]*', 'g');
const regExpBirthDate = new RegExp('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$', 'g');

// Event Listeners
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

function dataVerification(data,regExp) {
  return regExp.test(data);
}

formData["first"].addEventListener("change", function () {
  let testFirst = dataVerification(this.value, regExpName);
  // if (!testFirst) {
  //   this.nextElementSibling.innerHTML = "test";
  // } else {
  //   this.nextElementSibling.innerHTML = "";
  // }

  !testFirst ? this.nextElementSibling.innerHTML = "test" : this.nextElementSibling.innerHTML = "";
});

formData["last"].addEventListener("change", function () {
  let testLast = dataVerification(this.value, regExpName);

  !testLast ? this.nextElementSibling.innerHTML = "test" : this.nextElementSibling.innerHTML = "";
});

formData["birthdate"].addEventListener("change", function () {
  let testBirthDate = dataVerification(this.value, regExpBirthDate);

  !testBirthDate ? this.nextElementSibling.innerHTML = "test" : this.nextElementSibling.innerHTML = "";
});

formData["email"].addEventListener("change", function () {
  let testEMail = dataVerification(this.value, regExpMail);

  !testEMail ? this.nextElementSibling.innerHTML = "test" : this.nextElementSibling.innerHTML = "";
});

