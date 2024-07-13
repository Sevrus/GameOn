/**
 * FormValidator class is responsible for validating form input fields
 * based on specified regular expressions.
 */
class FormValidator {
    /**
     * Constructor initializes the form elements and regular expressions.
     * @param {HTMLFormControlsCollection} formElements - The form elements to be validated.
     * @param {HTMLFormElement} form - The form element to attach the submit event listener to.
     */
    constructor(formElements, form) {
        this.formElements = formElements;
        this.form = form;
        this.validationRules = [
            { element: this.formElements["first"], regExp: new RegExp('^[A-Z][a-z]*', 'g'), errorMessage: "First name is invalid" },
            { element: this.formElements["last"], regExp: new RegExp('^[A-Z][a-z]*', 'g'), errorMessage: "Last name is invalid" },
            { element: this.formElements["birthdate"], regExp: new RegExp('^(19|20)\\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$', 'g'), errorMessage: "Vous devez entrer votre date de naissance." },
            { element: this.formElements["email"], regExp: new RegExp('^[a-zA-Z0-9_-][a-zA-Z0-9._-]*[a-zA-Z0-9_-]@[a-zA-Z0-9_-][a-zA-Z0-9._-]*[a-zA-Z0-9_-]\\.[a-z]{2,10}$', 'g'), errorMessage: "Email is invalid" }
        ];
    }

    /**
     * Validates data against a given regular expression.
     * @param {string} data - The data to be validated.
     * @param {RegExp} regExp - The regular expression to test the data against.
     * @returns {boolean} - Returns true if data matches the regular expression, false otherwise.
     */
    dataVerification(data, regExp) {
        return regExp.test(data);
    }

    /**
     * Adds an event listener to the specified form element for validation on change.
     * @param {HTMLInputElement} element - The form element to add the listener to.
     * @param {RegExp} regExp - The regular expression to validate the element's value against.
     * @param {string} errorMessage - The error message to display if validation fails.
     */
    addValidationListener(element, regExp, errorMessage) {
        element.addEventListener("change", () => {
            this.validateField(element, regExp, errorMessage);
        });
    }

    /**
     * Validates a single form element and updates the error message.
     * @param {HTMLInputElement} element - The form element to validate.
     * @param {RegExp} regExp - The regular expression to validate the element's value against.
     * @param {string} errorMessage - The error message to display if validation fails.
     */
    validateField(element, regExp, errorMessage) {
        const value = element.value.trim();
        if (value === "") {
            element.nextElementSibling.innerHTML = "Ce Champ ne peut pas être vide";
        } else {
            const isValid = this.dataVerification(value, regExp);
            element.nextElementSibling.innerHTML = isValid ? "" : errorMessage;
        }
    }

    /**
     * Validates all form elements before submission.
     * @returns {boolean} - Returns true if all fields are valid, false otherwise.
     */
    validateForm() {
        let isValid = true;
        this.validationRules.forEach(({ element, regExp, errorMessage }) => {
            this.validateField(element, regExp, errorMessage);
            if (element.nextElementSibling.innerHTML !== "") {
                isValid = false;
            }
        });
        return isValid;
    }

    /**
     * Sets up validation for the form elements by adding appropriate event listeners.
     */
    validate() {
        this.validationRules.forEach(({ element, regExp, errorMessage }) => {
            this.addValidationListener(element, regExp, errorMessage);
        });

        this.form.addEventListener("submit", (event) => {
            if (!this.validateForm()) {
                event.preventDefault();
            }
        });
    }
}

export default FormValidator;
