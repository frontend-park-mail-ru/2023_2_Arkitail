function authenticate() {
    if (context.authenticated.pending) {
        console.error("[authenticate()] Authentication request already pending")
    }

    const requestMethod = 'GET';

    context.authenticated.pending = true;
    fetch(
        API_V1_URL + 'auth',
        {
            credentials: 'include',
            method: requestMethod,
        }
    ).then(response => {
        if (response.status == 200) {
            context.authenticated.status = true;
        } else if (response.status == 401) {
            context.authenticated.status = false;
        } else {
            context.authenticated.status = false;
            console.error('Authentication fatal error');
        }

        context.authenticated.pending = false
    })
}
