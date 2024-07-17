const form = document.getElementById("inscription-form");
const formData = form.elements;
const locationRadios = document.getElementsByName('location');
const checkbox1 = document.getElementById("checkbox1");

const borderStyleError = "2px solid #ff4e60";
const borderStyleValid = "2px solid #279e7a";
const errorMessage = {
    name: "Veuillez entrer 2 caractères ou plus.",
    email: "Veuillez entrer une adresse email valide.",
    birthdate: "Veuillez entrer une date de naissance.",
    quantity: "Veuillez entrer un nombre entre 0 et 99.",
    location: "Vous devez choisir une option.",
    terms: "Vous devez accepter les conditions d'utilisation."

};
const regExp = {
    name: /^[a-zA-Zà-ÿÀ-ÿ\- ]{2,30}$/,
    email: /^[\w-][\w.-]*[\w-]@[\w-][\w.-]*[\w-].[a-z]{2,10}$/,
    birthdate: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    quantity: /^\d{1,2}$/
};

/**
 * Validate the entire form
 * @returns {boolean} - True if the form is valid, otherwise false
 */
function validate() {
    let isValid = true;
    const fieldsToValidate = [
        { field: formData["first"], validator: isValidName, message: errorMessage.name },
        { field: formData["last"], validator: isValidName, message: errorMessage.name },
        { field: formData["mail"], validator: isValidEmail, message: errorMessage.email },
        { field: formData["birthdate"], validator: isValidBirthDate, message: errorMessage.birthdate },
        { field: formData["quantity"], validator: isValidQuantity, message: errorMessage.quantity }
    ];

    fieldsToValidate.forEach(({ field, validator, message }) => {
        if (!validator(field.value.trim())) {
            setError(field, message);
            field.style.border = borderStyleError;
            isValid = false;
        } else {
            clearError(field);
            field.style.border = borderStyleValid;
        }
    });

    let radioChecked = Array.from(locationRadios).some(radio => radio.checked);
    if (!radioChecked) {
        setError(locationRadios, errorMessage.location);
        isValid = false;
    } else {
        clearError(locationRadios);
    }

    if (!checkbox1.checked) {
        setError(checkbox1, errorMessage.terms);
        isValid = false;
    } else {
        clearError(checkbox1);
    }

    return isValid;
}

/**
 * Set an error message for a field
 * @param {HTMLElement|NodeList} field
 * @param {string} message - The error message to display
 */
function setError(field, message) {
    let errorElement = getErrorElement(field);
    errorElement.textContent = message;
}

/**
 * Clear the error message for a field
 * @param {HTMLElement|NodeList} field
 */
function clearError(field) {
    let errorElement = getErrorElement(field);
    errorElement.textContent = "";
}

/**
 * Get the error message element associated with a field
 * @param {HTMLElement|NodeList} field
 * @returns {Element} - The error message element
 */
function getErrorElement(field) {
    if (field === locationRadios) {
        return document.querySelector(".small-location");
    } else if (field === checkbox1) {
        return document.querySelector(".small-checkbox");
    } else {
        return field.nextElementSibling;
    }
}

/**
 * Validate if the name is in the correct format
 * @param {string} name - The name to validate
 * @returns {boolean} - True if the name is valid, otherwise false
 */
const isValidName = name => regExp.name.test(name);

/**
 * Validate if the email is in the correct format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if the email is valid, otherwise false
 */
const isValidEmail = email => regExp.email.test(email);

/**
 * Validate if the birthdate is in the correct format
 * @param {string} birthDate - The birthdate to validate
 * @returns {boolean} - True if the birthdate is valid, otherwise false
 */
const isValidBirthDate = birthDate => regExp.birthdate.test(birthDate);

/**
 * Validate if the quantity is in the correct format
 * @param {string} quantity - The quantity to validate
 * @returns {boolean} - True if the quantity is valid, otherwise false
 */
const isValidQuantity = quantity => regExp.quantity.test(quantity);

/**
 * Validate a single form field based on its name attribute
 * @param {Event} event - The input event
 */
function validateField(event) {
    const field = event.target;
    const fieldValidators = {
        'first': { validator: isValidName, message: errorMessage.name },
        'last': { validator: isValidName, message: errorMessage.name },
        'mail': { validator: isValidEmail, message: errorMessage.email },
        'birthdate': { validator: isValidBirthDate, message: errorMessage.birthdate },
        'quantity': { validator: isValidQuantity, message: errorMessage.quantity }
    };

    const { validator, message } = fieldValidators[field.name];
    if (!validator(field.value.trim())) {
        setError(field, message);
        field.style.border = borderStyleError;
    } else {
        clearError(field);
        field.style.border = borderStyleValid;
    }
}

['first', 'last', 'mail', 'birthdate', 'quantity'].forEach(name => {
    formData[name].addEventListener('input', validateField);
});

export { validate };
