/**
 * @param {number} number
 * @param {number} mod
 * @return {number}
 */
function modulo(number, mod) {
  let result = number % mod;
  if (result < 0) {
    result += mod;
  }
  return result;
}

/**
 * Функция предотвращения повторной активации переданной функции в результате быстрой серии событий.
 * @param {Function} func - функция
 * @param {number} timeout - время пока клики не действуют
 * @returns {Function}
 */
function debounce(func, timeout) {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    func(...args);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

class Carousel {
  /**
   * @param {object} parent
   * @param {number} numberOfVisibleSlides
   * @param {boolean} switchingButtons
   * @param {boolean} stopIfHover
   */
  constructor(
    parent,
    numberOfVisibleSlides = 3,
    switchingButtons = true,
    stopIfHover = true
  ) {
    this.parent = parent;
    this.template = Handlebars.compile(`
        <div
              class="carousel"
              role="group"
              aria-roledescription="carousel"
              aria-label="Popular places list"
              data-carousel
            >
            <div class="carousel-buttons">
                <button
                  class="carousel-button carousel-button-previous"
                  aria-label="Previous slide"
                  data-carousel-button-previous
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.7501 18.75L9.00012 12L15.7501 5.25" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button
                  class="carousel-button carousel-button-next"
                  aria-label="Next slide"
                  data-carousel-button-next
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5.25L15.75 12L9 18.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
            </div>
            <div
                class="slides"
                aria-live="polite"
                data-carousel-slides-container
            >                
            </div>
        </div>
        `);
    this.parent.innerHTML = this.template({ places: this.places });

    this.numberOfVisibleSlides = numberOfVisibleSlides;
    this.carousel = this.parent.querySelector("[data-carousel]");
    this.slidesContainer = this.carousel.querySelector(
      "[data-carousel-slides-container]"
    );

    this.currentSlide = 0;
    if (this.numberOfVisibleSlides == 3) {
      this.changeSliderCount();
      window.addEventListener(
        "resize",
        this.changeSliderCount.bind(this),
        true
      );
    } else {
      this.carousel.style.setProperty(
        "--slider-count",
        this.numberOfVisibleSlides
      );
    }
    this.numSlides =
      this.slidesContainer.children.length - this.numberOfVisibleSlides + 1;

    if (switchingButtons) {
      this.buttonPrevious = this.carousel.querySelector(
        "[data-carousel-button-previous]"
      );
      this.buttonNext = this.carousel.querySelector(
        "[data-carousel-button-next]"
      );
      this.carousel.addEventListener("mouseover", this.showArrows.bind(this));
      this.carousel.addEventListener("mouseout", this.hideArrows.bind(this));
      this.buttonPrevious.addEventListener(
        "click",
        debounce(this.handlePrevious.bind(this), 1200)
      );
      this.buttonNext.addEventListener(
        "click",
        debounce(this.handleNext.bind(this), 1200)
      );
    }

    this.startSlideShow();

    if (stopIfHover) {
      this.carousel.addEventListener(
        "mouseover",
        this.stopSlideShow.bind(this)
      );
      this.carousel.addEventListener(
        "mouseout",
        this.startSlideShow.bind(this)
      );
    }
  }

  changeSliderCount() {
    if (this.numberOfVisibleSlides == 3) {
      const screenWidth = window.screen.width;
      if (screenWidth < 768) {
        this.carousel.style.setProperty("--slider-count", 1);
        this.numSlides = this.slidesContainer.children.length;
      } else if (screenWidth < 1500) {
        this.carousel.style.setProperty("--slider-count", 2);
        this.numSlides = this.slidesContainer.children.length - 1;
      } else {
        this.carousel.style.setProperty("--slider-count", 3);
        this.numSlides = this.slidesContainer.children.length - 2;
      }
    } else {
      this.numSlides =
        this.slidesContainer.children.length - this.numberOfVisibleSlides + 1;
    }
  }

  handleNext() {
    this.currentSlide = modulo(this.currentSlide + 1, this.numSlides);
    this.carousel.style.setProperty("--current-slide", this.currentSlide);
  }

  handlePrevious() {
    this.currentSlide = modulo(this.currentSlide - 1, this.numSlides);
    this.carousel.style.setProperty("--current-slide", this.currentSlide);
  }

  startSlideShow() {
    this.slideInterval = setInterval(this.handleNext.bind(this), 10000); // Авто перелистывание спустя 10сек
  }

  stopSlideShow() {
    clearInterval(this.slideInterval);
  }

  showArrows() {
    this.buttonPrevious.style.display = "flex";
    this.buttonNext.style.display = "flex";
  }

  hideArrows() {
    this.buttonPrevious.style.display = "none";
    this.buttonNext.style.display = "none";
  }
  /**
   * @param {object} place
   */
  appendSlide(place) {
    new CarouselSlide(this.slidesContainer, place);
    this.changeSliderCount();
  }
}
