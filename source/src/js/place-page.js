class PlacePage extends Page {
  // @param {string} template
  // @param {object} context
  constructor(template) {
    super("place page-padding-vertical", template);

    this.template = Handlebars.compile(`
    <div class="page-body-margin">
        <p class="general-main-title">{{ place.name }}</p>
        <div class="reviews md-size-text">
            <svg
                class="star active"
                viewBox="0 0 184 184"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    d="M141.594 172.5C140.383 172.505 139.203 172.127 138.219 171.422L92 137.914L45.7808 171.422C44.7933 172.138 43.6037 172.522 42.3839 172.517C41.1641 172.513 39.9773 172.121 38.9951 171.397C38.0128 170.674 37.2861 169.657 36.92 168.493C36.5538 167.33 36.5672 166.08 36.9581 164.924L54.9844 111.532L8.26562 79.4938C7.25366 78.8006 6.48989 77.8019 6.08591 76.6437C5.68193 75.4856 5.6589 74.2285 6.02019 73.0563C6.38149 71.8841 7.10817 70.8582 8.09406 70.1284C9.07995 69.3986 10.2734 69.0032 11.5 69H69.1366L86.5303 15.4711C86.905 14.3154 87.6361 13.3081 88.6188 12.5937C89.6014 11.8793 90.7851 11.4945 92 11.4945C93.2149 11.4945 94.3986 11.8793 95.3812 12.5937C96.3639 13.3081 97.095 14.3154 97.4697 15.4711L114.863 69.018H172.5C173.728 69.0174 174.924 69.41 175.913 70.1384C176.902 70.8668 177.632 71.8926 177.995 73.0657C178.359 74.2388 178.337 75.4975 177.934 76.6575C177.53 77.8174 176.766 78.8177 175.752 79.5117L129.016 111.532L147.031 164.91C147.323 165.774 147.405 166.695 147.271 167.598C147.136 168.5 146.789 169.357 146.258 170.099C145.727 170.84 145.027 171.445 144.216 171.862C143.405 172.28 142.506 172.498 141.594 172.5Z"
                    
                />
            </svg>

            <p class="rating">{{ place.rating }}</p>
            <a href="#reviews" class="gray-underline-text">{{ place.reviewCount }} отзывов</a>
        </div>
    </div>

    <div class="line">
        <hr>
        <p class="work-schedule md-size-text">Открыто сейчас <span class="gray-text"> {{ place.openHour }}-{{ place.closeHour }} </span></p>
        <hr>
    </div>

    <div class="info-card">
        <img src="{{ place.imageUrl }}" />

        <div class="info-container">
            <div class="page-body-margin info card">
                <p class="general-title">Информация</p>

                <p class="gray-text description broken-text">
                    {{ place.description }}
                </p>

                <div>
                    <p class="general-subtitle">Адрес</p>
                    <p class="gray-underline-text"> {{ place.adress }} </p>
                </div>

                <div>
                    <p class="general-subtitle">Контакты</p>
                    <div class="contacts">

                        {{#if place.website}}
                        <p class="gray-underline-text"> 
                            {{ place.website }}
                        </p>
                        {{else}}
                        <p class="gray-text"> 
                            Сайт отсутствует
                        </p>
                        {{/if}}
                        
                        {{#if place.email}}
                        <p class="gray-underline-text"> 
                            {{ place.email }}
                        </p>
                        {{else}}
                        <p class="gray-text"> 
                            Почта отсутствует
                        </p>
                        {{/if}}
                        
                        {{#if place.phoneNumber}}
                        <p class="gray-underline-text"> 
                            {{ place.phoneNumber }}
                        </p>
                        {{else}}
                        <p class="gray-text"> 
                            Номет телефона отсутствует
                        </p>
                        {{/if}}

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <div id="reviews" class="page-body-margin">
            <p class="general-title">Отзывы</p>

            <div class="reviews-header grid-bottom">
                <div class="stars md-size-text">
                    <p class="rating">{{ place.rating }}</p>
                    {{#stars 5 place.rating}}
                    <svg
                        class="star {{@active}}"
                        viewBox="0 0 184 184"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M141.594 172.5C140.383 172.505 139.203 172.127 138.219 171.422L92 137.914L45.7808 171.422C44.7933 172.138 43.6037 172.522 42.3839 172.517C41.1641 172.513 39.9773 172.121 38.9951 171.397C38.0128 170.674 37.2861 169.657 36.92 168.493C36.5538 167.33 36.5672 166.08 36.9581 164.924L54.9844 111.532L8.26562 79.4938C7.25366 78.8006 6.48989 77.8019 6.08591 76.6437C5.68193 75.4856 5.6589 74.2285 6.02019 73.0563C6.38149 71.8841 7.10817 70.8582 8.09406 70.1284C9.07995 69.3986 10.2734 69.0032 11.5 69H69.1366L86.5303 15.4711C86.905 14.3154 87.6361 13.3081 88.6188 12.5937C89.6014 11.8793 90.7851 11.4945 92 11.4945C93.2149 11.4945 94.3986 11.8793 95.3812 12.5937C96.3639 13.3081 97.095 14.3154 97.4697 15.4711L114.863 69.018H172.5C173.728 69.0174 174.924 69.41 175.913 70.1384C176.902 70.8668 177.632 71.8926 177.995 73.0657C178.359 74.2388 178.337 75.4975 177.934 76.6575C177.53 77.8174 176.766 78.8177 175.752 79.5117L129.016 111.532L147.031 164.91C147.323 165.774 147.405 166.695 147.271 167.598C147.136 168.5 146.789 169.357 146.258 170.099C145.727 170.84 145.027 171.445 144.216 171.862C143.405 172.28 142.506 172.498 141.594 172.5Z"
                            
                        />
                    </svg>
                    {{/stars}}
                </div>

                <p gateway="#page=reviews;" class="gray-underline-text md-size-text">{{ place.reviewCount }} отзывов</p>

                <div class="write-review">
                    <button data-add-review-btn class="btn blue-btn">
                        Написать отзыв
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div data-write-review-card-container class="write-review-card-container page-body-margin">
    </div>

    <div data-carousel class="place-carousel page-body-margin"></div>

    <button gateway="#page=reviews;id={{ place.id }};" class="all-reviews-btn btn green-btn page-body-margin">
        Все отзывы
    </button>

    `);
  }

  async renderTemplate() {
    await this.generateContext();
    await super.renderTemplate();

    const addReviewCard = new AddRevieCard(
      this.node.querySelector("[data-add-review-btn]"),
      await this.insertToBeginReview.bind(this)
    );
    this.node
      .querySelector("[data-write-review-card-container]")
      .appendChild(addReviewCard.getHtml());

    this.carousel = new Carousel({
      autoFlip: false,
      defaultArrowsVisibility: true,
    });
    this.node
      .querySelector("[data-carousel]")
      .appendChild(this.carousel.getHtml());

    await this.fillCarousel();
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
        this.carousel.insertToBeginSlide({ content: reviewCard.getHtml() });
      });
  }

  async generateContext() {
    this.memGetPlace = await memorize(this.getPlace.bind(this));
    this.memGetReviews = await memorize(this.getReviews.bind(this));
    this.id = main.serializeLocationHash(main.context.location).id;
    this.context = { place: await this.memGetPlace(this.id) };
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
