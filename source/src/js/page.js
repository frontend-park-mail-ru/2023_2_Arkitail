class Page {
    constructor(name, template) {
        this.name = name;
        this.node = document.createElement('div');
        this.node.className = name;
        this.template = Handlebars.compile(template);
    }

    render(context) {
        this.node.remove();
        this.node = document.createElement('div');
        this.node.innerHTML = this.template(context);

        this.node
        .querySelectorAll('[gateway]')
        .forEach(elem => elem.addEventListener('click', event => this.gateway(event)));
    }

    gateway(event) {
        event.preventDefault();
        main.route(event.currentTarget.getAttribute('gateway'));
    }
};