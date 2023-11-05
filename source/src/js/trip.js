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
            "name": "string",
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
            "name": "string",
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
            "name": "string",
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
    this.placesInTrip = [];
    this.begin = '01 Jan 1970';
    this.end = '01 Jan 1970';

    for (const [_, point] of Object.entries(respJson['placesInTrip'])) {
      this.placesInTrip.push(point);
    }
    return this;
  }
}

class TripsPage extends Page {
  constructor() {
    let template = `
      <div class='trips-name'><h1>Поездки</h1></div>
      <div class='trips-new'>Добавить поездку</div>
      <div class='trips-grid'>
        {{#each trips}}
        <div class='trip-card' gateway='#page=trip;id={{this.id}};'>
          <div class='trip-card-caption'>
            <h1>{{this.name}}</h1>
            <div class='trip-card-remove'>R</div>
          </div>
          <div class='trip-card-date'><span>{{this.begin}} - {{this.end}}</span></div>
          <div class='trip-card-description'>{{this.description}}</div>
        </div>
        {{/each}}
      </div>`;

    super('trips', template);

    this.trips = [];
  }

  async getTrips() {
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
  constructor() {
    let template = `
      <div class='trip-header'>
        <div class='trip-name trip-editable'>{{name}}</div>
        <div class='trip-manage'>
          <div class='trip-edit'>Редактировать</div>
          <div class='trip-remove'>Удалить</div>
        </div>
      </div>
      <div class='trip-date trip-editable'>{{begin}} - {{end}}</div>
      <div class='trip-grid'>
        <div class='trip-grid-col'>
          <div class='trip-grid-row trip-description trip-editable'>{{description}}</div>
          <div class='trip-grid-row trip-plan'>
            <div class='trip-plan-header'>
              <div class='trip-plan-name'>
                <h1>План</h1>
                <div class='trip-plan-new-point'>
                  Добавить место
                </div>
              </div>
              <div></div>
            </div>
            <div class='trip-plan-points'>
              {{#each placesInTrip}}
              <div class='trip-plan-point'>
                {{this.place.name}}
              </div>
              {{/each}}
            </div>
          </div>
        </div>
        <div class='trip-grid-col trip-members'>Участники</div>
      </div>
    `;

    super('trip', template);
  }

  editHandler() {
    this.node
    .querySelector('.trip-edit')
    .replace(, );
    

    this.node
    .querySelector('.trip-remove');

    this.node
    .querySelectorAll('.trip-editable')
    .forEach((elem) => {
      let input = document.createElement('input');

    });
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
    this.node
    .querySelector('.trip-remove')
    .addEventListener('click', () => {
      this.removeHandler();
    });

    this.node
    .querySelector('.trip-edit')
    .addEventListener('click', () => {
      this.editHandler();
    });
  }
}

