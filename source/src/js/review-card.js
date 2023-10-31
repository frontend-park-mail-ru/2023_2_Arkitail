class ReviewCard {
  // @param {object} parent
  // @param {object} review
  constructor(parent, review) {
    this.parent = parent;
    this.review = review;
    this.template = Handlebars.compile(`
        <div class="review-card card">
            <section>
            review review
            </section>

            <section>
            review review
            </section>
        </div>
        `);

    this.parent.innerHTML += this.template({ review: this.review });
  }
}
