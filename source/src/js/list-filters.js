class ListFilters {
  constructor(parent) {
    this.parent = parent;
    this.template = Handlebars.compile(`
        <div data-filters>
            Очень скоро тут будут фильтры <3
        </div>
      `);
    this.parent.innerHTML = this.template();
  }
}
