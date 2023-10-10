const API_V1_URL = 'http://localhost:8080/api/v1/';

const root = document.querySelector('#root');
const pages = {
    'list-of-places': document.querySelector('.goto-list-of-places-page'),
    'signup': document.querySelector('.goto-signup-page'),
    'login': document.querySelector('.goto-login-page')
};

const routing = {
    '.goto-login-link': {src: 'signup', dst: 'login'},
    '.goto-signup-link': {src: 'login', dst: 'signup'},
    '.goto-login-list-of-places-link': {src: 'list-of-places', dst: 'login'},
    '.goto-signup-list-of-places-link': {src: 'list-of-places', dst: 'signup'},
};

let context = {
    authenticated: false,
    activePage: 'list-of-places'
}

const initRouting = () => {
    for (const [selector, route] of Object.entries(routing)) {
        pages[route.src].querySelector(selector).addEventListener('click', (event) => {
            event.preventDefault();

            let previous = context.activePage;
            context.activePage = route.dst;
            pages[previous].replaceWith(pages[context.activePage]);
        });
    }
}

initRouting()

root.replaceChildren(pages[context.activePage])
