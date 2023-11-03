memorize = (fun) => {
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
        <div data-list-of-places class="list-of-places"></div>
    `);

    super.render();
    this.carousel = new Carousel(this.node.querySelector("[data-carousel]"), {
      numberOfVisibleSlides: 1,
    });
    this.listOfPlaces = new ListOfPlaces(
      this.node.querySelector("[data-list-of-places]")
    );

    this.templateCarouselSlide = Handlebars.compile(`
        <div>
          <img src="{{place.imageUrl}}" />
          <div class="desc">
            <p>{{place.name}}</p>
            <button id="place-{{ place.id }}">
              <p>Узнать больше</p>
            </button>
          </div>
        </div>
        `);

    this.fillCarousel();
    this.fillListOfPlaces();
  }

  // Добавляет в div-блок с атрибутом carousel слайды достопримечательностей
  fillCarousel() {
    this.getPlaces().then((places) => {
      places.forEach((place) => {
        this.carousel.appendSlide({
          template: this.templateCarouselSlide({ place: place }),
        });
      });
    });
  }

  // Добавляет в div-блок с атрибутом list-of-places карточки достопримечательностей
  fillListOfPlaces() {
    this.getPlaces().then((places) => {
      places.forEach((place) => {
        this.listOfPlaces.appendPlace(place);
      });
    });
    
  }

  // Функция getPlaces отправляет GET запрос на получение достопримечательностей
  // и возвращает мапу достопримечательностей
  // return {Promise} промис запроса мест
  getPlaces = memorize(async function () {
    return fetch("/api/v1/places", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((places) => {
        return places.sort((place1, place2) => place1.id - place2.id);
      });
  });
}
