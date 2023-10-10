function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
        result += mod;
    }
    return result;
}

class Carousel {

    constructor(parent, numberOfVisibleSlides = 3, switchingButtons = true, stopIfHover = true) {
        this.parent = parent
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
                  class="carousel-button carousel-button_previous"
                  aria-label="Previous slide"
                  data-carousel-button-previous
                >
                  <p>&#8249;</p>
                </button>
                <button
                  class="carousel-button carousel-button_next"
                  aria-label="Next slide"
                  data-carousel-button-next
                >
                  <p>&#8250;</p>
                </button>
            </div>
            <div
                class="slides"
                aria-live="polite"
                data-carousel-slides-container
            >                
            </div>
        </div>
        `)
        this.parent.innerHTML = this.template({ places: this.places })

        this.carousel = this.parent.querySelector('[data-carousel]');
        this.slidesContainer = this.carousel.querySelector('[data-carousel-slides-container]');

        this.currentSlide = 0;
        if (numberOfVisibleSlides == 3) {
            this.changeSliderCount()
            window.addEventListener('resize', this.changeSliderCount.bind(this), true);
        } else {
            this.carousel.style.setProperty('--slider-count', numberOfVisibleSlides)
        }
        this.numSlides = this.slidesContainer.children.length - numberOfVisibleSlides + 1;

        if (switchingButtons) {
            this.buttonPrevious = this.carousel.querySelector('[data-carousel-button-previous]');
            this.buttonNext = this.carousel.querySelector('[data-carousel-button-next]');
            this.carousel.addEventListener("mouseover", this.showArrows.bind(this));
            this.carousel.addEventListener("mouseout", this.hideArrows.bind(this));
            this.buttonPrevious.addEventListener('click', this.handlePrevious.bind(this));
            this.buttonNext.addEventListener('click', this.handleNext.bind(this));
        }

        this.startSlideShow();

        if (stopIfHover) {
            this.carousel.addEventListener("mouseover", this.stopSlideShow.bind(this));
            this.carousel.addEventListener("mouseout", this.startSlideShow.bind(this));
        }

    }

    changeSliderCount() {
        const screenWidth = window.screen.width
        if (screenWidth < 768) {
            this.carousel.style.setProperty('--slider-count', 1)
            this.numSlides = this.slidesContainer.children.length;
        } else if (screenWidth < 1500) {
            this.carousel.style.setProperty('--slider-count', 2)
            this.numSlides = this.slidesContainer.children.length - 1;
        } else {
            this.carousel.style.setProperty('--slider-count', 3)
            this.numSlides = this.slidesContainer.children.length - 2;
        }
    }

    handleNext() {
        this.currentSlide = modulo(this.currentSlide + 1, this.numSlides);
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
    }

    handlePrevious() {
        this.currentSlide = modulo(this.currentSlide - 1, this.numSlides);
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
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

    appendSlide(place) {
        new CarouselSlide(this.slidesContainer, place)
    }
}
