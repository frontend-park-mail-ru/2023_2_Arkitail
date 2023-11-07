class Trip {
  async fromFetch(id) {
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

    let respJson = {
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
    }

    this.id = respJson['id'];
    this.name = respJson['name'];
    this.description = respJson['description'];
    this.days = new Map();
    this.placesInTrip = [];
    this.begin = '01 Jan 1970';
    this.end = '01 Jan 1970';

    for (const [_, point] of Object.entries(respJson['placesInTrip'])) {
      this.placesInTrip.push(point.place);
      let begin = new Date(point.first_date);
      let end = new Date(point.last_date);

      for (; begin.getDate() !== end.getDate(); begin.setDate(begin.getDate() + 1)) {
        if (!this.days.has(begin)) {
          this.days.set(begin, []);
        }

        this.days.get(begin).push(point.place);
      }
    }

    return this;
  }
}

class TripsPage extends Page {
  constructor() {
    super('trips', TRIPS_PAGE_TEMPLATE);

    this.trips = [];
  }

  async getTrips() {
    /**/
    let resp = await fetch(
      API_V1_URL + '/trips',
      { method: 'GET' }
    );

    if (resp.status == 401) {
      throw new Error('Unauthorized');
    } else if (resp.status == 404) {
      throw new Error('User doesn\'t exist?');
    }

    

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
    console.log(this.toggleState);
  }

  findElements() {
    this.edit = this.node.querySelector('.trip-edit');
    this.remove = this.node.querySelector('.trip-remove');
    this.save = this.node.querySelector('.trip-save');
    this.cancel = this.node.querySelector('.trip-cancel');
    this.nameInput = this.node.querySelector('.trip-input-name');
    this.descriptionInput = this.node.querySelector('.trip-input-description');
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

  addPlaceHandler() {}

  async generateContext() {
    let params = main.serializeLocationHash(main.context.location);
    this.context = await (new Trip()).fromFetch(params['id']);
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
  }
}

