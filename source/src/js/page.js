class Page {
  constructor(classes, template) {
    this.classes = classes;
    this.node = document.createElement('div');
    this.node.className = classes;
    this.template = Handlebars.compile(template);
    this.context = {};
  }

  async renderTemplate() {
    this.node.remove();
    this.node = document.createElement('div');
    this.node.className = this.classes;
    this.node.innerHTML = this.template(this.context);
  }

  async render() {
    await this.renderTemplate();

    this.node
    .querySelectorAll('[gateway]')
    .forEach(elem => elem.addEventListener('click', event => this.gateway(event)));

  }

  /**
   * 
   * @param {Event} event 
   */
  gateway(event) {
    event.preventDefault();

    this.preroute();
    main.route(event.currentTarget.getAttribute('gateway'));
    this.postroute();
  }

  preroute() {}

  postroute() {}
  
  async generateContext() {
    this.context = {};
  }
};
