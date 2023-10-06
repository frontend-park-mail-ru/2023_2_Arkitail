class CarouselSlide {
    constructor(parent, place) {
        this.place = place
        this.parent = parent
        this.template = Handlebars.compile(`
        <div
            class="slide"
            role="group"
            aria-roledescription="slide"
            aria-hidden="false"
            aria-labelledby="bob"
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
