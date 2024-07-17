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
    quantity: "Veuillez entrer un nombre entre 0 et 99."
}

/**
 *
 * @returns {boolean}
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
        setError(locationRadios, "Vous devez choisir une option.");
        isValid = false;
    } else {
        clearError(locationRadios);
    }

    if (!checkbox1.checked) {
        setError(checkbox1, "Vous devez accepter les conditions d'utilisation.");
        isValid = false;
    } else {
        clearError(checkbox1);
    }

    return isValid;
}

/**
 *
 * @param field
 * @param message
 */
function setError(field, message) {
    let errorElement = getErrorElement(field);
    errorElement.textContent = message;
}

/**
 *
 * @param field
 */
function clearError(field) {
    let errorElement = getErrorElement(field);
    errorElement.textContent = "";
}

/**
 *
 * @param field
 * @returns {Element}
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
 *
 * @param name
 * @returns {boolean}
 */
function isValidName(name) {
    const nameRegExp = /^[a-zA-Zà-ÿÀ-ÿ\- ]{2,30}$/;
    return nameRegExp.test(name);
}

/**
 *
 * @param email
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegExp = /^[\w-][\w.-]*[\w-]@[\w-][\w.-]*[\w-].[a-z]{2,10}$/;
    return emailRegExp.test(email);
}

/**
 *
 * @param birthDate
 * @returns {boolean}
 */
function isValidBirthDate(birthDate) {
    const birthDateRegExp = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return birthDateRegExp.test(birthDate);
}

/**
 *
 * @param quantity
 * @returns {boolean}
 */
function isValidQuantity(quantity) {
    const quantityRegEx = /^\d{1,2}$/;
    return quantityRegEx.test(quantity);
}

/**
 *
 * @param event
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
