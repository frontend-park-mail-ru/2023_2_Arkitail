class ListOfPlaces {
  constructor(parent) {
    this.parent = parent;
    this.template = Handlebars.compile(`
      <div filters></div>
      <div list class="list"></div>
    `);
    this.parent.innerHTML = this.template();
    this.list = this.parent.querySelector("[list]");
  }

  appendPlace(place) {
    new PlaceCard(this.list, place);
  }
}
