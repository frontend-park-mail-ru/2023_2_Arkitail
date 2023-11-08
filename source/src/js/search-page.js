class SearchPage extends Page {
  // @param {string} template
  constructor(template) {
    super("searh page-padding-vertical", template);
    this.template = Handlebars.compile(`
        <div data-filters class="list-of-places-filters page-padding-horizontal"></div>
        <div data-list-of-places class="list-of-places"></div>
    `);
  }

  async renderTemplate() {
    this.memGetPlaces = await memorize(this.getPlaces);
    super.renderTemplate();

    this.filters = new ListFilters();
    this.node
      .querySelector("[data-filters]")
      .appendChild(this.filters.getHtml());
    this.listOfPlaces = new ListOfPlaces();
    this.node
      .querySelector("[data-list-of-places]")
      .appendChild(this.listOfPlaces.getHtml());

    this.fillListOfPlaces();
  }

  // Добавляет в div-блок с атрибутом list-of-places карточки достопримечательностей
  fillListOfPlaces() {
    this.memGetPlaces().then((places) => {
      for (const [_, place] of places.entries()) {
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
        return Object.values(places);
      });
  }
}
