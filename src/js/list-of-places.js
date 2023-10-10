class ListOfPlaces {
  constructor(parent) {
    this.parent = parent
    this.template = Handlebars.compile(`
      <div class="filters">

      </div>
      <div class="list-of-places">
      </div>
      `)

    this.parent.innerHTML += this.template()
    this.list = this.parent.querySelector('.list-of-places')
  }

  appendPlace(place) {
    new PlaceCard(this.list, place)
  }
}
