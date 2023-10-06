let LOGIN_TEMPLATE = /^\w{4,32}$/;
let EMAIL_TEMPLATE = /^\w+@\w+\.\w+$/;
let PASSWORD_TEMPLATE = /^\w{4,32}$/;

function validate(template, target) {
    if (target.match(template)) {
        return true
    }

    console.error("Target does not match template:", target, template)
    return false;
}

function validate_inputs(inputs) {
    return inputs.reduce((acc, input) => {
        if (!validate(input.template, input.target.value)) {
            input.target.style['border-width'] = '2px';
            input.target.style['border-color'] = 'red';
            return acc && false
        }

        input.target.style['border-width'] = null;
        input.target.style['border-color'] = null;
        return acc;
    }, true);
}

pages['signup'].querySelector('.goto-form form').addEventListener('submit', event => {
    event.preventDefault();

    const method = 'POST';

    const headers = {
        'Content-Type': 'application/json'
    };

    const inputs = pages['signup'].querySelector('.goto-form form').elements;

    inputs_to_validate = [
        {
            target: inputs['name'],
            template: LOGIN_TEMPLATE
        }, {
            target: inputs['email'],
            template: EMAIL_TEMPLATE
        }, {
            target: inputs['repeat-password'],
            template: new RegExp('^' + inputs['password'].value + '$')
        }, {
            target: inputs['password'],
            template: PASSWORD_TEMPLATE
        }
    ]

    if (!validate_inputs(inputs_to_validate)) {
        console.error('Some invalid inputs');
        return
    }

    const body = JSON.stringify({
        login: inputs['name'].value,
        password: inputs['password'].value
    });

    console.log(body);

    fetch(
        API_V1_URL + 'signup',
        {
            method: method,
            headers: headers,
            body: body
        }
    ).then(response => {
        console.log(response.headers);
    })

});
