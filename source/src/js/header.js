class Header extends Page {
    constructor() {
      super('header', HEADER_TEMPLATE);
    }

    renderTemplate() {
        this.generateContext();

        super.renderTemplate();
        this.node
        .querySelectorAll('[data-logout]')
        .forEach(elem => elem.addEventListener('click', event => {
          event.preventDefault();
          fetch('/api/v1/logout', { method: 'DELETE' })
          .then(() => {
            console.log(main.context.location);
            main.route(main.context.location);
          });
        }));
    }

    generateContext() {
      this.context = {
        userName: main.temporaryContext.userName,
        authenticated: main.temporaryContext.authenticated,
        menu: [
          {
            name: 'Поездки',
            url: '#page=trips;',
            authOnly: true,
            show: true,
            attr: '',
            styleClass: '',
          },
          
        ],
      };

      this.context.menu.forEach(elem => {
        elem.show = this.context.authenticated || !elem.authOnly
      });
    }
}
