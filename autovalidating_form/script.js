function validateName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
}

function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    return usernameRegex.test(username);
}

function validate(event) {
    const inputElement = event.target;
    inputElement.classList.add('signup__field__input--error');

    const field = inputElement.dataset.field;

    const errorMessageElement = event.target.parentElement.getElementsByClassName('signup__field__error')[0];
    errorMessageElement.innerHTML = `Error for ${field}`;
}

const inputs = document.getElementsByClassName('signup__field__input');

for (const input of inputs) {
    input.onblur = validate;
}