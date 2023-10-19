const API_V1_URL = '/api/v1/';

/**
 * Класс Main представляет собой общий контекст приложения
 * он отвечает за роутинг между страницами, а также хранит
 * и обновляет информацию об авторизации пользователя
 */
class Main {
    /**
     * Конструктор класса Main
     */
    constructor() {
        this.headerSlot = document.querySelector('header');
        this.header = new Header('');
        this.mainSlot = document.querySelector('main');
        this.footer = new Footer('');
        this.footerSlot = document.querySelector('footer');

        this.context = {
            activePage: 'list-of-places',
        };

        this.temporaryContext = {
            authenticated: {
                pending: false,
                status: true,
            },
            userName: '',
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
                instance: new MainPage(''),
            },
        };

        this.route(this.context.activePage);
    }

    /**
     * Функция authenticate отправляет запрос на авторизацию
     * и возвращает промис запроса
     * @returns {Promise} промис запроса авторизации
     */
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
            this.temporaryContext.authenticated.pending = false;

            if (response.status == 200) {
                this.temporaryContext.authenticated.status = true;
            } else if (response.status == 401) {
                this.temporaryContext.authenticated.status = false;
            } else {
                this.temporaryContext.authenticated.status = false;
                console.error('Authentication fatal error');
            }
        });
    }

    async getUserInfo() {
        return fetch(
            API_V1_URL + 'user',
            {
                method: 'GET',
            },
        ).then(response => response.json()
        ).then(data => {
            this.temporaryContext.userName = data['user']['login'];
        });
    }

    /**
     * Данная функция отвечает за перемещение по приложению.
     * Управляет также отображением хедера и футера
     * @param {string} название страницы из множества ключей Main.pages 
     */
    route(pageName) {
        if (this.pages[pageName].renderHeader) {
            this.authenticate().then(() => main.getUserInfo()).then(() => {
                this.header.render(this.header.generateContext());
                this.headerSlot.style.display = 'block';
                this.headerSlot.replaceChildren(this.header.node);

                this.footer.render({});
                this.footerSlot.style.display = 'block';
                this.footerSlot.replaceChildren(this.footer.node);
            });
        } else {
            this.headerSlot.style.display = 'none';
            this.headerSlot.replaceChildren();

            this.footerSlot.style.display = 'none';
            this.footerSlot.replaceChildren();
        }

        if (pageName != this.context.activePage) {
            this.context.activePage = pageName;
            window.history.pushState(this.context, '');
        }

        this.context.activePage = pageName;
        this.mainSlot.replaceChildren(this.pages[pageName].instance.node);
    }

    /**
     * Данная функция восстанавливает состояние страницы
     * используя HistoryApi
     */
    restoreState() {
        let state = window.history.state;
        if (state !== null) {
            this.context = state;
        } else {
            this.context.activePage = 'list-of-places';
        }
    }

    /**
     * Обработчик события перемещения по истории
     * @param {Event} event 
     */
    popState(event) {
        this.restoreState();
        this.route(this.context.activePage);
    }
}

let main = new Main();
window.addEventListener('popstate', event => main.popState(event));
