const LENGTH_LOGIN_TEMPLATE = /.{4,32}$/;
const LENGTH_LOGIN_ERROR = "Длина логина должна быть от 4 до 32";

const LOGIN_TEMPLATE = /^\S*$/;
const LOGIN_ERROR = "Логин не должен содержать пробелы";

const EMAIL_TEMPLATE = /^\w+@\w+\.\w+$/;
const EMAIL_ERROR = "Введена некоректная почта";

const LENGTH_PASSWORD_TEMPLATE = /^\w{4,32}$/;
const LENGTH_PASSWORD_ERROR = "Длина пароля должна быть от 4 до 32";

const REPEAT_PASSWORD_ERROR = "Пароли не совпадают"

const YEAR_TEMPLATE = /^\d{4}$/;
const YEAR_ERROR = "";

const MONTH_TEMPLATE = /^\d{1,2}$/;
const MONTH_ERROR = "";

const DAY_TEMPLATE = /^\d{1,2}$/;
const DAY_ERROR = "";

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
        `)

    this.parent.innerHTML = this.template()

    this.inputs = parent.querySelector('.goto-form form').elements;

    this.validationMsg = this.parent.querySelector('[validation-msg]')

    this.parent.querySelector('.goto-form form').addEventListener('submit', event => {

      event.preventDefault();

      const method = 'POST';

      const headers = {
        'Content-Type': 'application/json'
      };

      const inputs_to_validate = [
        {
          target: this.inputs['repeat-password'],
          templates: [
            {
              template: new RegExp('^' + this.inputs['password'].value + '$'),
              error: REPEAT_PASSWORD_ERROR,
            },
          ],

        },
        {
          target: this.inputs['password'],
          templates: [
            {
              template: LENGTH_PASSWORD_TEMPLATE,
              error: LENGTH_PASSWORD_ERROR,
            },
          ],
        },
        {
          target: this.inputs['email'],
          templates: [
            {
              template: EMAIL_TEMPLATE,
              error: EMAIL_ERROR,
            },
          ],

        },
        {
          target: this.inputs['name'],
          templates: [
            {
              template: LOGIN_TEMPLATE,
              error: LOGIN_ERROR,
            },
            {
              template: LENGTH_LOGIN_TEMPLATE,
              error: LENGTH_LOGIN_ERROR,
            }
            ,
          ],
        },
      ]

      if (!this.validate_inputs(inputs_to_validate)) {
        console.error('Some invalid inputs');
        return
      }

      const body = JSON.stringify({
        login: this.inputs['name'].value,
        password: this.inputs['password'].value
      });

      console.log(body);
      this.validationMsg.innerText = ""
      inputs_to_validate.forEach((input) => {
        input.target.value = ""
      })

      fetch(
        API_V1_URL + 'signup',
        {
          method: method,
          headers: headers,
          body: body
        }
      ).then(response => {
        console.log(response.headers);
      })

    });
  }

  validate(input) {
    return input.templates.reduce((accumulator, template) => {
      if (input.target.value.match(template.template)) {
        return accumulator && true
      }

      console.error("Target does not match template:", input.target.value, template.template)
      this.validationMsg.innerText = template.error
      return false;
    }, true);
  }

  validate_inputs(inputs) {
    return inputs.reduce((acc, input) => {
      if (!this.validate(input)) {
        input.target.style['border-width'] = '2px';
        input.target.style['border-color'] = 'red';
        return acc && false
      }

      input.target.style['border-width'] = null;
      input.target.style['border-color'] = null;
      return acc;
    }, true);
  }
}
