pages['signup'].querySelector('.goto-form form').addEventListener('submit', event => {
    event.preventDefault();

    const method = 'POST';

    const headers = {
        'Content-Type': 'text/plain'
    };

    const inputs = pages['signup'].querySelector('.goto-form form').elements;

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
