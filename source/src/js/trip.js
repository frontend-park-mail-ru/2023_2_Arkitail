class Trip {
  constructor(id, caption, begin, end, description) {
    this.id = id;
    this.caption = caption
    this.begin = begin;
    this.end = end;
    this.description = description;
  }

  card() {
    let cardTemplate = Handlebars.compile(`
      <div class='trip-card'>
        <div class='trip-card-caption'><h1>{{caption}}</h1></div>
        <div class='trip-card-date'><span>{{begin}} - {{this.end}}</span></div>
        <div class='trip-card-description'>{{description}}</div>
      </div>
    `);

    return cardTemplate({
      caption: this.caption,
      begin: this.begin,
      end: this.end,
      description: this.description,
    });
  }
}

class TripsPage extends Page {
  constructor() {
    let template = `
      {{#each trips}}
      <div class='trip-card card' gateway='#page=trip;id={{this.id}};'>
        <div class='trip-card-caption'><h1>{{this.caption}}</h1></div>
        <div class='trip-card-date'><span>{{this.begin}} - {{this.end}}</span></div>
        <div class='trip-card-description'>{{this.description}}</div>
      </div>
      {{/each}}`;

    super('trips page-padding-vertical', template);
  }

  async getTrips() {
    return [
      new Trip(1, 'caption', '01 Jar', '01 Jar', 'description'),
      new Trip(2, 'caption', '01 Jar', '01 Jar', 'description'),
      new Trip(3, 'caption', '01 Jar', '01 Jar', 'description'),
      new Trip(4, 'caption', '01 Jar', '01 Jar', 'description'),
      new Trip(5, 'caption', '01 Jar', '01 Jar', 'description'),
      new Trip(6, 'caption', '01 Jar', '01 Jar', 'description'),
    ];
  }

  async renderTemplate() {
    await this.generateContext();
    await super.renderTemplate();
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
      <div class ='trip-caption'></div>
      <div class ='trip-date'></div>
      <div class ='trip-grid'>
        <div class ='trip-description'></div>
        <div class ='trip-members'></div>
        <div class ='trip-plan'></div>
      </div>
    `;
    super("trip", template);
  }


}

