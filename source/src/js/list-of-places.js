class ListOfPlaces {
  constructor(parent) {
    this.parent = parent;
    this.template = Handlebars.compile(`
      <div data-filters></div>
      <div data-list class="list"></div>
    `);
    this.parent.innerHTML = this.template();
    this.list = this.parent.querySelector("[data-list]");
  }

  appendPlace(place) {
    new PlaceCard(this.list, place);
  }
}
