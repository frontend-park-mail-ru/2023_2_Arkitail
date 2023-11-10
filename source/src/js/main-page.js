memorize = async (fun) => {
  let cache = {};
  return (params) => {
    if (cache[params] == undefined) {
      const result = fun(params);
      cache[params] = result;
      return result;
    } else {
      return cache[params];
    }
  };
};

class MainPage extends Page {
  constructor() {
    super("main", MAIN_PAGE_TEMPLATE);
    this.templateCarouselSlide = Handlebars.compile(
      MAIN_PAGE_CAROUSEL_SLIDE_TEMPLATE
    );
  }

  async renderTemplate() {
    this.memGetPlaces = await memorize(this.getPlaces);
    await super.renderTemplate();

    this.carousel = new Carousel({
      numberOfVisibleSlides: 1,
    });
    this.node
      .querySelector("[data-carousel]")
      .appendChild(this.carousel.getHtml());
    this.listOfPlaces = new ListOfPlaces();
    this.node
      .querySelector("[data-list-of-places]")
      .appendChild(this.listOfPlaces.getHtml());

    await this.fillCarousel();
    await this.fillListOfPlaces();
  }

  // Добавляет в div-блок с атрибутом carousel слайды достопримечательностей
  async fillCarousel() {
    await this.memGetPlaces().then((places) => {
      places.forEach((place) => {
        this.carousel.appendSlide({
          template: this.templateCarouselSlide({ place: place }),
        });
      });
    });
  }

  // Добавляет в div-блок с атрибутом list-of-places карточки достопримечательностей
  // async fillListOfPlaces() {
  //   await this.getPlaces().then((places) => {
  //     places.forEach((place) => {
  async fillListOfPlaces() {
    this.memGetPlaces().then((places) => {
      places.forEach((place) => {
        this.listOfPlaces.appendPlace(place);
      });
    });
  }

  // Функция getPlaces отправляет GET запрос на получение достопримечательностей
  // и возвращает мапу достопримечательностей
  // return {Promise} промис запроса мест
  async getPlaces() {
    return fetch("/api/v1/places", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((places) => {
        return Object.values(places);
      });
  }
}
