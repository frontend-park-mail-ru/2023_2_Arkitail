class Header extends Page {
    constructor(template) {
        super('header', template);

        this.template = Handlebars.compile(`
            <input class="side-menu" type="checkbox" id="side-menu" />
            <label class="hamb" for="side-menu">
                <span class="hamb-line"></span></label>

            <img class="logo" src="/static/img/logo.svg" alt="GoTo" />

            <nav>
                <ul class="menu">
                {{#each menu}}
                {{#if this.show}}
                    <li><a class="{{this.styleClass}}" {{this.attr}} href="{{this.url}}">{{this.name}}</a></li>
                {{/if}}
                {{/each}}
                </ul>
            </nav>
            {{#if authenticated}}
            <div class="right-menu authorized">
                <div class="avatar">
                    <img src=""/>
                </div>
                <p class="hidden-on-mobile">{{this.userName}}</p>
            </div>
            <div class="right-menu authorized">
                <img class="heart" src="../../static/img/heart.svg" alt="GoTo" />
                <p class="heart hidden-on-mobile">Избранное</p>
            </div>
            {{else}}
            <button gateway="signup" class="right-menu btn-register hidden-on-mobile">
                <p>Регистрация</p>
            </button>
            <button gateway="login" class="right-menu btn-login">
                <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5928 1.52719C12.6806 0.542344 11.4065 0 10.0003 0C8.58652 0 7.30824 0.539062 6.40027 1.51781C5.48246 2.50734 5.03527 3.85219 5.14027 5.30437C5.34839 8.16937 7.52855 10.5 10.0003 10.5C12.472 10.5 14.6484 8.16984 14.8598 5.30531C14.9662 3.86625 14.5162 2.52422 13.5928 1.52719V1.52719ZM18.2503 21H1.75027C1.5343 21.0028 1.32042 20.9574 1.12419 20.8672C0.927959 20.7769 0.754316 20.6441 0.615893 20.4783C0.311206 20.1141 0.188393 19.6167 0.279331 19.1137C0.674956 16.9191 1.90964 15.0755 3.85027 13.7812C5.57433 12.6323 7.75824 12 10.0003 12C12.2423 12 14.4262 12.6328 16.1503 13.7812C18.0909 15.075 19.3256 16.9186 19.7212 19.1133C19.8121 19.6162 19.6893 20.1136 19.3846 20.4778C19.2463 20.6437 19.0726 20.7766 18.8764 20.867C18.6802 20.9573 18.4663 21.0028 18.2503 21V21Z"
                        fill="#047857" />
                </svg>
                <p>Войти</p>
            </button>
            {{/if}}
        `);

        this.render();
    }

    render(context) {
        super.render(context);

        this.node
        .querySelectorAll('[data-logout]')
        .forEach(elem => elem.addEventListener('click', event => {
            event.preventDefault();
            fetch(
                '/api/v1/logout', 
                {
                    method: 'DELETE'
                }
            )
            .then(() => main.route(main.context.activePage));
        }));
    }

    generateContext() {
        let context = {
            userName: main.temporaryContext.userName,
            authenticated: main.temporaryContext.authenticated.status,
            menu: [
                {
                    name: 'Поиск',
                    url: '#',
                    authOnly: false,
                    show: true,
                    attr: '',
                    styleClass: '',
                },
                {
                    name: 'Выйти',
                    url: '#',
                    authOnly: true,
                    show: true,
                    attr: 'data-logout',
                    styleClass: 'logout',
                }
            ]
        };

        context.menu.forEach(elem => {
            elem.show = context.authenticated || !elem.authOnly
        });

        return context
    }
}
