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
    <textarea class='trip-input-description trip-toggle-second' name='description'></textarea>
  </div>
  
  <div class='card'>
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
    
    <div class='trip-plan-days'>
      {{#eachInMap days}}
      <div class='trip-plan-day'>
        <div class='trip-plan-day-header trip-card green-trip-card'>
          <p class='trip-plan-day-date'>{{this.key}}</p>
          <button class='trip-plan-day-show btn green-btn'>Show/Hide</button>
        </div>
        <div class='trip-plan-points'>
        {{#each this.value}}
          <div class='trip-plan-point card trip-card'>
            <div class='trip-plan-point-header'>
              <h1 class='trip-plan-point-name general-subtitle'>{{this.name}}</h1>
              <button class='btn red-btn'><svg class="trash" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.875 2.34375H3.125C2.26206 2.34375 1.5625 3.04331 1.5625 3.90625V4.6875C1.5625 5.55045 2.26206 6.25 3.125 6.25H21.875C22.7379 6.25 23.4375 5.55045 23.4375 4.6875V3.90625C23.4375 3.04331 22.7379 2.34375 21.875 2.34375Z"/>
          <path d="M3.63578 7.81251C3.58088 7.81221 3.52654 7.82349 3.4763 7.8456C3.42606 7.86772 3.38104 7.90017 3.34418 7.94085C3.30733 7.98153 3.27946 8.02953 3.26239 8.0817C3.24533 8.13388 3.23945 8.18906 3.24515 8.24366L4.52982 20.5757C4.52956 20.5793 4.52956 20.5829 4.52982 20.5864C4.59694 21.1568 4.87116 21.6827 5.30043 22.0643C5.72969 22.4458 6.28411 22.6565 6.85843 22.6563H18.1421C18.7163 22.6562 19.2705 22.4455 19.6995 22.0639C20.1286 21.6824 20.4027 21.1567 20.4698 20.5864V20.5762L21.7525 8.24366C21.7582 8.18906 21.7523 8.13388 21.7352 8.0817C21.7182 8.02953 21.6903 7.98153 21.6534 7.94085C21.6166 7.90017 21.5716 7.86772 21.5213 7.8456C21.4711 7.82349 21.4167 7.81221 21.3618 7.81251H3.63578ZM15.7871 16.6353C15.8614 16.7074 15.9206 16.7936 15.9613 16.8889C16.0019 16.9841 16.0232 17.0865 16.024 17.19C16.0247 17.2936 16.0048 17.3963 15.9655 17.4921C15.9262 17.5879 15.8683 17.6749 15.795 17.7481C15.7218 17.8213 15.6347 17.8793 15.5389 17.9185C15.4431 17.9578 15.3404 17.9776 15.2368 17.9768C15.1333 17.976 15.0309 17.9547 14.9357 17.914C14.8405 17.8733 14.7543 17.8141 14.6822 17.7398L12.5005 15.5581L10.3184 17.7398C10.1712 17.8828 9.97365 17.9621 9.76844 17.9607C9.56322 17.9592 9.36681 17.8771 9.22167 17.732C9.07652 17.5869 8.99429 17.3905 8.99275 17.1853C8.9912 16.9801 9.07047 16.7825 9.21341 16.6353L11.3955 14.4531L9.21341 12.271C9.07047 12.1238 8.9912 11.9262 8.99275 11.7209C8.99429 11.5157 9.07652 11.3194 9.22167 11.1743C9.36681 11.0292 9.56322 10.9471 9.76844 10.9456C9.97365 10.9441 10.1712 11.0235 10.3184 11.1665L12.5005 13.3481L14.6822 11.1665C14.8293 11.0235 15.0269 10.9441 15.2321 10.9456C15.4373 10.9471 15.6337 11.0292 15.7789 11.1743C15.924 11.3194 16.0063 11.5157 16.0078 11.7209C16.0094 11.9262 15.9301 12.1238 15.7871 12.271L13.605 14.4531L15.7871 16.6353Z"/>
</button>
            </div>
            <div class='trip-plan-point-content'>
              <img src="{{this.imageUrl}}"/>
              <p class='trip-plan-point-description'>{{this.description}}</p>
            </div>
          </div>
        {{/each}}
        </div>
      </div>
      {{/eachInMap}}
    </div>
  </div>
</div>`;

const TRIPS_PAGE_TEMPLATE = `
<div class="trips-header-grid">
  <p class="general-main-title">Поездки</p>
  <div class='trips-new btn blue-btn'>Добавить поездку</div>
</div>
<div class='trips-grid page-padding-vertical'>
  {{#each trips}}
  <div class='trip-card card' gateway='#page=trip;id={{this.id}};'>
    <div class='trips-content-padding trip-card-caption'>
      <h1 class="broken-text general-subtitle">{{this.name}}</h1>
    </div>
    <div class='trips-content-padding trip-card-date'><span>{{this.begin}} - {{this.end}}</span></div>
    <div class='gray-text trips-content-padding trip-card-description'>{{this.description}}</div>
  </div>
  {{/each}}
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
<option value="">Выбрать поездку</option>
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
<div class="profile grid-bottom">
    <div class="profile-picture">
        <img src="../../static/img/example.jpg" alt="Ваше фото профиля">
        <p>{{userName}}</p>
        {{#if isEditing}}
            <div class="edit-buttons">
                <button class="btn green-btn" id="save-button">Сохранить</button>
                <button class="btn gray-btn" id="cancel-button">Отмена</button>
            </div>
        {{else}}
            <button class="edit-profile-button btn fill-green-btn" id="edit-button">Редактировать профиль</button>
        {{/if}}
    </div>
    <div class="info-panel">
        <div class="info-item card">
            {{#if isEditing}}
                <p><strong>Имя:</strong><input class="input-field" type="text" id="userNameInput" value="{{userName}}"></p>
                <p><strong>День рождения:</strong><input class="input-field" type="text" id="birthdayInput" value="{{birthday}}"></p>
                <p><strong>О себе:</strong><textarea class="input-field" id="aboutInput" rows="4">{{about}}</textarea></p>
            {{else}}
                <p><strong>Имя:</strong> {{userName}}</p>
                <p><strong>День рождения:</strong> {{birthday}}</p>
                <p class="broken-text"><strong>О себе:</strong> {{about}}</p>
            {{/if}}
        </div>
    </div>
</div>`;

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

const HEADER_TEMPLATE = `
<input class="side-menu" type="checkbox" id="side-menu" />

<label class="hamb" for="side-menu">
  <span class="hamb-line"></span>
</label>

<img gateway="#page=main;" class="logo" src="/static/img/logo.svg" alt="GoTo" />

<nav>
    <ul class="menu">
    {{#each menu}}
    {{#if this.show}}
      <li><a class="{{this.styleClass}}" {{this.attr}} gateway="{{this.url}}">{{this.name}}</a></li>
    {{/if}}
    {{/each}}
    {{#if authenticated}}
    {{/if}}
    </ul>
</nav>

{{#if authenticated}}

<div data-logout class="right-menu authorized btn red-btn">
  Выйти
</div>

<div class="right-menu authorized">
  <div class="mini-avatar">
    <!-- {{#if ""}}
    <img src="{{""}}"/>
    {{/if}} -->
  </div>
  <p gateway="#page=profile;" class="hidden-on-mobile">{{this.userName}}</p></div>
{{else}}
<button gateway="#page=signup;" class="right-menu btn fill-green-btn hidden-on-mobile">
    <p>Регистрация</p>
</button>
<button gateway="#page=login;" class="right-menu btn blue-btn">
  <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5928 1.52719C12.6806 0.542344 11.4065 0 10.0003 0C8.58652 0 7.30824 0.539062 6.40027 1.51781C5.48246 2.50734 5.03527 3.85219 5.14027 5.30437C5.34839 8.16937 7.52855 10.5 10.0003 10.5C12.472 10.5 14.6484 8.16984 14.8598 5.30531C14.9662 3.86625 14.5162 2.52422 13.5928 1.52719V1.52719ZM18.2503 21H1.75027C1.5343 21.0028 1.32042 20.9574 1.12419 20.8672C0.927959 20.7769 0.754316 20.6441 0.615893 20.4783C0.311206 20.1141 0.188393 19.6167 0.279331 19.1137C0.674956 16.9191 1.90964 15.0755 3.85027 13.7812C5.57433 12.6323 7.75824 12 10.0003 12C12.2423 12 14.4262 12.6328 16.1503 13.7812C18.0909 15.075 19.3256 16.9186 19.7212 19.1133C19.8121 19.6162 19.6893 20.1136 19.3846 20.4778C19.2463 20.6437 19.0726 20.7766 18.8764 20.867C18.6802 20.9573 18.4663 21.0028 18.2503 21V21Z" fill="#047857" />
  </svg>
  <p>Войти</p>
</button>
{{/if}}`
