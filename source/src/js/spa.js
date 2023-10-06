const API_V1_URL = 'http://localhost:8080/api/v1/';

const root = document.querySelector('#root');
const pages = {
    'list-of-places': document.querySelector('.goto-list-of-places-page'),
    'signup': document.querySelector('.goto-signup-page'),
    'login': document.querySelector('.goto-login-page')
};

const routing = [
    {
        src: 'signup',
        dst: 'login',
        gateway: '.goto-login-link',
        callback: null
    },
    {
        src: 'login',
        dst: 'signup',
        gateway: '.goto-signup-link',
        callback: null
    },
    {
        src: 'list-of-places',
        dst: 'signup',
        gateway: '.goto-signup-link',
        callback: null
    },
    {
        src: 'list-of-places',
        dst: 'login',
        gateway: '.goto-login-link',
        callback: null
    },
];

let context = {
    authenticated: {pending: false, status: false},
    activePage: 'list-of-places',
    sessionId: ''
}

const initRouting = () => {
    routing.forEach(route => {
        pages[route.src].querySelector(route.gateway).addEventListener('click', (event) => {
            console.log("click")
            event.preventDefault();

            let previous = context.activePage;
            context.activePage = route.dst;
            pages[previous].replaceWith(pages[context.activePage]);
        });
    });
}

