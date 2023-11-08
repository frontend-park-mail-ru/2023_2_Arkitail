const TRIP_PAGE_TEMPLATE = `
<div class='trip-header'>
  <div class='trip-toggle-first'>
    <div class='trip-name'>
      <p>{{name}}</p>
    </div>
    <div class='trip-manage'>
      <div class='trip-edit'>Редактировать</div>
      <div class='trip-remove'>Удалить</div>
    </div>
    <div class='trip-date'>{{begin}} - {{end}}</div>
  </div>
  <div class='trip-toggle-second'>
    <input class='trip-input-name' name='name' type='text'/>
    <div class='trip-manage'>
      <div class='trip-save'>Сохранить</div>
      <div class='trip-cancel'>Отменить</div>
    </div>
    <div class='trip-date'>{{begin}} - {{end}}</div>
  </div>
</div>

<div class='trip-grid'>
  <div class='trip-grid-col'>
    <div class='trip-grid-row trip-description'>
      <p class='trip-toggle-first'>{{description}}</p>
      <input class='trip-input-description trip-toggle-second' name='description' type='text'/>
    </div>
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

      <div class='trip-plan-days'>
        {{#eachInMap days}}
        <div class='trip-plan-day'>
          <div class='trip-plan-day-header'>
            <p class='trip-plan-day-date'>{{this.key}}</p>
            <button class='trip-plan-day-show'>Show/Hide</button>
          </div>
          <div class='trip-plan-points'>
          {{#each this.value}}
            <div class='trip-plan-point'>
              <div class='trip-plan-point-header'>
                <p class='trip-plan-point-name'>{{this.name}}</p>
                <p class='trip-plan-point-description'>{{this.description}}</p>
              </div>
            </div>
          {{/each}}
          </div>
        </div>
        {{/eachInMap}}
      </div>
    </div>
  </div>
  <div class='trip-grid-col trip-members'>
    <p>Участники</p>
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
