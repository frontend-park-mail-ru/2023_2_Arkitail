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

    let placesInTrip = [];
    for (let [_, v] of Object.entries(this.placesInTrip)) {
      placesInTrip.push(v);
    }

    this.placesInTrip = placesInTrip;
    this.days = new Map();

    for (const place of this.placesInTrip) {
      let begin = new Date(place.first_date);
      let end = new Date(place.last_date);

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
  }

  fromFetch(id) {
    /*
    let resp = await fetch(
      API_V1_URL + `/trips/${id}`,
      { method: 'GET' }
    );

    if (resp.status != 200) {
      throw new Error(await resp.json()['error']);
    }

    let respJson = resp.json();
    */

    this.normalize({
      "id": 0,
      "user_id": 0,
      "name": "string",
      "publicity": "public or private",
      "description": "string",
      "placesInTrip": {
        "additionalProp1": {
          "place": {
            "id": 0,
            "name": "string1",
            "description": "string",
            "rating": 0,
            "cost": "string",
            "adress": "string",
            "phone_number": "string",
            "review_count": 0,
            "web-site": "string",
            "email": "string",
            "open_hour": "string",
            "close_hour": "string",
            "image_url": "string"
          },
          "first_date": "2017-01-01",
          "last_date": "2017-01-02"
        },
        "additionalProp2": {
          "place": {
            "id": 0,
            "name": "string2",
            "description": "string",
            "rating": 0,
            "cost": "string",
            "adress": "string",
            "phone_number": "string",
            "review_count": 0,
            "web-site": "string",
            "email": "string",
            "open_hour": "string",
            "close_hour": "string",
            "image_url": "string"
          },
          "first_date": "2017-01-01",
          "last_date": "2017-01-02"
        },
        "additionalProp3": {
          "place": {
            "id": 0,
            "name": "string3",
            "description": "string",
            "rating": 0,
            "cost": "string",
            "adress": "string",
            "phone_number": "string",
            "review_count": 0,
            "web-site": "string",
            "email": "string",
            "open_hour": "string",
            "close_hour": "string",
            "image_url": "string"
          },
          "first_date": "2017-01-01",
          "last_date": "2017-01-02"
        }
      }
    });

    return this;
  }
}

class TripsPage extends Page {
  constructor() {
    super('trips', TRIPS_PAGE_TEMPLATE);

    this.trips = [
      (new Trip()).fromFetch(0),
      (new Trip()).fromFetch(1),
      (new Trip()).fromFetch(2),
      (new Trip()).fromFetch(3),
    ];
  }

  async getTrips() {
    /*
    let resp = await fetch(
      API_V1_URL + '/trips',
      { method: 'GET' }
    );

    if (resp.status != 200) {
      throw new Error(resp.json().error);
    }*/

    return this.trips;
  }

  async addTrip(trip) {
    this.trips.push(trip);
  }

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
      await this.addTrip(await (new Trip()).fromFetch(0));
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
    this.context = (new Trip()).fromFetch(params['id']);
  }

  async render() {
    await this.generateContext();
    await super.render();

    this.findElements();

    this.remove.addEventListener('click', () => { this.removeHandler() });
    this.edit.addEventListener('click', () => {
      this.nameInput.value = this.context.name;
      this.descriptionInput.value = this.context.description;
      this.toggle();
    });

    this.save.addEventListener('click', () => {
      this.toggle();
      this.context.name = this.nameInput.value;
      this.context.description = this.descriptionInput.value;
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
  }
}

