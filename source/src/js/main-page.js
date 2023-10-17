class MainPage extends Page {
  constructor(template) {
    super('main', template);
    this.template = Handlebars.compile(`
        <div carousel style="padding: 0"></div>
        <div list-of-places class="list-of-places"></div>
    `);
    super.render();
    console.log(this.node);
    this.carousel = new Carousel(this.node.querySelector("[carousel]"), 1);
    this.listOfPlaces = new ListOfPlaces(
      this.node.querySelector("[list-of-places]")
    );

    this.fillCarousel();
    this.fillListOfPlaces();
  }

  fillCarousel() {
    this.getPlaces().then((places) => {
      for (const [_, place] of places.entries()) {
        this.carousel.appendSlide(place);
      }
    });
  }

  fillListOfPlaces() {
    this.getPlaces().then((places) => {
      for (const [_, place] of places.entries()) {
        this.listOfPlaces.appendPlace(place);
      }
    });
  }

  async getPlaces() {
    return fetch("/api/v1/places", {
      method: "GET",
    }).then((response) => response.json());
  }
}
