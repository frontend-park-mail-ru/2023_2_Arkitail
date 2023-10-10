function authenticate() {
    const requestMethod = 'GET';

    fetch(
        API_V1_URL + 'auth',
        {
            method: requestMethod,
        }
    ).then(response => {
        if (response.status == 200) {
            context.authenticated = true;
        } else if (response.status == 401) {
            context.authenticated = false;
        } else {
            context.authenticated = false;
            console.error('Authentication fatal error');
        }
    })
}