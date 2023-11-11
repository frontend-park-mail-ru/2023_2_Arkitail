function formatDate(date) {
  return Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

class Trip {
  normalize(raw) {
    for (let [k, v] of Object.entries(raw)) {
      this[k] = v;
    }

    console.log(this);

    let placesInTrip = [];
    for (let [_, v] of Object.entries(this.placesInTrip)) {
      placesInTrip.push(v);
    }

    this.placesInTrip = placesInTrip;
    this.days = new Map();

    for (const place of this.placesInTrip) {
      let begin = new Date(place.firstDate);
      let end = new Date(place.lastDate);

      if (place.lastDate === "") {
        end = new Date(place.firstDate);
      }

      if (this.begin === undefined || new Date(this.begin) > begin) {
        this.begin = formatDate(begin);
      }

      if (this.end === undefined || new Date(this.end) > end) {
        this.end = formatDate(end);
      }

      for (; begin <= end; begin.setDate(begin.getDate() + 1)) {
        let formatedDate = formatDate(begin);
        if (!this.days.has(formatedDate)) {
          this.days.set(formatedDate, []);
        }

        this.days.get(formatedDate).push(place.place);
      }
    }

    console.log(this.days);
    return this;
  }

  async fromFetch(id) {
    let resp = await fetch(
      API_V1_URL + `/trips/${id}`,
      { method: 'GET' }
    );

    if (resp.status != 200) {
      throw new Error(await resp.json()['error']);
    }

    this.normalize(await resp.json());

    return this;
  }
}

class TripsPage extends Page {
  constructor() {
    super('trips page-padding-horizontal page-padding-vertical', TRIPS_PAGE_TEMPLATE);

    this.trips = [];
  }

  async getTrips() {
    let resp = await fetch(
      API_V1_URL + '/trips',
      { method: 'GET' }
    );

    if (resp.status != 200) {
      // throw new Error(resp.json().error);
    }

    let trips = [];

    for (let [_, v] of Object.entries(await resp.json())) {
      trips.push((new Trip()).normalize(v));
    }

    return trips;
  }

  async addTrip(trip) {}

  async editCard() {
    return 
  }

  removeCard() {}

  async render() {
    await this.generateContext();
    await super.render();
    this.node
    .querySelector('.trips-new')
    .addEventListener('click', async () => {
      await fetch(API_V1_URL + '/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": "Новая поездка",
          "description": "Описание новой поездки",
          "placesInTrip": {},
        }),
      });

      main.route('#page=trips;');
    });
  }

  async generateContext() {
    let trips = await this.getTrips();
    this.context = {
      'trips': trips,
    };
  }
}

class TripPage extends Page {
  static TOGGLE_VIEW = 0;
  static TOGGLE_EDIT = 1;

  static TOGGLE = (new Map())
  .set(TripPage.TOGGLE_VIEW, TripPage.TOGGLE_EDIT)
  .set(TripPage.TOGGLE_EDIT, TripPage.TOGGLE_VIEW)

  constructor() {
    super('trip', TRIP_PAGE_TEMPLATE);
    this.toggleState = TripPage.TOGGLE_VIEW;
  }

  findElements() {
    this.edit = this.node.querySelector('.trip-edit');
    this.remove = this.node.querySelector('.trip-remove');
    this.save = this.node.querySelector('.trip-save');
    this.cancel = this.node.querySelector('.trip-cancel');
    this.nameInput = this.node.querySelector('.trip-input-name');
    this.descriptionInput = this.node.querySelector('.trip-input-description');
    this.planDays = this.node.querySelector('.trip-plan-days');
    this.newPoint = this.node.querySelector('.trip-plan-new-point');
  }

  toggle() {
    this.toggleState = TripPage.TOGGLE.get(this.toggleState);

    this.node
    .querySelectorAll('.trip-toggle-first')
    .forEach((elem) => {
      switch (this.toggleState) {
        case TripPage.TOGGLE_VIEW:
          elem.style.display = 'block';
          break;
        case TripPage.TOGGLE_EDIT:
          elem.style.display = 'none';
          break;
      };
    });

    this.node
    .querySelectorAll('.trip-toggle-second')
    .forEach((elem) => {
      switch (this.toggleState) {
        case TripPage.TOGGLE_VIEW:
          elem.style.display = 'none';
          break;
        case TripPage.TOGGLE_EDIT:
          elem.style.display = 'block';
          break;
      };
    });
  }

  editHandler() {
    this.toggle();
  }

  removeHandler() {
    /*
    let resp = await fetch(
      API_V1_URL + `/trip/${this.context.id}`,
      { 'method': 'DELETE' },
    );
    if (resp.status == 401) {
      throw Error('Unauthorized');
    } else if (resp.status == 404) {
      throw Error('Couldn\'t find a trip');
    }
    */

    main.route('#page=trips;');
  }

  async generateContext() {
    let params = main.serializeLocationHash(main.context.location);
    this.context = await (new Trip()).fromFetch(params['id']);
  }

  async render() {
    await this.generateContext();
    await super.render();

    this.findElements();

    this.remove.addEventListener('click', () => {
      fetch(API_V1_URL + `/trips/${this.context.id}`, {method: 'DELETE'})
      .then(main.route('#page=trips;'));
    });

    this.edit.addEventListener('click', () => {
      this.nameInput.value = this.context.name;
      this.descriptionInput.value = this.context.description;
      this.toggle();
    });

    this.save.addEventListener('click', () => {
      this.toggle();
      this.context.name = this.nameInput.value;
      this.context.description = this.descriptionInput.value;
      fetch(
        API_V1_URL + `/trips/${this.context.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: this.context.name,
            description: this.context.description,
            publicity: 'private',
          }),
        },
      ).then(main.route(window.location.hash));
      console.log(this.context);
    });

    this.cancel.addEventListener('click', () => {
      this.toggle();
    });

    this.planDays.querySelectorAll('.trip-plan-day').forEach(elem => {
      let btn = elem.querySelector('.trip-plan-day-show');
      let points = elem.querySelector('.trip-plan-points');

      let mode = 0;

      btn.addEventListener('click', () => {
        if (mode == 0) {
          points.style.display = 'none';
          mode = 1;
        } else if (mode == 1) {
          points.style.display = 'block';
          mode = 0;
        }
      });
    });

    this.newPoint.querySelector('button').addEventListener('click', () => {
      fetch(
        API_V1_URL + `/trips/${this.context.id}/place`,
        {
          method: 'POST',
          body: JSON.stringify({
            "placeId": Number(this.newPoint.querySelector('input').value),
            "firstDate": "2017-01-01",
            "lastDate": "2017-01-02",
          }),
        });
    });
  }
}

