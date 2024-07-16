const form = document.getElementById("inscription-form");
const formData = form.elements;
const errorFields = document.querySelectorAll(".form-data small");
const locationRadios = document.getElementsByName('location');
const checkbox1 = document.getElementById("checkbox1");

/**
 * Function to validate the form
 * @returns {boolean}
 */
function validate() {
    clearErrors();

    let isValid = true;
    const nameErrorMessage = "Veuillez entrer 2 caractères ou plus.";
    const borderStyleError = "2px solid #fe142f";
    const borderStyleValid = "2px solid #279e7a";

    if (!isValidName(formData["first"].value.trim())) {
        console.log("First name validation failed");
        setError(formData["first"], nameErrorMessage);
        formData["first"].style.border=borderStyleError;
        isValid = false;
    } else {
        formData["first"].style.border=borderStyleValid;
    }

    if (!isValidName(formData["last"].value.trim())) {
        console.log("Last name validation failed");
        setError(formData["last"], nameErrorMessage);
        formData["last"].style.border=borderStyleError;
        isValid = false;
    } else {
        formData["last"].style.border=borderStyleValid;
    }

    if (!isValidEmail(formData["mail"].value.trim())) {
        console.log("Email validation failed");
        setError(formData["mail"], "Veuillez entrer une adresse email valide.");
        formData["mail"].style.border=borderStyleError;
        isValid = false;
    } else {
        formData["mail"].style.border=borderStyleValid;
    }

    if (!isValidBirthDate(formData["birthdate"].value.trim())) {
        console.log("Birthdate validation failed");
        setError(formData["birthdate"], "Veuillez entrer une date de naissance.");
        formData["birthdate"].style.border=borderStyleError;
        isValid = false;
    } else {
        formData["birthdate"].style.border=borderStyleValid;
    }

    if (isNaN(formData["quantity"].value.trim()) || formData["quantity"].value.trim() === '') {
        console.log("Quantity validation failed");
        setError(formData["quantity"], "Veuillez entrer un nombre entre 0 et 99.");
        formData["quantity"].style.border=borderStyleError;
        isValid = false;
    } else {
        formData["quantity"].style.border=borderStyleValid;
    }

    let radioChecked = false;
    for (const radio of locationRadios) {
        if (radio.checked) {
            radioChecked = true;
            break;
        }
    }
    if (!radioChecked) {
        console.log("Radio button validation failed");
        setError(locationRadios, "Vous devez choisir une option.");
        isValid = false;
    }

    if (!checkbox1.checked) {
        console.log("Checkbox1 validation failed");
        setError(checkbox1, "Vous devez accepter les conditions d'utilisation.");
        isValid = false;
    }

    return isValid;
}

/**
 * Reset all error messages initially
 */
function clearErrors() {
    errorFields.forEach(error => error.textContent = "");
}

/**
 * Function to set error message for a field
 * @param {HTMLElement} field
 * @param {string} message
 */
function setError(field, message) {
    if (field === locationRadios) {
        const errorLocationRadio = document.querySelector(".small-location");
        errorLocationRadio.textContent = message;
    } else if(field === checkbox1) {
        const errorCheckbox = document.querySelector(".small-checkbox");
        errorCheckbox.textContent = message;
    } else {
        let small = field.nextElementSibling;
        small.textContent = message;
    }
}

/**
 * Function to validate name format
 * @param {string} name
 * @returns {boolean}
 */
function isValidName(name) {
    const nameRegExp = /^[a-zA-Z- ]{2,30}$/g;
    return nameRegExp.test(name);
}

/**
 * Function to validate email format
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9_-][a-zA-Z0-9._-]*[a-zA-Z0-9_-]@[a-zA-Z0-9_-][a-zA-Z0-9._-]*[a-zA-Z0-9_-].[a-z]{2,10}$/g;
    return emailRegExp.test(email);
}

/**
 * Function to validate birthdate format
 * @param {string} birthDate
 * @returns {boolean}
 */
function isValidBirthDate(birthDate) {
    const birthDateRegExp = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return birthDateRegExp.test(birthDate);
}

export { validate };