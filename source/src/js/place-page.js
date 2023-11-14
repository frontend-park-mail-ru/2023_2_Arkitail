class PlacePage extends Page {
  constructor() {
    super("place page-padding-vertical", PLACE_PAGE_TEMPLATE);
  }

  async renderTemplate() {
    await this.generateContext();
    await super.renderTemplate();

    const addReviewCard = new AddRevieCard(
      this.node.querySelector("[data-add-review-btn]"),
      await this.sendReview.bind(this)
    );
    this.node
      .querySelector("[data-write-review-card-container]")
      .appendChild(addReviewCard.getHtml());

    this.node
      .querySelector("[data-reviews-anchor]")
      .addEventListener("click", () =>
        this.node.querySelector("[data-reviews]").scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      );

    this.carousel = new Carousel({
      autoFlip: false,
      defaultArrowsVisibility: true,
    });
    this.node
      .querySelector("[data-carousel]")
      .appendChild(this.carousel.getHtml());

    await this.fillCarousel();

    this.selectTrip = this.node.querySelector("[data-select-trip]");
    this.node
      .querySelector("[data-choose-trip-btn]")
      .addEventListener("click", async () => {
        const tripId =
          this.selectTrip.options[this.selectTrip.selectedIndex].value;
        if (tripId) {
          await fetch(API_V1_URL + `/trips/${tripId}/place`, {
            method: "POST",
            body: JSON.stringify({
              placeId: Number(this.id),
              firstDate: "2017-01-01",
              lastDate: "2017-01-02",
            }),
          });

          this.selectTrip.removeChild(
            this.selectTrip.options[this.selectTrip.selectedIndex]
          );
        }
      });
  }

  // Добавляет в div-блок с атрибутом data-carousel карточки отзывов
  async fillCarousel() {
    await this.memGetReviews(this.id).then((reviews) => {
      reviews.forEach(async (review) => {
        const user = await fetch(API_V1_URL + `/users/${review.userId}`, {
          method: "GET",
        }).then((response) => response.json());
        review.user = user;
        review.abilityToRemove =
          review.user.name == main.temporaryContext.userName;
        this.appendReview(review);
      });
    });
  }

  appendReview(review) {
    const reviewCard = new ReviewCard(review);
    this.carousel.appendSlide({ content: reviewCard.getHtml() });
  }

  async sendReview(review) {
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      placeId: Number(main.serializeLocationHash(main.context.location).id),
      content: review.text,
      rating: Number(review.rating),
    });

    await fetch(API_V1_URL + `/review`, {
      method: method,
      headers: headers,
      body: body,
    });

    main.reRender();
  }

  async generateContext() {
    this.memGetPlace = await memorize(this.getPlace.bind(this));
    this.memGetReviews = await memorize(this.getReviews.bind(this));
    this.id = main.serializeLocationHash(main.context.location).id;
    const trips = (await this.getTrips()).filter(
      (trip) =>
        !Object.values(trip.placesInTrip).some(
          (placeInTrip) => placeInTrip.place.id == this.id
        )
    );
    this.context = {
      place: await this.memGetPlace(this.id),
      trips: trips,
    };
  }

  async getPlace(id) {
    return await fetch(API_V1_URL + `/places/${id}`, {
      method: "GET",
    }).then((response) => {
      if (response.ok) return response.json();
      return {};
    });
  }

  async getReviews(id) {
    return await fetch(API_V1_URL + `/places/${id}/reviews`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        return {};
      })
      .then((reviews) => Object.values(reviews));
  }

  async getTrips() {
    return await fetch(API_V1_URL + "/trips", { method: "GET" })
      .then((response) => {
        if (response.ok) return response.json();
        return {};
      })
      .then((trips) => Object.values(trips));
  }
}
