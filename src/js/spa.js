const root = document.querySelector('#root');

const pages = {
    'signup': document.querySelector('.goto-signup-page'),
    'login': document.querySelector('.goto-login-page')
};

const routing = {
    '.goto-login-link': {src: 'signup', dst: 'login'},
    '.goto-signup-link': {src: 'login', dst: 'signup'}
};

const initRouting = () => {
    for (const [selector, route] of Object.entries(routing)) {
        pages[route.src].querySelector(selector).addEventListener('click', (event) => {
            event.preventDefault();

            active = route.dst;
            activeNode.replaceWith(pages[active]);
            activeNode = pages[active];
        });
    }
}

initRouting()

let active = 'signup';
let activeNode = pages[active];
root.replaceChildren(activeNode)
