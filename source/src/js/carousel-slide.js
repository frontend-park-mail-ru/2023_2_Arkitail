class CarouselSlide {
  // @param {object} parent
  // @param {object} content
  constructor(parent, content) {
    this.parent = parent;
    const slide = document.createElement("div");
    slide.setAttribute("data-slide", "");
    slide.classList.add("slide");
    slide.innerHTML = content;
    this.parent.appendChild(slide);
  }
}
