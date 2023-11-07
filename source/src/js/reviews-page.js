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

  insertToBeginReview(review) {
    const reviewCard = new ReviewCard(review);
    this.list.insertBefore(reviewCard.getHtml(), this.list.firstChild);
  }

  async fill() {
    await this.memGetReviews().then((reviews) => {
      reviews.forEach((review) => {
        review.user = {
          userId: review.userId,
          avatarImg: "",
          name: "User" + review.userId,
        };
        // review.abilityToRemove = review.user.name == main.temporaryContext.userName
        review.abilityToRemove = review.user.name == "User7";
        this.appendReview(review);
      });
    });
  }

  async getReviews() {
    console.log(
      "ID достопримечательности",
      main.serializeLocationHash(main.context.location).id
    );
    return Array.from({ length: 10 }, (_, i) => {
      return {
        id: i,
        userId: i,
        placeId: 0,
        text: `Очень нравится <3 
        Очень нравится <3
        Очень нравится <3
        Очень нравится <3
        Очень нравится <3
        Очень нравится <3
        Очень нравится <3`.repeat(i + 1),
        rating: i * 0.5 + ((i * i) % 5),
        createdAt: i + 3 + " октября, 14:36",
      };
    });
  }
}
