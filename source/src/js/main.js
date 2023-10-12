const API_V1_URL = '/api/v1/';

class Main {
    constructor() {
        this.headerSlot = document.querySelector('header');
        this.header = new Header('');
        this.mainSlot = document.querySelector('main');

        this.context = {
            activePage: 'list-of-places',
            authenticated: {
                pending: false,
                status: true,
            }
        };

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

        this.route('list-of-places');
    }

    async authenticate() {
        if (this.context.authenticated.pending) {
            console.error("[authenticate()] Authentication request already pending")
        }

        const requestMethod = 'GET';

        this.context.authenticated.pending = true;

        return fetch(
            API_V1_URL + 'auth',
            {
                credentials: 'include',
                method: requestMethod,
            }
        ).then(response => {
            if (response.status == 200) {
                this.context.authenticated.status = true;
            } else if (response.status == 401) {
                this.context.authenticated.status = false;
            } else {
                this.context.authenticated.status = false;
                console.error('Authentication fatal error');
            }

            this.context.authenticated.pending = false;
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

        this.context.activePage = pageName;
        this.mainSlot.replaceChildren(this.pages[pageName].instance.node);
    }
}

let main = new Main();
