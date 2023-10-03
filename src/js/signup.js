const registrationForm = document.querySelector('form');

const EMAIL_TEMPLATE = /^\S+@\S+\.\S+$/;

const PASSWORD_LENTH_TEMPLATE = /^.{8,64}$/;
const PASSWORD_LETTERS_TEMPLATE = /^.*([a-z].*[A-Z]|[A-Z].*[a-z]).*$/;
const PASSWORD_DIGITS_TEMPLATE = /^.*\d+.*$/;

function validateInput(target, template) {
    return target.match(template).lenth == 1;
}

const formSubmitCallback = (e) => {
    e.preventDefault();

    const requestMethod = 'POST';

    const requestHeaders = {
        'Content-Type': 'text/plain'
    };

    const formInputs = registrationForm.elements;

    const requestBody = JSON.stringify(
        {
            login: formInputs['name'].value,
            password: formInputs['password'].value
        }
    );

    console.log(requestBody)

    fetch(
        'http://localhost:8080/api/v1/signup',
        {
            method: requestMethod,
            headers: requestHeaders,
            body: requestBody
        }
    )
    .then(response => response.json())
    .then(console.log);

}

registrationForm.submit.addEventListener('click', formSubmitCallback);
