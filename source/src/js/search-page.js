class SearchPage extends Page {
  // @param {string} template
  constructor(template) {
    super('searh', template);
    this.template = Handlebars.compile(`
        <div data-filters class="list-of-places-filters"></div>
        <div data-list-of-places class="list-of-places"></div>
    `);
    super.render();
    this.carousel = new ListFilters(this.node.querySelector("[data-filters]"));
    this.listOfPlaces = new ListOfPlaces(
      this.node.querySelector("[data-list-of-places]")
    );

    this.fillListOfPlaces();
  }

  // Добавляет в div-блок с атрибутом list-of-places карточки достопримечательностей
  fillListOfPlaces() {
    this.getPlaces().then((places) => {
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
    }).then((response) => response.json());
  }
}
