const API_V1_URL = "/api/v1";

/**
 * Класс Main представляет собой общий контекст приложения
 * он отвечает за роутинг между страницами, а также хранит
 * и обновляет информацию об авторизации пользователя
 */
class Main {
  /**
   * Конструктор класса Main
   */
  constructor() {
    this.context = {
      activePage: "",
      location: "",
    };

    this.temporaryContext = {
      authenticated: false,
      userName: "",
      userId: -1,
    };
  }

  init() {
    this.headerSlot = document.querySelector("header");
    this.header = new Header();
    this.mainSlot = document.querySelector("main");
    this.footer = new Footer("");
    this.footerSlot = document.querySelector("footer");

    this.pages = {
      login: {
        renderHeader: false,
        instance: new LoginForm(),
        mustBeAuthorized: false,
      },
      signup: {
        renderHeader: false,
        instance: new SignupForm(),
        mustBeAuthorized: false,
      },
      main: {
        renderHeader: true,
        instance: new MainPage(),
        mustBeAuthorized: false,
      },
      trips: {
        renderHeader: true,
        instance: new TripsPage(),
        mustBeAuthorized: true,
      },
      trip: {
        renderHeader: true,
        instance: new TripPage(),
        mustBeAuthorized: true,
      },
      profile: {
        renderHeader: true,
        instance: new ProfilePage(),
        mustBeAuthorized: true,
      },
      place: {
        renderHeader: true,
        instance: new PlacePage(),
        mustBeAuthorized: false,
      },
      reviews: {
        renderHeader: true,
        instance: new ReviewsPage(),
        mustBeAuthorized: false,
      },
      search: {
        renderHeader: true,
        instance: new SearchPage(),
        mustBeAuthorized: false,
      },
    };
  }

  /**
   * Функция authenticate отправляет запрос на авторизацию
   * и возвращает промис запроса
   * @returns {Promise} промис запроса авторизации
   */
  async authenticate() {
    return fetch(API_V1_URL + "/auth", {
      credentials: "include",
      method: "GET",
    })
      .then((response) => {
        if (response.status == 200) {
          this.temporaryContext.authenticated = true;
        } else {
          this.temporaryContext.authenticated = false;
          throw new Error("authenticate failed");
        }
      })
      .catch((_) => {});
  }

  async getUserInfo() {
    return fetch(
      API_V1_URL + '/user',
      {
        method: 'GET',
      },
    ).then(response => {
      if (response.status == 200) {
        this.temporaryContext.authenticated = true;
      } else {
        this.temporaryContext.authenticated = false;
        throw Error('Unauthorized');
      }
      return response.json();
    }).then(data => {
      this.temporaryContext.userName = data['name'];
      this.temporaryContext.userId = data['id'];
      this.temporaryContext.birthday = data['birthDate']
      this.temporaryContext.about = data['about']
    }).catch(_ => {});
  }

  async updateUserInfo(newUserInfo) {
    try {
      const url = `/api/v1/user`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log("Данные пользователя успешно обновлены:", updatedUserData);
      } else if (response.status === 401) {
        console.error(
          "У вас нет прав доступа для обновления данных пользователя"
        );
      } else if (response.status === 404) {
        console.error("Пользователь с указанным userId не найден");
      } else {
        console.error("Ошибка при обновлении данных пользователя");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  }

  uploadFile(file) {
    fetch("/api/v1/user/avatar", {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    })
      .then((response) => {
        if (!response.ok) {
        }
        console.log("File uploaded successfully.");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }

  async upload(blobOrFile) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/v1/user/avatar", true);
    xhr.onload = function (e) {
      console.log(e);
    };

    xhr.send(blobOrFile);
  }

  unserializeLocationHash(parameters) {
    let hash = "#";
    for (const [k, v] of parameters) {
      hash += `${k}=${v};`;
    }
    return hash;
  }

  serializeLocationHash(hash) {
    const hashTemplate = /^#(\S+=\S*;)*$/;
    if (!hash.match(hashTemplate)) {
      throw new Error("Wrong location");
    }

    // discarding hash symbol and last end of element
    hash = hash.substring(1, hash.length - 1);
    let parameters = {};

    hash.split(";").forEach((elem) => {
      elem = elem.split("=");
      let k = elem[0],
        v = elem[1];

      parameters[k] = v;
    });

    return parameters;
  }

  /**
   * Данная функция отвечает за перемещение по приложению.
   * Управляет также отображением хедера и футера
   * @param {string} название страницы из множества ключей Main.pages
   */
  route(location) {
    let parameters = this.serializeLocationHash(location);
    let pageName = parameters["page"];
    this.context.location = location;

    this.getUserInfo().then(() => {
      let pageInfo = this.pages[pageName];
      if (pageInfo.mustBeAuthorized && !this.temporaryContext.authenticated) {
        this.route("#page=login;");
        return;
      }

      if (pageInfo.renderHeader) {
        this.header.render();
        this.headerSlot.style.display = "block";
        this.headerSlot.replaceChildren(this.header.node);
        this.footer.render();
        this.footerSlot.style.display = "block";
        this.footerSlot.replaceChildren(this.footer.node);
      } else {
        this.headerSlot.style.display = "none";
        this.headerSlot.replaceChildren();
        this.footerSlot.style.display = "none";
        this.footerSlot.replaceChildren();
      }

      if (this.context.activePage != pageName) {
        window.history.pushState(this.context, "", this.context.location);
        this.context.activePage = pageName;
      }
      this.reRender();
    });
  }

  reRender(pageName = this.context.activePage) {
    this.pages[pageName].instance.render().then(() => {
      // console.log(this.pages[pageName].instance.node);
      this.mainSlot.replaceChildren(this.pages[pageName].instance.node);
    });
  }

  /**
   * Данная функция восстанавливает состояние страницы
   * используя HistoryApi
   */
  restoreState() {
    if (window.location.hash == "") {
      this.route("#page=main;");
      return;
    }

    this.route(window.location.hash);
  }

  /**
   * Обработчик события перемещения по истории
   * @param {Event} event
   */
  popState(_) {
    this.restoreState();
  }
}

let main = new Main();
main.init();
main.restoreState();
window.addEventListener("popstate", (event) => main.popState(event));
