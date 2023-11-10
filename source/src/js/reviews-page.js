class ReviewsPage extends Page {
  constructor() {
    super("reviews page-padding-vertical", REVIEWS_PAGE_TEMPLATE);
  }

  async renderTemplate() {
    this.id = main.serializeLocationHash(main.context.location).id;
    this.memGetReviews = await memorize(this.getReviews);
    await super.renderTemplate();

    this.list = this.node.querySelector("[data-list-of-reviews]");

    const addReviewCard = new AddRevieCard(
      this.node.querySelector("[data-add-review-btn]"),
      this.sendReview.bind(this)
    );
    this.list.appendChild(addReviewCard.getHtml());

    await this.fill();
  }

  appendReview(review) {
    const reviewCard = new ReviewCard(review);
    this.list.appendChild(reviewCard.getHtml());
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
    console.log("BODY", body);

    return await fetch(API_V1_URL + `/review`, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then(async (review) => {
        const user = await fetch(API_V1_URL + `/users/${review.userId}`, {
          method: "GET",
        }).then((response) => response.json());
        review.user = user;
        review.abilityToRemove = true;
        const reviewCard = new ReviewCard(review);
        this.list.insertBefore(reviewCard.getHtml(), this.list.firstChild);
      });
  }

  async fill() {
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

  async getReviews(id) {
    return fetch(API_V1_URL + `/places/${id}/reviews`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        return {};
      })
      .then((reviews) => Object.values(reviews));
  }
}
