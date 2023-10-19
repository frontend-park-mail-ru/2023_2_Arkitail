class CarouselSlide {
    // @param {object} parent
    // @param {object} place
    constructor(parent, place) {
        this.place = place
        this.parent = parent
        this.template = Handlebars.compile(`
        <div
            class="slide"
            role="group"
            aria-roledescription="slide"
            aria-hidden="false"
            id="slide-{{place.id}}"
        >
            <img src="{{place.imageUrl}}" />
            <div class="desc">
            <p>{{place.name}}</p>
            <button>
                <p>Узнать больше</p>
            </button>
            </div>
        </div>
        `)
        this.parent.innerHTML += this.template({ place: this.place })
    }
}
