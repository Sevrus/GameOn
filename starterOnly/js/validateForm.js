const form = document.getElementById("inscription-form");
const formData = form.elements;
const locationRadios = document.getElementsByName('location');
const checkbox1 = document.getElementById("checkbox1");

const nameErrorMessage = "Veuillez entrer 2 caractères ou plus.";
const borderStyleError = "2px solid #ff4e60";
const borderStyleValid = "2px solid #279e7a";

function validate() {
    let isValid = true;
    const fieldsToValidate = [
        { field: formData["first"], validator: isValidName, message: nameErrorMessage },
        { field: formData["last"], validator: isValidName, message: nameErrorMessage },
        { field: formData["mail"], validator: isValidEmail, message: "Veuillez entrer une adresse email valide." },
        { field: formData["birthdate"], validator: isValidBirthDate, message: "Veuillez entrer une date de naissance." },
        { field: formData["quantity"], validator: isValidQuantity, message: "Veuillez entrer un nombre entre 0 et 99." }
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

function setError(field, message) {
    let errorElement = getErrorElement(field);
    errorElement.textContent = message;
}

function clearError(field) {
    let errorElement = getErrorElement(field);
    errorElement.textContent = "";
}

function getErrorElement(field) {
    if (field === locationRadios) {
        return document.querySelector(".small-location");
    } else if (field === checkbox1) {
        return document.querySelector(".small-checkbox");
    } else {
        return field.nextElementSibling;
    }
}

function isValidName(name) {
    const nameRegExp = /^[a-zA-Zà-ÿÀ-ÿ\- ]{2,30}$/;
    return nameRegExp.test(name);
}

function isValidEmail(email) {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegExp.test(email);
}

function isValidBirthDate(birthDate) {
    const birthDateRegExp = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    return birthDateRegExp.test(birthDate);
}

function isValidQuantity(quantity) {
    const quantityRegEx = /^\d{1,2}$/;
    return quantityRegEx.test(quantity);
}

function validateField(event) {
    const field = event.target;
    const fieldValidators = {
        'first': { validator: isValidName, message: nameErrorMessage },
        'last': { validator: isValidName, message: nameErrorMessage },
        'mail': { validator: isValidEmail, message: "Veuillez entrer une adresse email valide." },
        'birthdate': { validator: isValidBirthDate, message: "Veuillez entrer une date de naissance." },
        'quantity': { validator: isValidQuantity, message: "Veuillez entrer un nombre entre 0 et 99." }
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
