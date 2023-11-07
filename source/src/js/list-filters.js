class ListFilters {
  constructor() {
    this.block = document.createElement("div");
    this.block.className = "filters";
    this.block.setAttribute("data-filters", "");
    this.template = Handlebars.compile(`
          Очень скоро тут будут фильтры <3
      `);
    this.block.innerHTML = this.template();
  }

  getHtml() {
    return this.block;
  }
}
