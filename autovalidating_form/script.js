class ValidationError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
}

function validateName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
        throw new ValidationError('Please enter a valid name');
    }
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    return usernameRegex.test(username);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9@._-]+[a-zA-Z]$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    const necessaryEmailCharacters = ['@', '.'];
    for (const necessaryEmailCharacter of necessaryEmailCharacters) {
        if (!email.includes(necessaryEmailCharacter)) {
            return false;
        }
    }

    return true;
}

function validate(event) {
    const inputElement = event.target;

    const field = inputElement.dataset.field;

    const errorMessageElement = event.target.parentElement.getElementsByClassName('signup__field__error')[0];

    try {
        validateName(inputElement.value);
        errorMessageElement.innerHTML = '';
        inputElement.classList.remove('signup__field__input--error');
    } catch (err) {
        if (!(err instanceof ValidationError)) {
            // Log real error
            throw err;
        }
        
        errorMessageElement.innerHTML = err.message;
        inputElement.classList.add('signup__field__input--error');
    }

}

const inputs = document.getElementsByClassName('signup__field__input');

for (const input of inputs) {
    input.onblur = validate;
}