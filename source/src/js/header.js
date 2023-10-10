class Header {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
        authenticate()
        this.template = Handlebars.compile(`
            <input class="side-menu" type="checkbox" id="side-menu" />
            <label class="hamb" for="side-menu">
                <span class="hamb-line"></span></label>

            <img class="logo" src="../../static/img/logo.svg" alt="GoTo" />

            <nav>
                <ul class="menu">
                {{#if authorized}}
                {{#each items}}
                    <li><a class="{{this.className}}" href="#">{{this.name}}</a></li>
                {{/each}}
                {{else}}
                {{#each items}}
                    {{#if this.showToUnauthorized}}
                    <li><a class="{{this.className}}" href="#">{{this.name}}</a></li>
                    {{/if}}
                {{/each}}
                {{/if}}
                </ul>
            </nav>
            {{#if authorized}}
            <div class="right-menu">
                <img class="heart" src="../../static/img/heart.svg" alt="GoTo" />
                <p class="heart hidden-on-mobile">Избранное</p>
            </div>
            {{else}}
            <button class="right-menu btn-register hidden-on-mobile {{urls.signup}}">
                <p>Регистрация</p>
            </button>
            <button class="right-menu btn-login {{urls.login}}">
                <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13.5928 1.52719C12.6806 0.542344 11.4065 0 10.0003 0C8.58652 0 7.30824 0.539062 6.40027 1.51781C5.48246 2.50734 5.03527 3.85219 5.14027 5.30437C5.34839 8.16937 7.52855 10.5 10.0003 10.5C12.472 10.5 14.6484 8.16984 14.8598 5.30531C14.9662 3.86625 14.5162 2.52422 13.5928 1.52719V1.52719ZM18.2503 21H1.75027C1.5343 21.0028 1.32042 20.9574 1.12419 20.8672C0.927959 20.7769 0.754316 20.6441 0.615893 20.4783C0.311206 20.1141 0.188393 19.6167 0.279331 19.1137C0.674956 16.9191 1.90964 15.0755 3.85027 13.7812C5.57433 12.6323 7.75824 12 10.0003 12C12.2423 12 14.4262 12.6328 16.1503 13.7812C18.0909 15.075 19.3256 16.9186 19.7212 19.1133C19.8121 19.6162 19.6893 20.1136 19.3846 20.4778C19.2463 20.6437 19.0726 20.7766 18.8764 20.867C18.6802 20.9573 18.4663 21.0028 18.2503 21V21Z"
                        fill="#047857" />
                </svg>

                <p>Войти</p>
            </button>
            {{/if}}
        `)

        this.parent.innerHTML = this.template({
            items: this.data.leftMenu,
            urls: this.data.urlClass, authorized: context.authenticated.status
        }) // значение authorized заменить на context.authenticated
    }
}