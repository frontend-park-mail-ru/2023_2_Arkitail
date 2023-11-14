const DATA_ERROR = "Неверный логин или пароль";
const LOGIN_SERVER_ERROR = "Server error";

class LoginForm extends Page {
  constructor() {
    super('login form', LOGIN_PAGE_TEMPLATE);
    this.preroute = this.clear;
  }

  submit() {
    const method = 'POST';
    const headers = {
      'Content-Type': 'application/json',
    };

    const inputs = this.node.querySelector('form').elements;

    const body = JSON.stringify({
      email: inputs['email'].value,
      password: inputs['password'].value,
    });

    this.login(
      {
        method: method,
        headers: headers,
        body: body,
      }
    ).then(response => {
      if (response.status == 204) {
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
    [...inputs].forEach(input => input.value = "");
    this.errorMessage.innerText = ""
  }

  /**
   * 
   * @param {object} fetchBody 
   * @returns {Promise}
   */
  async login(fetchBody) {
    return fetch(
      API_V1_URL + "/login",
      fetchBody,
    ).then(response => {
      if (response.status == 204) {
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
