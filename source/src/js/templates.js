const TRIP_PAGE_TEMPLATE = `
<div class='trip-toggle-first'>
  <div class='trip-header'>
    <div class='trip-name'>
      <p>{{name}}</p>
    </div>
    <div class='trip-manage'>
      <button class='trip-edit btn green-btn'>Редактировать</button>
      <button class='trip-remove btn blue-btn'>Удалить</button>
    </div>
  </div>
</div>
<div class='trip-toggle-second'>
  <div class='trip-header'>
    <input class='trip-input-name' name='name' type='text'/>
    <div class='trip-manage'>
      <button class='trip-save btn green-btn'>Сохранить</button>
      <button class='trip-cancel btn gray-btn'>Отменить</button>
    </div>
  </div>
</div>
<div class='trip-date'>{{begin}} - {{end}}</div>

<div class='trip-grid'>
  <div class='trip-grid-col'>
    <div class='trip-grid-row trip-description'>
      <h1>Описание</h1>
      <p class='trip-toggle-first'>{{description}}</p>
      <input class='trip-input-description trip-toggle-second' name='description' type='text'/>
    </div>
    <div class='trip-grid-row trip-plan'>
      <div class='trip-plan-header'>
        <div class='trip-plan-name'>
          <h1>План</h1>
          <div class='trip-plan-new-point'>
            <button>
              Добавить место
            </button>
            <input class='trip-plan-new-point-id' name='new-trip-id' placeholder=''>
          </div>
        </div>
      </div>
    </div>
    <div class='trip-grid-row'>
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
              <div class='trip-plan-point-header'><hr/>
                <p class='trip-plan-point-name'>{{this.name}}</p>
                <p class='trip-plan-point-description'>{{this.description}}</p>
              <hr/></div>
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
</div>`;

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
`;
const LOGIN_PAGE_TEMPLATE = `
<div class="goto-form">
  <figure class="logo">
      <img gateway='#page=main;' src="/static/img/logo.svg" alt="GoTo" />
      <figcaption>
          <p class="title">Время путешествовать</p>
      </figcaption>
  </figure>
  <form>
      <div class="form-item email">
          <input name="email" type="email" placeholder="Ваша почта" />
      </div>
      <div class="form-item password">
          <input name="password" type="password" placeholder="Ваш пароль" />
      </div>
      <div class="form-submit submit">
          <input class="btn fill-green-btn" type="submit" value="Войти" />
      </div>

      <div>
          <p error class="validation-error"></p>
      </div>
  </form>
  <div class="form-footer">
      <p class="forgot-password">Забыли пароль?</p>
      <p class="non-registered">Ещё не зарегестрированы?</p>
      <p gateway="#page=signup;" class="register">
          <span class="goto-signup-link">Зарегестрироваться</span>
      </p>
  </div>
</div>
`;

const SIGNUP_PAGE_TEMPLATE = `
<div class="goto-form">
  <figure class="logo">
    <img gateway='#page=main;' src="/static/img/logo.svg" alt="GoTo" />
    <figcaption>
      <p class="title">Начните путешествовать сейчас</p>
      <p>моментальная регистрация</p>
    </figcaption>
  </figure>
  <form>
    <div class="form-item name">
      <input name="name" type="text" placeholder="Ваше имя" />
    </div>
    <div class="form-item email">
      <input name="email" type="text" placeholder="Ваша почта" />
    </div>
    <div class="form-item password">
      <input name="password" type="password" placeholder="Ваш пароль" />
    </div>
    <div class="form-item repeat-password">
      <input
        name="repeat-password"
        type="password"
        placeholder="Ваш пароль еще раз"
      />
    </div>
    <!-- <div class="input-group-label">Дата рождения</div>
    <div class="form-item input-group">
      <div class="input-group-item">
        <input name="day" type="text" placeholder="День" />
      </div>
      <div class="input-group-item">
        <input name="month" type="text" placeholder="Месяц" />
      </div>
      <div class="input-group-item">
        <input name="year" type="text" placeholder="Год" />
      </div>
    </div> -->
    <div class="form-submit submit">
      <input class="btn fill-green-btn" name="submit" type="submit" value="Зарегистрироваться" />
    </div>

    <div>
        <p error class="validation-error"></p>
    </div>
  </form>
  <div class="form-footer">
    <p gateway="#page=login;" class="login">
      Уже есть аккаунт? <span class="goto-login-link">Войти</span>
    </p>
  </div>
</div>
`;

const MAIN_PAGE_TEMPLATE = `
<div data-carousel class="list-of-places-carousel"></div>
<div data-list-of-places class="list-of-places page-padding-vertical"></div>
`;

const MAIN_PAGE_CAROUSEL_SLIDE_TEMPLATE = `
<div>
  <img src="{{place.imageUrl}}" />
  <div class="desc">
    <p>{{place.name}}</p>
    <button gateway="#page=place;id={{place.id}};">
      <p>Узнать больше</p>
    </button>
  </div>
</div>
`;

const PLACE_PAGE_TEMPLATE = `
<div class="page-body-margin">
    <p class="general-main-title">{{ place.name }}</p>
    <div class="reviews md-size-text">
        <svg
            class="star active"
            viewBox="0 0 184 184"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
                d="M141.594 172.5C140.383 172.505 139.203 172.127 138.219 171.422L92 137.914L45.7808 171.422C44.7933 172.138 43.6037 172.522 42.3839 172.517C41.1641 172.513 39.9773 172.121 38.9951 171.397C38.0128 170.674 37.2861 169.657 36.92 168.493C36.5538 167.33 36.5672 166.08 36.9581 164.924L54.9844 111.532L8.26562 79.4938C7.25366 78.8006 6.48989 77.8019 6.08591 76.6437C5.68193 75.4856 5.6589 74.2285 6.02019 73.0563C6.38149 71.8841 7.10817 70.8582 8.09406 70.1284C9.07995 69.3986 10.2734 69.0032 11.5 69H69.1366L86.5303 15.4711C86.905 14.3154 87.6361 13.3081 88.6188 12.5937C89.6014 11.8793 90.7851 11.4945 92 11.4945C93.2149 11.4945 94.3986 11.8793 95.3812 12.5937C96.3639 13.3081 97.095 14.3154 97.4697 15.4711L114.863 69.018H172.5C173.728 69.0174 174.924 69.41 175.913 70.1384C176.902 70.8668 177.632 71.8926 177.995 73.0657C178.359 74.2388 178.337 75.4975 177.934 76.6575C177.53 77.8174 176.766 78.8177 175.752 79.5117L129.016 111.532L147.031 164.91C147.323 165.774 147.405 166.695 147.271 167.598C147.136 168.5 146.789 169.357 146.258 170.099C145.727 170.84 145.027 171.445 144.216 171.862C143.405 172.28 142.506 172.498 141.594 172.5Z"
                
            />
        </svg>

        <p class="rating">{{ place.rating }}</p>
        <a data-reviews-anchor class="gray-underline-text">{{ place.reviewCount }} отзывов</a>
    </div>
</div>

<div class="line">
    <hr>
    <p class="work-schedule md-size-text">Открыто сейчас <span class="gray-text"> {{ place.openHour }}-{{ place.closeHour }} </span></p>
    <hr>
</div>

<div class="info-card">
    <img src="{{ place.imageUrl }}" />

    <div class="info-container">
        <div class="page-body-margin info card">
            <p class="general-title">Информация</p>

            <p class="gray-text description broken-text">
                {{ place.description }}
            </p>

            <div>
                <p class="general-subtitle">Адрес</p>
                <p class="gray-underline-text"> {{ place.adress }} </p>
            </div>

            <div>
                <p class="general-subtitle">Контакты</p>
                <div class="contacts">

                    {{#if place.website}}
                    <p class="gray-underline-text"> 
                        {{ place.website }}
                    </p>
                    {{else}}
                    <p class="gray-text"> 
                        Сайт отсутствует
                    </p>
                    {{/if}}
                    
                    {{#if place.email}}
                    <p class="gray-underline-text"> 
                        {{ place.email }}
                    </p>
                    {{else}}
                    <p class="gray-text"> 
                        Почта отсутствует
                    </p>
                    {{/if}}
                    
                    {{#if place.phoneNumber}}
                    <p class="gray-underline-text"> 
                        {{ place.phoneNumber }}
                    </p>
                    {{else}}
                    <p class="gray-text"> 
                        Номет телефона отсутствует
                    </p>
                    {{/if}}

                </div>
            </div>
        </div>
    </div>
</div>

<div class="page-body-margin">
<button data-choose-trip-btn class="btn green-btn">Добавить в поездку</button>

<select class="input-field" data-select-trip class="field">
{{#each trips}}
  <option value="{{this.id}}">{{this.name}}</option>
{{/each}}
</select>
</div>

<div>
    <div data-reviews class="page-body-margin">
        <p class="general-title">Отзывы</p>

        <div class="reviews-header grid-bottom">
            <div class="stars md-size-text">
                <p class="rating">{{ place.rating }}</p>
                {{#stars 5 place.rating}}
                <svg
                    class="star {{@active}}"
                    viewBox="0 0 184 184"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M141.594 172.5C140.383 172.505 139.203 172.127 138.219 171.422L92 137.914L45.7808 171.422C44.7933 172.138 43.6037 172.522 42.3839 172.517C41.1641 172.513 39.9773 172.121 38.9951 171.397C38.0128 170.674 37.2861 169.657 36.92 168.493C36.5538 167.33 36.5672 166.08 36.9581 164.924L54.9844 111.532L8.26562 79.4938C7.25366 78.8006 6.48989 77.8019 6.08591 76.6437C5.68193 75.4856 5.6589 74.2285 6.02019 73.0563C6.38149 71.8841 7.10817 70.8582 8.09406 70.1284C9.07995 69.3986 10.2734 69.0032 11.5 69H69.1366L86.5303 15.4711C86.905 14.3154 87.6361 13.3081 88.6188 12.5937C89.6014 11.8793 90.7851 11.4945 92 11.4945C93.2149 11.4945 94.3986 11.8793 95.3812 12.5937C96.3639 13.3081 97.095 14.3154 97.4697 15.4711L114.863 69.018H172.5C173.728 69.0174 174.924 69.41 175.913 70.1384C176.902 70.8668 177.632 71.8926 177.995 73.0657C178.359 74.2388 178.337 75.4975 177.934 76.6575C177.53 77.8174 176.766 78.8177 175.752 79.5117L129.016 111.532L147.031 164.91C147.323 165.774 147.405 166.695 147.271 167.598C147.136 168.5 146.789 169.357 146.258 170.099C145.727 170.84 145.027 171.445 144.216 171.862C143.405 172.28 142.506 172.498 141.594 172.5Z"
                        
                    />
                </svg>
                {{/stars}}
            </div>

            <p gateway="#page=reviews;" class="gray-underline-text md-size-text">{{ place.reviewCount }} отзывов</p>

            <div class="write-review">
                <button data-add-review-btn class="btn blue-btn">
                    Написать отзыв
                </button>
            </div>
        </div>
    </div>
</div>

<div data-write-review-card-container class="write-review-card-container page-body-margin">
</div>

<div data-carousel class="place-carousel page-body-margin"></div>

<button gateway="#page=reviews;id={{ place.id }};" class="all-reviews-btn btn green-btn page-body-margin">
    Все отзывы
</button>
`;

const PROFILE_PAGE_TEMPLATE = `
<div class="profile">
    <div class="profile-picture">
        <img src="../../static/img/example.jpg" alt="Ваше фото профиля">
        <p>{{userName}}</p>
        {{#if isEditing}}
            <div class="edit-buttons">
                <button id="save-button">Сохранить</button>
                <button id="cancel-button">Отмена</button>
            </div>
        {{else}}
            <button class="edit-profile-button" id="edit-button">Редактировать профиль</button>
        {{/if}}
    </div>
    <div class="info-panel">
        <div class="info-item">
            {{#if isEditing}}
                <p><strong>Имя:</strong><input type="text" id="userNameInput" value="{{userName}}"></p>
                <p><strong>День рождения:</strong><input type="text" id="birthdayInput" value="{{birthday}}"></p>
                <p><strong>О себе:</strong><textarea id="aboutInput" rows="4">{{about}}</textarea></p>
            {{else}}
                <p><strong>Имя:</strong> {{userName}}</p>
                <p><strong>День рождения:</strong> {{birthday}}</p>
                <p><strong>О себе:</strong> {{about}}</p>
            {{/if}}
        </div>
    </div>
</div>
`;

const REVIEWS_PAGE_TEMPLATE = `
<div class="reviews-header page-body-margin grid-bottom">
    <p class="general-main-title">
        Все отзывы
    </p>
    <div class="write-review">
        <button data-add-review-btn class="btn blue-btn">
            Написать отзыв
        </button>
    </div>
</div>

<div data-list-of-reviews class="list-of-reviews page-body-margin">
</div>
`;

const SEARCH_PAGE_TEMPLATE = `
<div data-filters class="list-of-places-filters page-padding-horizontal"></div>
<div data-list-of-places class="list-of-places"></div>
`;
