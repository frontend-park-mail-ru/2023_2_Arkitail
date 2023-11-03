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
            <button class="btn blue-btn">
                Написать отзыв
            </button>
        </div>
    </div>

    <div data-list-of-reviews class="list-of-reviews page-body-margin">
    </div>
   `);
  }

  async renderTemplate() {
    await super.renderTemplate();

    this.list = this.node.querySelector("[data-list-of-reviews]");
    this.fill();
  }

  fill() {
    this.getReviews().then((reviews) => {
      reviews.forEach((review) => {
        review.user = {
          userId: review.userId,
          avatarImg: "",
          name: "User" + review.userId,
        };
        const reviewCard = new ReviewCard({ review: review });
        this.list.appendChild(reviewCard.getHtml());
      });
    });
  }

  getReviews = memorize(async function () {
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
  });
}
