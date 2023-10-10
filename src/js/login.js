pages['login'].querySelector('.goto-form form').addEventListener('submit', event => {
    event.preventDefault();
    login();
});

function login() {
    if (context.activePage != 'login') {
        console.error("You are not on login page");
        return null;
    }

    const inputs = pages['login'].querySelector('.goto-form form').elements;
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = JSON.stringify({
        login: inputs['email'].value,
        password: inputs['password'].value
    });

    fetch(
        API_V1_URL + 'login',
        {
            method: method,
            headers: headers,
            body: body
        }
    ).then(response => {
        if (response.status == 200) {
            context.authenticated = true;
            console.log("Login succeed");
        } else if (response.status == 401) {
            context.authenticated = false;
        } else {
            context.authenticated = false;
            console.error("Login fatal error");
        }
    });
}