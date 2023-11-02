const maxSlides = 10;

/**
 * @param {number} number
 * @param {number} mod
 * @return {number}
 */
const mathMod = (number, mod) => ((number % mod) + mod) % mod;

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
    {
      numberOfVisibleSlides = maxSlides,
      switchingButtons = true,
      autoFlip = true,
      stopIfHover = true,
      defaultArrowsVisibility = false,
    } = {}
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
    if (this.numberOfVisibleSlides > 1) {
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
      if (defaultArrowsVisibility) {
        this.showArrows();
      } else {
        this.carousel.addEventListener("mouseover", this.showArrows.bind(this));
        this.carousel.addEventListener("mouseout", this.hideArrows.bind(this));
      }
      this.buttonPrevious.addEventListener(
        "click",
        debounce(this.handlePrevious.bind(this), 1200)
      );
      this.buttonNext.addEventListener(
        "click",
        debounce(this.handleNext.bind(this), 1200)
      );
    }

    if (autoFlip) {
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
  }

  changeSliderCount() {
    const screenWidth = window.screen.width;
    for (let i = 1; i <= this.numberOfVisibleSlides; i++) {
      if (screenWidth < 768 * i || i == this.numberOfVisibleSlides) {
        this.currentNumberOfVisibleSlides = i;
        this.carousel.style.setProperty("--slider-count", i);
        this.numSlides = this.slidesContainer.children.length - i + 1;
        break;
      }
    }
  }

  handleNext() {
    this.currentSlide = mathMod(this.currentSlide + 1, this.numSlides);
    this.carousel.style.setProperty("--current-slide", this.currentSlide);
  }

  handlePrevious() {
    this.currentSlide = mathMod(this.currentSlide - 1, this.numSlides);
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
   * @param {object} content
   */
  appendSlide({ content, template }) {
    const slide = document.createElement("div");
    slide.setAttribute("data-slide", "");
    slide.classList.add("slide");
    if (content) {
      slide.appendChild(content);
    } else {
      slide.innerHTML = template;
    }
    this.slidesContainer.appendChild(slide);
    this.changeSliderCount();
  }
}
