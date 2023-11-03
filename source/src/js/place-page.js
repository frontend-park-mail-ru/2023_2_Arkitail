class PlacePage extends Page {
  // @param {string} template
  // @param {object} context
  constructor(template, context) {
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
            <a href="#reviews" class="gray-underline-text">256 отзывов</a>
        </div>
    </div>

    <div class="line">
        <hr>
        <p class="work-schedule md-size-text">Открыто сейчас <span class="gray-text"> 11:00-12:00 </span></p>
        <hr>
    </div>

    <div class="info-card">
        <img src="{{ place.imageURL }}" />

        <div class="info-container">
            <div class="page-body-margin info card">
                <p class="general-title">Информация</p>

                <p class="gray-text description">
                    {{ place.description }}
                </p>

                <div>
                    <p class="general-subtitle">Адрес</p>
                    <p class="gray-underline-text">Адрес какой-то</p>
                </div>

                <div>
                    <p class="general-subtitle">Контакты</p>
                    <div class="contacts">
                        <p class="gray-underline-text">Сайт</p>
                        <p class="gray-underline-text">Эл.почта</p>
                        <p class="gray-underline-text">+71234567890</p>
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

                <a href="#reviews" class="gray-underline-text md-size-text">256 отзывов</a>

                <div class="write-review">
                    <button class="btn blue-btn">
                        Написать отзыв
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div data-write-review-card-container class="write-review-card-container page-body-margin">
    </div>

    <div data-carousel class="place-carousel page-body-margin"></div>

    <button gateway="#page=reviews;" class="all-reviews-btn btn green-btn page-body-margin">
        Все отзывы
    </button>

    `);
    this.context = { place: context }
  }

  async renderTemplate () {
    await super.renderTemplate();

    this.carousel = new Carousel(this.node.querySelector("[data-carousel]"), {
      autoFlip: false,
      defaultArrowsVisibility: true,
    });

    await this.fillCarousel();
  }

  // Добавляет в div-блок с атрибутом data-carousel карточки отзывов
  async fillCarousel() {
    await this.getReviews().then((reviews) => {
      reviews.forEach((review) => {
        review.user = {
          userId: review.userId,
          avatarImg: "",
          name: "User" + review.userId,
        };
        this.carousel.appendSlide({ content: ReviewCard({ review: review }) });
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
        Очень нравится <3`.repeat(i+1),
        rating: i * 0.5 + ((i * i) % 5),
        createdAt: i + 3 + " октября, 14:36",
      };
    });
  });
}