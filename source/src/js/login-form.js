const DATA_ERROR = "Неверный логин или пароль";
const LOGIN_SERVER_ERROR = "Server error";

class LoginForm extends Page {
  constructor(template) {
    super('login form', template);
    this.template = Handlebars.compile(`
      <div class="goto-form">
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
                <p error class="validation-error"></p>
            </div>
        </form>
        <div class="form-footer">
            <p class="forgot-password">Забыли пароль?</p>
            <p class="non-registered">Ещё не зарегестрированы?</p>
            <p gateway="signup" class="register">
                <span class="goto-signup-link">Зарегестрироваться</span>
            </p>
        </div>
      </div>
    `);

    this.render({}); this.errorMessage = this.node.querySelector("[error]");

    this.node
      .querySelector("form")
      .addEventListener("submit", event => {
        event.preventDefault();
        this.submit();
      });
  }

  submit() {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };

    const inputs = this.node.querySelector('form').elements;

    const body = JSON.stringify({
      login: inputs['login'].value,
      password: inputs['password'].value,
    });

    this.login(
      {
        method: method,
        headers: headers,
        body: body,
      }
    ).then(response => {
      if (response.status == 200) {
        this.errorMessage.innerText = "";
        this.clear();
        main.route('list-of-places');
      } else if (response.status == 401) {
        this.errorMessage.innerText = DATA_ERROR;
      } else {
        this.errorMessage.innerText = LOGIN_SERVER_ERROR;
      }
    });

  }

  clear() {
    const inputs = this.node.querySelector('form').elements;
    [...inputs].forEach(input => input.value = "");
  }

  login(fetchBody) {
    if (main.temporaryContext.authenticated.pending) {
      console.error("[login()] Authentication request already pending");
      return null;
    }

    main.temporaryContext.authenticated.pending = true;

    return fetch(
      API_V1_URL + "login",
      fetchBody,
    ).then(response => {
      main.temporaryContext.authenticated.pending = false;

      if (response.status == 200) {
        main.temporaryContext.authenticated.status = true;
      } else if (response.status == 401) {
        main.temporaryContext.authenticated.status = false;
      } else {
        main.temporaryContext.authenticated.status = false;
        console.error("Login fatal error");
      }

      return response;
    });
  }
}
