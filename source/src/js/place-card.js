class PlaceCard {
  // @param {object} parent
  // @param {object} place
  constructor(place) {
    this.place = place;
    this.block = document.createElement("div");
    this.block.className = "place-card card";
    this.template = Handlebars.compile(`
        <div class="place-card card">
            <section>
            <p class="card">{{place.cost}}</p>
            <img src="{{place.imageUrl}}" />
            </section>

            <section>
            <div class="card-header">
                <h3 gateway="#page=place;id={{place.id}};">{{place.name}}</h3>
                <p class="rating">{{place.rating}}</p>
                <svg
                    class="star"
                    viewBox="0 0 184 184"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M141.594 172.5C140.383 172.505 139.203 172.127 138.219 171.422L92 137.914L45.7808 171.422C44.7933 172.138 43.6037 172.522 42.3839 172.517C41.1641 172.513 39.9773 172.121 38.9951 171.397C38.0128 170.674 37.2861 169.657 36.92 168.493C36.5538 167.33 36.5672 166.08 36.9581 164.924L54.9844 111.532L8.26562 79.4938C7.25366 78.8006 6.48989 77.8019 6.08591 76.6437C5.68193 75.4856 5.6589 74.2285 6.02019 73.0563C6.38149 71.8841 7.10817 70.8582 8.09406 70.1284C9.07995 69.3986 10.2734 69.0032 11.5 69H69.1366L86.5303 15.4711C86.905 14.3154 87.6361 13.3081 88.6188 12.5937C89.6014 11.8793 90.7851 11.4945 92 11.4945C93.2149 11.4945 94.3986 11.8793 95.3812 12.5937C96.3639 13.3081 97.095 14.3154 97.4697 15.4711L114.863 69.018H172.5C173.728 69.0174 174.924 69.41 175.913 70.1384C176.902 70.8668 177.632 71.8926 177.995 73.0657C178.359 74.2388 178.337 75.4975 177.934 76.6575C177.53 77.8174 176.766 78.8177 175.752 79.5117L129.016 111.532L147.031 164.91C147.323 165.774 147.405 166.695 147.271 167.598C147.136 168.5 146.789 169.357 146.258 170.099C145.727 170.84 145.027 171.445 144.216 171.862C143.405 172.28 142.506 172.498 141.594 172.5Z"
                    />
                </svg>
            </div>
            <div class="card-description gray-text">
                <p>
                    {{place.description}}
                </p>
            </div>
            </section>
        </div>
        `);

    this.block.innerHTML += this.template({ place: this.place });
  }

  getHtml() {
    return this.block;
  }
}
