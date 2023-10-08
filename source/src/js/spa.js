const API_V1_URL = '/api/v1/';

const root = document.querySelector('#root');
const pages = {
    'list-of-places': document.querySelector('.goto-list-of-places-page'),
    'signup': document.querySelector('.goto-signup-page'),
    'login': document.querySelector('.goto-login-page')
};

let context = {
    authenticated: {pending: false, status: false},
    activePage: 'list-of-places'
}

window.addEventListener('popstate', event => {
    context = event.state;
    console.log(context.activePage);
})

const render = () => {
    console.log(context.activePage);
    root.replaceChildren(pages[context.activePage]);
};
