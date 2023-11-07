class MainPage extends Page {
  // @param {string} template
  constructor(template) {
    super('main', template);
    this.template = Handlebars.compile(`
        <div data-carousel class="list-of-places-carousel"></div>
        <div data-list-of-places class="list-of-places"></div>
    `);

    super.render();
    this.carousel = new Carousel(this.node.querySelector("[data-carousel]"), 1);
    this.listOfPlaces = new ListOfPlaces(
      this.node.querySelector("[data-list-of-places]")
    );

    this.fillCarousel();
    this.fillListOfPlaces();
  }

  // Добавляет в div-блок с атрибутом carousel слайды достопримечательностей
  fillCarousel() {
    this.getPlaces().then((places) => {
      for (const [_, place] of Object.entries(places)) {
        this.carousel.appendSlide(place);
      }
    });
  }

  // Добавляет в div-блок с атрибутом list-of-places карточки достопримечательностей
  fillListOfPlaces() {
    this.getPlaces().then(places => {
      for (const [_, place] of Object.entries(places)) {
        this.listOfPlaces.appendPlace(place);
      }
    });
    
  }

  // Функция getPlaces отправляет GET запрос на получение достопримечательностей
  // и возвращает мапу достопримечательностей
  // return {Promise} промис запроса мест
  async getPlaces() {
    return fetch("/api/v1/places", {
      method: "GET",
    }).then((response) => response.json());
  }
}
