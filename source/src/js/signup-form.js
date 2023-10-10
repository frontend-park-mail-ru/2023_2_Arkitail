const LENGTH_LOGIN_TEMPLATE = /.{8,32}$/;
const LENGTH_LOGIN_ERROR = "Длина логина должна быть от 4 до 32";

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

function blockSpecialChars(template) {
  return template.replace(/\s[!@#$%^&*]/g, "\\$&")
}

class SignupForm {
  constructor(parent) {
    this.parent = parent;
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
        <p class="login">
          Уже есть аккаунт? <span class="goto-login-link">Войти</span>
        </p>
      </div>
    `);

    this.parent.innerHTML = this.template();

    this.inputs = parent.querySelector(".goto-form form").elements;

    this.validationMsg = this.parent.querySelector("[validation-msg]");

    this.parent
      .querySelector(".goto-form form")
      .addEventListener("submit", (event) => {
        event.preventDefault();

        const method = "POST";

        const headers = {
          "Content-Type": "application/json",
        };

        const inputs_to_validate = [
          {
            target: this.inputs["repeat-password"],
            templates: [
              {
                template: new RegExp("^" + blockSpecialChars(this.inputs["password"].value) + "$"),
                error: REPEAT_PASSWORD_ERROR,
              },
            ],
          },
          {
            target: this.inputs["password"],
            templates: [
              {
                template: SPECIAL_CHAR_PASSWORD_TEMPLATE,
                error: SPECIAL_CHAR_PASSWORD_ERROR,
              },
              {
                template: DIGIT_PASSWORD_TEMPLATE,
                error: DIGIT_PASSWORD_ERROR,
              },
              {
                template: LOWERCASE_PASSWORD_TEMPLATE,
                error: LOWERCASE_PASSWORD_ERROR,
              },
              {
                template: UPPERCASE_PASSWORD_TEMPLATE,
                error: UPPERCASE_PASSWORD_ERROR,
              },
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

        if (!this.validateInputs(inputs_to_validate)) {
          console.error("Some invalid inputs");
          return;
        }

        const body = JSON.stringify({
          login: this.inputs["name"].value,
          password: this.inputs["password"].value,
        });

        console.log(body);

        fetch(API_V1_URL + "signup", {
          method: method,
          headers: headers,
          body: body,
        }).then((response) => {
          console.log(response.headers);
          if (response.status == 200) {
            context.authenticated.status = true;
            this.validationMsg.innerText = "";
            inputs_to_validate.forEach((input) => {
              input.target.value = "";
            });
            console.log("Signup succeed");
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
}