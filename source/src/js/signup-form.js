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

class SignupForm extends Page {
  constructor(template) {
    super(template);
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
            <p validation-msg class="validation-error"></p>
        </div>
      </form>
      <div class="form-footer">
        <p gateway="login" class="login">
          Уже есть аккаунт? <span class="goto-login-link">Войти</span>
        </p>
      </div>
    `);

    this.render({});
    this.inputs = this.node.querySelector("form").elements;

    this.validationMsg = this.node.querySelector("[validation-msg]");

    this.node
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const method = "POST";

        const headers = {
          "Content-Type": "application/json",
        };

        const inputsToValidate = [
          {
            target: this.inputs["repeat-password"],
            templates: [
              {
                template: new RegExp("^" + this.inputs["password"].value + "$"),
                error: REPEAT_PASSWORD_ERROR,
              },
            ],
          },
          {
            target: this.inputs["password"],
            templates: [
              {
                template: LENGTH_PASSWORD_TEMPLATE,
                error: LENGTH_PASSWORD_ERROR,
              },
            ],
          },
          {
            target: this.inputs["email"],
            templates: [
              {
                template: EMAIL_TEMPLATE,
                error: EMAIL_ERROR,
              },
            ],
          },
          {
            target: this.inputs["name"],
            templates: [
              {
                template: LOGIN_TEMPLATE,
                error: LOGIN_ERROR,
              },
              {
                template: LENGTH_LOGIN_TEMPLATE,
                error: LENGTH_LOGIN_ERROR,
              },
            ],
          },
        ];

        if (!this.validateInputs(inputsToValidate)) {
          console.error("Some invalid inputs");
          return;
        }

        const body = JSON.stringify({
          login: this.inputs["name"].value,
          password: this.inputs["password"].value,
        });

        console.log(body);

        this.signup({
          method: method,
          headers: headers,
          body: body,
        }).then(response => {
          if (response.status == 200) {
            this.validationMsg.innerText = '';
            inputsToValidate.forEach(input => {
              input.target.value = "";
            });

            main.route('list-of-places');
          } else if (response.status == 401) {
            this.validationMsg.innerText = USER_ALREADY_EXISTS_ERROR;
          } else {
            this.validationMsg.innerText = SIGNUP_SERVER_ERROR;
            console.error("Signup fatal error");
          }
        });
      });
  }

  validate(input) {
    return input.templates.reduce((accumulator, template) => {
      if (input.target.value.match(template.template)) {
        return accumulator && true;
      }

      console.error(
        "Target does not match template:",
        input.target.value,
        template.template
      );
      this.validationMsg.innerText = template.error;
      return false;
    }, true);
  }

  validateInputs(inputs) {
    return inputs.reduce((acc, input) => {
      if (!this.validate(input)) {
        input.target.style["border-width"] = "2px";
        input.target.style["border-color"] = "red";
        return acc && false;
      }

      input.target.style["border-width"] = null;
      input.target.style["border-color"] = null;
      return acc;
    }, true);
  }

  async signup(fetchBody) {
        return fetch(
          API_V1_URL + 'signup',
          fetchBody,
        ).then(response => {
          if (main.temporaryContext.authenticated.pending) {
            return response;
          }

          main.temporaryContext.authenticated.pending = true;

          if (response.status == 200) {
            main.temporaryContext.authenticated.status = true;
          } else if (response.status == 401) {
            main.temporaryContext.authenticated.status = false;
          } else {
            main.temporaryContext.authenticated.status = false;
          }

          main.temporaryContext.authenticated.pending = false;
          return response;
        });
    }
}
