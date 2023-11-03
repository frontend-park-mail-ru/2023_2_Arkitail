const DATA_ERROR = "Неверный логин или пароль";
const LOGIN_SERVER_ERROR = "Server error";

class LoginForm extends Page {
  // @param {string} template
  constructor(template) {
    super('login form', template);
    this.preroute = this.clear;
    this.template = Handlebars.compile(`
      <div class="goto-form">
        <figure class="logo">
            <img gateway='#page=main;' src="/static/img/logo.svg" alt="GoTo" />
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
                <input class="btn fill-green-btn" type="submit" value="Войти" />
            </div>

            <div>
                <p error class="validation-error"></p>
            </div>
        </form>
        <div class="form-footer">
            <p class="forgot-password">Забыли пароль?</p>
            <p class="non-registered">Ещё не зарегестрированы?</p>
            <p gateway="#page=signup;" class="register">
                <span class="goto-signup-link">Зарегестрироваться</span>
            </p>
        </div>
      </div>
    `);
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
        this.clear();
        main.route('#page=main;');
      } else if (response.status == 401) {
        this.errorMessage.innerText = DATA_ERROR;
      } else {
        this.errorMessage.innerText = LOGIN_SERVER_ERROR;
      }
    });

  }

  clear() {
    const inputs = this.node.querySelector('form').elements;
    Array.from(inputs).filter(item => item.type !== 'submit').forEach(input => input.value = "");
    this.errorMessage.innerText = "";
  }

  /**
   * 
   * @param {object} fetchBody 
   * @returns {Promise}
   */
  async login(fetchBody) {
    return fetch(
      API_V1_URL + "login",
      fetchBody,
    ).then(response => {
      if (response.status == 200) {
        main.temporaryContext.authenticated = true;
      } else if (response.status == 401) {
        main.temporaryContext.authenticated = false;
      } else {
        main.temporaryContext.authenticated = false;
        console.error("Login fatal error");
      }

      return response;
    });
  }

  async renderTemplate() {
    await super.renderTemplate();

    this.errorMessage = this.node.querySelector("[error]");

    this.node
    .querySelector("form")
    .addEventListener("submit", event => {
      event.preventDefault();
      this.submit();
    });
  }
}
