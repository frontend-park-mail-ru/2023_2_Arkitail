pages['login'].querySelector('.goto-form form').addEventListener('submit', event => {
    event.preventDefault();
    login();
});

function login() {
    if (context.activePage != 'login') {
        console.error("You are not on login page");
        return null;
    }

    if (context.authenticated.pending) {
        console.error("[login()] Authentication request already pending")
        return null
    }

    const inputs = pages['login'].querySelector('.goto-form form').elements;
    const method = 'POST';
    const headers = {
        'Content-Type': 'text/plain'
    }
    const body = JSON.stringify({
        login: inputs['email'].value,
        password: inputs['password'].value
    });

    context.authenticated.pending = true

    fetch(
        API_V1_URL + 'login',
        {
            credentials: 'same-origin',
            method: method,
            headers: headers,
            body: body
        }
    ).then(response => {
        if (response.status == 200) {
            context.authenticated.status = true;
            console.log("Login succeed");
        } else if (response.status == 401) {
            context.authenticated.status = false;
        } else {
            context.authenticated.status = false;
            console.error("Login fatal error");
        }

        context.authenticated.pending = false;
    });
}