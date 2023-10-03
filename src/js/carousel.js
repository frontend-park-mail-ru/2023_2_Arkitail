function modulo(number, mod) {
    let result = number % mod;
    if (result < 0) {
        result += mod;
    }
    return result;
}

class Carousel {

    constructor(carousel, numberOfVisibleSlides, switchingButtons = true, stopIfHover = true) {
        this.carousel = carousel;
        this.slidesContainer = carousel.querySelector('[data-carousel-slides-container]');
        this.slides = this.slidesContainer.children

        this.currentSlide = 0;
        this.carousel.style.setProperty('--slider-count', numberOfVisibleSlides)
        this.numSlides = this.slidesContainer.children.length - numberOfVisibleSlides + 1;

        if (switchingButtons) {
            this.buttonPrevious = carousel.querySelector('[data-carousel-button-previous]');
            this.buttonNext = carousel.querySelector('[data-carousel-button-next]');
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

    handleNext() {
        this.currentSlide = modulo(this.currentSlide + 1, this.numSlides);
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
    }

    handlePrevious() {
        this.currentSlide = modulo(this.currentSlide - 1, this.numSlides);
        this.carousel.style.setProperty('--current-slide', this.currentSlide);
    }

    startSlideShow() {
        this.slideInterval = setInterval(this.handleNext.bind(this), 1000); // Авто перелистывание спустя 10сек
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
}

const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(carousel => new Carousel(carousel, 3));