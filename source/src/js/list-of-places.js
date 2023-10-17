class ListOfPlaces extends Page {
  constructor(template) {
    super('list-of-places', template);
    this.template = Handlebars.compile(`
      <div class="filters"></div>
      <div class="list-of-places"></div>
    `);

    // this.list = this.parent.querySelector('.list-of-places');
  }

  appendPlace(place) {
    new PlaceCard(this.list, place)
  }
  
}
