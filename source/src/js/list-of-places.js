class ListOfPlaces {
  constructor() {
    this.block = document.createElement("div");
    this.block.className = "list";
    this.block.setAttribute("data-list", "");
  }

  appendPlace(place) {
    const placeCard = new PlaceCard(place);
    this.block.appendChild(placeCard.getHtml());
  }

  getHtml() {
    return this.block;
  }
}
