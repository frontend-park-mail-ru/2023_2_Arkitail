class ReviewsPage extends Page {
  // @param {string} template
  constructor(template) {
    super("reviews page-padding-vertical", template);
    this.template = Handlebars.compile(`
    <div class="reviews-header page-body-margin grid-bottom">
        <p class="general-main-title">
            Все отзывы
        </p>
        <div class="write-review">
            <button data-add-review-btn class="btn blue-btn">
                Написать отзыв
            </button>
        </div>
    </div>

    <div data-list-of-reviews class="list-of-reviews page-body-margin">
    </div>
   `);
  }

  async renderTemplate() {
    this.id = main.serializeLocationHash(main.context.location).id;
    this.memGetReviews = await memorize(this.getReviews);
    await super.renderTemplate();

    this.list = this.node.querySelector("[data-list-of-reviews]");

    const addReviewCard = new AddRevieCard(
      this.node.querySelector("[data-add-review-btn]"),
      this.insertToBeginReview.bind(this)
    );
    this.list.appendChild(addReviewCard.getHtml());

    await this.fill();
  }

  appendReview(review) {
    const reviewCard = new ReviewCard(review);
    this.list.appendChild(reviewCard.getHtml());
  }

  async insertToBeginReview(review) {
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
