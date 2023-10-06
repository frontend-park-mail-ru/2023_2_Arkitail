class SignupForm {
    constructor(parent) {
        this.parent = parent
        this.template = Handlebars.compile(`
          <figure class="logo">
            <img src="/static/img/logo.svg" alt="GoTo" />
            <figcaption>
              <p class="title">Начните путешествовать сейчас</p>
              <p>моментальная регистрация</p>
            </figcaption>
          </figure>
          <form>
            <div class="form-item name">
              <input name="name" type="text" placeholder="Ваше имя" />
            </div>
            <div class="form-item email">
              <input name="email" type="text" placeholder="Ваша почта" />
            </div>
            <div class="form-item password">
              <input name="password" type="password" placeholder="Ваш пароль" />
            </div>
            <div class="form-item repeat-password">
              <input
                name="repeat-password"
                type="password"
                placeholder="Ваш пароль еще раз"
              />
            </div>
            <div class="input-group-label">Дата рождения</div>
            <div class="form-item input-group">
              <div class="input-group-item">
                <input name="day" type="text" placeholder="День" />
              </div>
              <div class="input-group-item">
                <input name="month" type="text" placeholder="Месяц" />
              </div>
              <div class="input-group-item">
                <input name="year" type="text" placeholder="Год" />
              </div>
            </div>
            <div class="form-submit submit">
              <input name="submit" type="submit" value="Зарегестрироваться" />
            </div>
          </form>
          <div class="form-footer">
            <p class="login">
              Уже есть аккаунт? <span class="goto-login-link">Войти</span>
            </p>
          </div>
        `)

        this.parent.innerHTML = this.template()
    }
}
