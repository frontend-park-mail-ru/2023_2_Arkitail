const TRIP_PAGE_TEMPLATE = `
<div class='trip-toggle-first'>
  <div class='trip-header'>
    <h1 class='trip-name general-main-title'>{{name}}</h1>
    <div class='trip-manage'>
      <button class='trip-edit btn green-btn'>Редактировать</button>
      <button class='trip-remove btn red-btn'>Удалить</button>
    </div>
  </div>
</div>

<div class='trip-toggle-second'>
  <div class='trip-header'>
    <input class='trip-input-name input-field' name='name' type='text'/>
    <div class='trip-manage'>
      <button class='trip-save btn green-btn'>Сохранить</button>
      <button class='trip-cancel btn blue-btn'>Отменить</button>
    </div>
  </div>
</div>

<div class='trip-date'>{{begin}} - {{end}}</div>

<div class='trip-content'>
  <div class='trip-description card trip-card'>
    <h1 class='general-title'>Описание</h1>
    <p class='trip-toggle-first'>{{description}}</p>
    <input class='trip-input-description trip-toggle-second' name='description' type='text'/>
  </div>
  
  <div class='trip-plan card trip-card'>
    <div class='trip-plan-header'>
      <div class='trip-plan-name'>
        <h1 class='general-title'>План</h1>
      </div>
      <div class='trip-plan-new-point'>
        <input class='trip-plan-new-point-id input-field' name='new-trip-id' placeholder=''>
        <button class='btn blue-btn'>
          Добавить место
        </button>
      </div>
    </div>
  </div>
  
  <div class='trip-plan-days card'>
    {{#eachInMap days}}
    <div class='trip-plan-day'>
      <div class='trip-plan-day-header'>
        <p class='trip-plan-day-date'>{{this.key}}</p>
        <button class='trip-plan-day-show'>Show/Hide</button>
      </div>
      <div class='trip-plan-points'>
      {{#each this.value}}
        <di trip-cardv class='trip-plan-point card trip-card'>
          <div class='trip-plan-point-header'>
            <h1>Название места</h1>
            <p class='trip-plan-point-name'>{{this.name}}</p>
            <h1>Описание</h1>
            <p class='trip-plan-point-description'>{{this.description}}</p>
          </div>
        </div>
      {{/each}}
      </div>
    </div>
    {{/eachInMap}}
  </div>
</div>`

const TRIPS_PAGE_TEMPLATE = `
<div class='trips-name'><h1>Поездки</h1></div>
  <div class='trips-new'>Добавить поездку</div>
  <div class='trips-grid'>
    {{#each trips}}
    <div class='trip-card' gateway='#page=trip;id={{this.id}};'>
      <div class='trip-card-caption'>
        <h1>{{this.name}}</h1>
      </div>
      <div class='trip-card-date'><span>{{this.begin}} - {{this.end}}</span></div>
      <div class='trip-card-description'>{{this.description}}</div>
    </div>
    {{/each}}
  </div>
</div>
`
