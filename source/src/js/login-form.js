const DATA_ERROR = "Неверный логин или пароль";
const LOGIN_SERVER_ERROR = "Server error";

class LoginForm {
  constructor(parent) {
    this.parent = parent;
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
            <p gateway="signup" class="register">
                <span class="goto-signup-link">Зарегестрироваться</span>
            </p>
        </div>
    `);

    this.parent.innerHTML = this.template();
    this.parent
    .querySelectorAll(`[gateway]`)
    .forEach(elem => elem.addEventListener('click', function(event) {
        event.preventDefault();
        context.activePage = event.currentTarget.getAttribute('gateway');
        render();
    }));

    this.validationMsg = this.parent.querySelector("[validation-msg]");
    this.inputs = this.parent.querySelector(".goto-form form").elements;

    this.arrInputs = [this.inputs["login"], this.inputs["password"]];

    this.parent
      .querySelector(".goto-form form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        this.login().then(header.authRender);
      });
  }

  login() {
    if (context.activePage != "login") {
      console.error("You are not on login page");
      return null;
    }

    if (context.authenticated.pending) {
      console.error("[login()] Authentication request already pending");
      return null;
    }

    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      login: this.inputs["login"].value,
      password: this.inputs["password"].value,
    });

    context.authenticated.pending = true;

    return fetch(API_V1_URL + "login", {
      method: method,
      headers: headers,
      body: body,
    }).then((response) => {
      if (response.status == 200) {
        this.arrInputs.forEach((input) => {
          input.value = "";
          input.style["border-width"] = null;
          input.style["border-color"] = null;
        });
        this.validationMsg.innerText = "";
        context.authenticated.status = true;
        console.log("Login succeed");
        context.activePage = 'list-of-places';
        render();
      } else if (response.status == 401) {
        this.validationMsg.innerText = DATA_ERROR;
        this.arrInputs.forEach((input) => {
          input.style["border-width"] = "2px";
          input.style["border-color"] = "red";
        });
        context.authenticated.status = false;
      } else {
        this.validationMsg.innerText = LOGIN_SERVER_ERROR;
        context.authenticated.status = false;
        console.error("Login fatal error");
      }

      context.authenticated.pending = false;
    });
  }
}
