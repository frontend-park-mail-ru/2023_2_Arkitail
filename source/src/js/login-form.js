class LoginForm {
    constructor(parent) {
        this.parent = parent
        this.template = Handlebars.compile(`
        <figure class="logo">
            <img src="/static/img/logo.svg" alt="GoTo" />
            <figcaption>
                <p class="title">Время путешествовать</p>
            </figcaption>
        </figure>
        <form>
            <div class="form-item email">
                <input name="login" type="text" placeholder="Ваш логин" />
            </div>
            <div class="form-item password">
                <input name="password" type="password" placeholder="Ваш пароль" />
            </div>
            <div class="form-submit submit">
                <input type="submit" value="Войти" />
            </div>

            <div>
                <p validation-msg class="validation-error"></p>
            </div>
        </form>
        <div class="form-footer">
            <p class="forgot-password">Забыли пароль?</p>
            <p class="non-registered">Ещё не зарегестрированы?</p>
            <p class="register">
                <span class="goto-signup-link">Зарегестрироваться</span>
            </p>
        </div>
        `)

        this.parent.innerHTML = this.template()
    }
}
