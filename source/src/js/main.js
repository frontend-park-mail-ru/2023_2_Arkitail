const API_V1_URL = '/api/v1/';

class Main {
    constructor() {
        this.headerSlot = document.querySelector('header');
        this.header = new Header('');
        this.mainSlot = document.querySelector('main');

        this.context = {
            activePage: 'list-of-places',
        };

        this.temporaryContext = {
            authenticated: {
                pending: false,
                status: true,
            }
        }

        this.restoreState();

        this.pages = {
            'login': {
                renderHeader: false,
                instance: new LoginForm(''),
            },
            'signup': {
                renderHeader: false,
                instance: new SignupForm(''),
            },
            'list-of-places': {
                renderHeader: true,
                instance: new ListOfPlaces(''),
            },
        };

        this.route(this.context.activePage);
    }

    async authenticate() {
        if (this.temporaryContext.authenticated.pending) {
            console.error("[authenticate()] Authentication request already pending")
        }

        const requestMethod = 'GET';

        this.temporaryContext.authenticated.pending = true;

        return fetch(
            API_V1_URL + 'auth',
            {
                credentials: 'include',
                method: requestMethod,
            }
        ).then(response => {
            if (response.status == 200) {
                this.temporaryContext.authenticated.status = true;
            } else if (response.status == 401) {
                this.temporaryContext.authenticated.status = false;
            } else {
                this.temporaryContext.authenticated.status = false;
                console.error('Authentication fatal error');
            }

            this.temporaryContext.authenticated.pending = false;
        });
    }

    route(pageName) {
        if (this.pages[pageName].renderHeader) {
            this.authenticate().then(() => {
                this.header.render();
                this.headerSlot.replaceChildren(this.header.node);
            });
        } else {
            this.headerSlot.replaceChildren();
        }

        if (pageName != this.context.activePage) {
            this.context.activePage = pageName;
            window.history.pushState(this.context, '');
            console.log("HELLO");
        }

        this.context.activePage = pageName;
        this.mainSlot.replaceChildren(this.pages[pageName].instance.node);
    }

    restoreState() {
        let state = window.history.state;
        if (state !== null) {
            this.context = state;
        } else {
            this.context.activePage = 'list-of-places';
        }
    }

    popState(event) {
        this.restoreState();
        this.route(this.context.activePage);
    }
}

let main = new Main();
window.addEventListener('popstate', event => main.popState(event));