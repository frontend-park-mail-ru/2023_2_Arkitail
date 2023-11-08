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
  // @param {string} template
  constructor(template) {
    super("main", template);
    this.template = Handlebars.compile(`
        <div data-carousel class="list-of-places-carousel"></div>
        <div data-list-of-places class="list-of-places page-padding-vertical"></div>
    `);

    this.templateCarouselSlide = Handlebars.compile(`
        <div>
          <img src="{{place.imageUrl}}" />
          <div class="desc">
            <p>{{place.name}}</p>
            <button gateway="#page=place;id={{place.id}};">
              <p>Узнать больше</p>
            </button>
          </div>
        </div>
        `);
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
  fillListOfPlaces() {
    this.getPlaces().then((places) => {
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
    })
      .then((response) => response.json())
      .then((places) => {
        return places.sort((place1, place2) => place1.id - place2.id);
      });
  }
}
