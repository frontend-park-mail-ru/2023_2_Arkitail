const LENGTH_LOGIN_TEMPLATE = /.{8,32}$/;
const LENGTH_LOGIN_ERROR = "Длина логина должна быть от 8 до 32";

const LOGIN_TEMPLATE = /^\S*$/;
const LOGIN_ERROR = "Логин не должен содержать пробелы";

const EMAIL_TEMPLATE = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const EMAIL_ERROR = "Введена некоректная почта";

// const PASSWORD_TEMPLATE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])$/;
// const PASSWORD_ERROR = "Пароль должен содержать хотя бы одну прописную букву, \
//               одну строчную букву, одну цифру, а также специальный символ";

const UPPERCASE_PASSWORD_TEMPLATE = /^.*(?=[A-Z])/;
const UPPERCASE_PASSWORD_ERROR =
  "Пароль должен содержать хотя бы одну прописную букву";

const LOWERCASE_PASSWORD_TEMPLATE = /^.*(?=[a-z])/;
const LOWERCASE_PASSWORD_ERROR =
  "Пароль должен содержать хотя бы одну строчную букву";

const DIGIT_PASSWORD_TEMPLATE = /^.*(?=[0-9])/;
const DIGIT_PASSWORD_ERROR = "Пароль должен содержать хотя бы одну цифру";

const SPECIAL_CHAR_PASSWORD_TEMPLATE = /^.*(?=[!@#$%^&*])/;
const SPECIAL_CHAR_PASSWORD_ERROR =
  "Пароль должен содержать хотя бы один специальный символ из !@#$%^&*";

const LENGTH_PASSWORD_TEMPLATE = /^.{8,32}$/;
const LENGTH_PASSWORD_ERROR = "Длина пароля должна быть от 8 до 32";

const REPEAT_PASSWORD_ERROR = "Пароли не совпадают";

const USER_ALREADY_EXISTS_ERROR = "Пользователь уже существует";
const SIGNUP_SERVER_ERROR = "Server error";

function ecsapeSpecialChars(template) {
  return template.replace(/\s[!@#$%^&*]/g, "\\$&")
}

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
    {
      template: UPPERCASE_PASSWORD_TEMPLATE,
      error: UPPERCASE_PASSWORD_ERROR,
    },
    {
      template: LOWERCASE_PASSWORD_TEMPLATE,
      error: LOWERCASE_PASSWORD_ERROR,
    },
    {
      template: DIGIT_PASSWORD_TEMPLATE,
      error: DIGIT_PASSWORD_ERROR,
    },
    {
      template: SPECIAL_CHAR_PASSWORD_TEMPLATE,
      error: SPECIAL_CHAR_PASSWORD_ERROR,
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
  // @param {string} template
  constructor(template) {
    super('signup form', template);
    this.preroute = this.clear;
    this.template = Handlebars.compile(`
      <div class="goto-form">
        <figure class="logo">
          <img gateway='list-of-places' src="/static/img/logo.svg" alt="GoTo" />
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

    validationData['repeat-password'][0].template = new RegExp('^' + ecsapeSpecialChars(inputs['password'].value) + '$');
    if (!this.validateInputs(Array.from(inputs).filter(item => item.type !== 'submit'), validationData)) {
      console.error("Some invalid inputs");
      return;
    }

    const body = JSON.stringify({
      login: inputs['name'].value,
      password: inputs['password'].value,
      email: inputs['email'].value,
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
        this.errorMessage.innerText = USER_ALREADY_EXISTS_ERROR;
      } else {
        this.errorMessage.innerText = SIGNUP_SERVER_ERROR;
      }
    });
  }

  clear() {
    const inputs = this.node.querySelector('form').elements;
    Array.from(inputs).filter(item => item.type !== 'submit').forEach(input => input.value = "");
    this.errorMessage.innerText = '';
  }

  // @return {boolean}
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

  // @return {boolean}
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

  // @return {{Promise|object}}
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
