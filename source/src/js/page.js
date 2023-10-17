class Page {
    constructor(classes, template) {
        this.classes = classes;
        this.node = document.createElement('div');
        this.node.className = classes;
        this.template = Handlebars.compile(template);
    }

    render(context) {
        this.node.remove();
        this.node = document.createElement('div');
        this.node.className = this.classes;
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