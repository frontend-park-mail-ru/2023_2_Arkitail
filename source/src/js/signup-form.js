const LENGTH_LOGIN_TEMPLATE = /.{4,32}$/;
const LENGTH_LOGIN_ERROR = "Длина логина должна быть от 4 до 32";
const LOGIN_TEMPLATE = /^\S*$/;
const LOGIN_ERROR = "Логин не должен содержать пробелы";

const EMAIL_TEMPLATE = /^.*@.*$/;
const EMAIL_ERROR = "Введена некоректная почта";

const LENGTH_PASSWORD_TEMPLATE = /^\S{4,32}$/;
const LENGTH_PASSWORD_ERROR = "Длина пароля должна быть от 4 до 32";

const REPEAT_PASSWORD_ERROR = "Пароли не совпадают";

const USER_ALREADY_EXISTS_ERROR = "Пользователь уже существует";
const SIGNUP_SERVER_ERROR = "Server error";

const validationData = {
  'repeat-password': [
    {
      template: null,
      error: REPEAT_PASSWORD_ERROR,
    },
  ],
  'password': [
    {
      template: LENGTH_PASSWORD_TEMPLATE,
      error: LENGTH_PASSWORD_ERROR,
    },
  ],
  'email': [
    {
      template: EMAIL_TEMPLATE,
      error: EMAIL_ERROR,
    },
  ],
  'name': [
    {
      template: LOGIN_TEMPLATE,
      error: LOGIN_ERROR,
    },
    {
      template: LENGTH_LOGIN_TEMPLATE,
      error: LENGTH_LOGIN_ERROR,
    },
  ]
};

class SignupForm extends Page {
  constructor(template) {
    super('signup form', template);
    this.template = Handlebars.compile(`
      <div class="goto-form">
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
          <!-- <div class="input-group-label">Дата рождения</div>
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
          </div> -->
          <div class="form-submit submit">
            <input name="submit" type="submit" value="Зарегистрироваться" />
          </div>

          <div>
              <p error class="validation-error"></p>
          </div>
        </form>
        <div class="form-footer">
          <p gateway="login" class="login">
            Уже есть аккаунт? <span class="goto-login-link">Войти</span>
          </p>
        </div>
      </div>
    `);

    this.render({});
    this.errorMessage = this.node.querySelector("[error]");
    this.node
    .querySelector('form')
    .addEventListener('submit', event => {
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

    validationData['repeat-password'][0].template = new RegExp('^' + inputs['password'].value + '$');
    if (!this.validateInputs(Array.from(inputs).filter(item => item.type !== 'submit'), validationData)) {
      console.error("Some invalid inputs");
      return;
    }

    const body = JSON.stringify({
      login: inputs['name'].value,
      password: inputs['password'].value,
    });

    this.signup({
      method: method,
      headers: headers,
      body: body,
    }).then(response => {
      if (response.status == 200) {
        this.clear();
        main.route('list-of-places');
      } else if (response.status == 401) {
      } else {
      }
    });
  }

  clear() {
    const inputs = this.node.querySelector('form').elements;
    Array.from(inputs).filter(item => item.type !== 'submit').forEach(input => input.value = "");
  }

  validate(input, validationData) {
    return validationData.reduce((accumulator, tmp) => {
      if (input.value.match(tmp.template)) {
        return accumulator;
      }

      console.error(
        "Target does not match template:",
        input.value,
        tmp.template,
      );

      this.errorMessage.innerText = tmp.error;

      return false;
    }, true);
  }

  validateInputs(inputs, validationData) {
    return inputs.reduce((acc, input) => {
      if (!this.validate(input, validationData[input.name])) {
        input.style["border-width"] = "2px";
        input.style["border-color"] = "red";
        return false;
      }

      input.style["border-width"] = null;
      input.style["border-color"] = null;

      return acc;
    }, true);
  }

  async signup(fetchBody) {
    if (main.temporaryContext.authenticated.pending) {
      console.error("[signup] Authentication request already pending");
      return null;
    }

    main.temporaryContext.authenticated.pending = true;

    return fetch(
      API_V1_URL + 'signup',
      fetchBody,
    ).then(response => {
      main.temporaryContext.authenticated.pending = false;
      if (response.status == 200) {
        main.temporaryContext.authenticated.status = true;
      } else if (response.status == 401) {
        main.temporaryContext.authenticated.status = false;
      } else {
        main.temporaryContext.authenticated.status = false;
        console.error('Signup fatal error');
      }

      return response;
    });
  }
}
