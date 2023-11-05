const API_V1_URL = '/api/v1';

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
      activePage: 'trips',
      location: '#page=trips;',
    };

    this.temporaryContext = {
      authenticated: false,
      userName: '',
      userId: -1,
    }

    this.restoreState();
  }

  init() {
    this.headerSlot = document.querySelector('header');
    this.header = new Header('');
    this.mainSlot = document.querySelector('main');
    this.footer = new Footer('');
    this.footerSlot = document.querySelector('footer');

    this.pages = {
      'login': {
        renderHeader: false,
        instance: new LoginForm(''),
      },
      'signup': {
        renderHeader: false,
        instance: new SignupForm(''),
      },
      'list-of-places': {
        renderHeader: true,
        instance: new MainPage(''),
      },
      'trips': {
        renderHeader: true,
        instance: new TripsPage(),
      },
      'trip': {
        renderHeader: true,
        instance: new TripPage(),
      },
    };

    this.route(this.context.location);
  }

  /**
   * Функция authenticate отправляет запрос на авторизацию
   * и возвращает промис запроса
   * @returns {Promise} промис запроса авторизации
   */
  async authenticate() {
    return fetch(
      API_V1_URL + '/auth',
      {
        credentials: 'include',
        method: 'GET',
      }
    ).then(response => {
      if (response.status == 200) {
        this.temporaryContext.authenticated = true;
      } else {
        this.temporaryContext.authenticated = false;
        throw new Error('authenticate failed');
      }
    }).catch(_ => {});
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
        throw new Error('user failed');
      }

      return response.json();
    }).then(data => {
      this.temporaryContext.userName = data['user']['login'];
      this.temporaryContext.userId = data['user']['id'];
    }).catch(_ => {});
  }

  unserializeLocationHash(parameters) {
    let hash = '#';
    for (const [k, v] of parameters) {
      hash += `${k}=${v};`;
    }
    return hash;
  }

  serializeLocationHash(hash) {
    const hashTemplate = /^#(\S+=\S*;)*$/;
    if (!hash.match(hashTemplate)) {
      throw new Error('Wrong location');
    }

    // discarding hash symbol and last end of element
    hash = hash.substring(1, hash.length - 1);
    let parameters = {};

    hash.split(';').forEach(elem => {
      elem = elem.split('=');
      let k = elem[0], v = elem[1];     

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
    let pageName = parameters['page'];
    this.context.location = location;

    if (this.pages[pageName].renderHeader) {
        this.getUserInfo()
        .then(() => {
          this.header.generateContext();
          this.header.render();
          this.headerSlot.style.display = 'block';
          this.headerSlot.replaceChildren(this.header.node);

          this.footer.render();
          this.footerSlot.style.display = 'block';
          this.footerSlot.replaceChildren(this.footer.node);
        });
    } else {
      this.headerSlot.style.display = 'none';
      this.headerSlot.replaceChildren();

      this.footerSlot.style.display = 'none';
      this.footerSlot.replaceChildren();
    }

    if (pageName != this.context.activePage) {
      this.context.activePage = pageName;

      // at the moment, context is not needed
      window.history.pushState(this.context, '', this.context.location);
    }

    this.context.activePage = pageName;
  
    this.pages[pageName].instance.render().then(() => {
      this.mainSlot.replaceChildren(this.pages[pageName].instance.node);
    });
  }

  /**
   * Данная функция восстанавливает состояние страницы
   * используя HistoryApi
   */
  restoreState() {
    if (window.location.hash == '') {
      window.history.pushState(this.context, '', '#page=trips;');
      return;
    }

    let state = window.history.state;
  
    if (state !== null) {
      this.context = state;
    } else {
      this.context = {
        activePage: 'trips',
        location: '#page=trips;',
      }
    }
  }

  /**
   * Обработчик события перемещения по истории
   * @param {Event} event 
   */
  popState(_) {
    this.restoreState();
    this.route(this.context.location);
  }
}

let main = new Main();
main.init();
window.addEventListener('popstate', event => main.popState(event));
