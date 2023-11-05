// HTMLDivElement

class ReviewCard {
  constructor(review) {
    this.review = review;
    this.block = document.createElement("div");
    this.block.className = "review-card card";
    this.template = Handlebars.compile(`
    <div class="review-card-header">
      <div class="mini-avatar">
        {{#if review.user.avatarUrl}}
        <img src="{{ review.user.avatarUrl }}"/>
        {{/if}}
      </div>
      <div class="review-card-header grid-bottom">
        <div>
          <p>{{ review.user.name }}</p>
          <p class="gray-text sm-text">{{ review.createdAt }}</p>
        </div>

        {{#if review.abilityToRemove}}
        <svg data-remove-review-btn review-id="{{ review.id }}" class="trash" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.875 2.34375H3.125C2.26206 2.34375 1.5625 3.04331 1.5625 3.90625V4.6875C1.5625 5.55045 2.26206 6.25 3.125 6.25H21.875C22.7379 6.25 23.4375 5.55045 23.4375 4.6875V3.90625C23.4375 3.04331 22.7379 2.34375 21.875 2.34375Z"/>
          <path d="M3.63578 7.81251C3.58088 7.81221 3.52654 7.82349 3.4763 7.8456C3.42606 7.86772 3.38104 7.90017 3.34418 7.94085C3.30733 7.98153 3.27946 8.02953 3.26239 8.0817C3.24533 8.13388 3.23945 8.18906 3.24515 8.24366L4.52982 20.5757C4.52956 20.5793 4.52956 20.5829 4.52982 20.5864C4.59694 21.1568 4.87116 21.6827 5.30043 22.0643C5.72969 22.4458 6.28411 22.6565 6.85843 22.6563H18.1421C18.7163 22.6562 19.2705 22.4455 19.6995 22.0639C20.1286 21.6824 20.4027 21.1567 20.4698 20.5864V20.5762L21.7525 8.24366C21.7582 8.18906 21.7523 8.13388 21.7352 8.0817C21.7182 8.02953 21.6903 7.98153 21.6534 7.94085C21.6166 7.90017 21.5716 7.86772 21.5213 7.8456C21.4711 7.82349 21.4167 7.81221 21.3618 7.81251H3.63578ZM15.7871 16.6353C15.8614 16.7074 15.9206 16.7936 15.9613 16.8889C16.0019 16.9841 16.0232 17.0865 16.024 17.19C16.0247 17.2936 16.0048 17.3963 15.9655 17.4921C15.9262 17.5879 15.8683 17.6749 15.795 17.7481C15.7218 17.8213 15.6347 17.8793 15.5389 17.9185C15.4431 17.9578 15.3404 17.9776 15.2368 17.9768C15.1333 17.976 15.0309 17.9547 14.9357 17.914C14.8405 17.8733 14.7543 17.8141 14.6822 17.7398L12.5005 15.5581L10.3184 17.7398C10.1712 17.8828 9.97365 17.9621 9.76844 17.9607C9.56322 17.9592 9.36681 17.8771 9.22167 17.732C9.07652 17.5869 8.99429 17.3905 8.99275 17.1853C8.9912 16.9801 9.07047 16.7825 9.21341 16.6353L11.3955 14.4531L9.21341 12.271C9.07047 12.1238 8.9912 11.9262 8.99275 11.7209C8.99429 11.5157 9.07652 11.3194 9.22167 11.1743C9.36681 11.0292 9.56322 10.9471 9.76844 10.9456C9.97365 10.9441 10.1712 11.0235 10.3184 11.1665L12.5005 13.3481L14.6822 11.1665C14.8293 11.0235 15.0269 10.9441 15.2321 10.9456C15.4373 10.9471 15.6337 11.0292 15.7789 11.1743C15.924 11.3194 16.0063 11.5157 16.0078 11.7209C16.0094 11.9262 15.9301 12.1238 15.7871 12.271L13.605 14.4531L15.7871 16.6353Z"/>
        </svg>
        {{/if}}

      </div>

      <div class="stars">
      {{#stars 5 review.rating}}
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
    </div>

    <p>{{ review.text }}</p>

    `);

    this.block.innerHTML += this.template({ review: this.review });

    this.block
      .querySelectorAll("[data-remove-review-btn]")
      .forEach((btn) => btn.addEventListener("click", this.remove.bind(this)));
  }

  remove() {
    console.log("Удаление", this.review.id);
    this.block.parentElement.removeChild(this.block);
  }

  getHtml() {
    return this.block;
  }
}

class AddRevieCard {
  constructor(addButton, callback) {
    this.callback = callback;
    this.addButton = addButton;
    this.rating = 0;
    this.abilityToSend = false;
    this.block = document.createElement("div");
    this.block.className = "add-review-card card";
    this.template = Handlebars.compile(`
    <div class="add-review-card-header">
      <div class="md-size-text stars">
      {{#stars 5 review.rating}}
        <svg
            data-star
            number="{{@number}}"
            class="star {{@active}} clickable"
            viewBox="0 0 184 184"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path number="{{@number}}"
                d="M141.594 172.5C140.383 172.505 139.203 172.127 138.219 171.422L92 137.914L45.7808 171.422C44.7933 172.138 43.6037 172.522 42.3839 172.517C41.1641 172.513 39.9773 172.121 38.9951 171.397C38.0128 170.674 37.2861 169.657 36.92 168.493C36.5538 167.33 36.5672 166.08 36.9581 164.924L54.9844 111.532L8.26562 79.4938C7.25366 78.8006 6.48989 77.8019 6.08591 76.6437C5.68193 75.4856 5.6589 74.2285 6.02019 73.0563C6.38149 71.8841 7.10817 70.8582 8.09406 70.1284C9.07995 69.3986 10.2734 69.0032 11.5 69H69.1366L86.5303 15.4711C86.905 14.3154 87.6361 13.3081 88.6188 12.5937C89.6014 11.8793 90.7851 11.4945 92 11.4945C93.2149 11.4945 94.3986 11.8793 95.3812 12.5937C96.3639 13.3081 97.095 14.3154 97.4697 15.4711L114.863 69.018H172.5C173.728 69.0174 174.924 69.41 175.913 70.1384C176.902 70.8668 177.632 71.8926 177.995 73.0657C178.359 74.2388 178.337 75.4975 177.934 76.6575C177.53 77.8174 176.766 78.8177 175.752 79.5117L129.016 111.532L147.031 164.91C147.323 165.774 147.405 166.695 147.271 167.598C147.136 168.5 146.789 169.357 146.258 170.099C145.727 170.84 145.027 171.445 144.216 171.862C143.405 172.28 142.506 172.498 141.594 172.5Z"
                
            />
        </svg>
      {{/stars}}
      </div>

      <svg 
        data-close-btn 
        class="close md-size-text clickable" 
        viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"></path>
      </svg>
    </div>

    <textarea 
      data-review-text 
      class="add-review-card-input input-field" 
      rows="4"
      placeholder="Напишите свой отзыв"
      ></textarea>
    
    <button data-send-btn class="reviews-btn-save btn gray-btn">
      Отправить отзыв
    </button>
    `);

    this.block.innerHTML += this.template();
    this.sendButton = this.block.querySelector("[data-send-btn]");
    this.textarea = this.block.querySelector("[data-review-text]");
    this.stars = this.block.querySelectorAll("[data-star]");

    this.addButton.addEventListener("click", this.show.bind(this));
    this.block
      .querySelector("[data-close-btn]")
      .addEventListener("click", this.close.bind(this));

    this.stars.forEach((star) => {
      star.addEventListener("mouseover", (event) => {
        this.stars.forEach((s) => {
          s.style.fill =
            s.getAttribute("number") <= event.target.getAttribute("number")
              ? "var(--primary)"
              : "var(--dark-gray)";
        });
      });
      star.addEventListener("mouseout", () => {
        this.stars.forEach((s) => {
          s.style.fill =
            s.getAttribute("number") <= this.rating
              ? "var(--primary)"
              : "var(--dark-gray)";
        });
      });
      star.addEventListener("click", (event) => {
        this.stars.forEach((s) => {
          s.style.fill =
            s.getAttribute("number") <= event.target.getAttribute("number")
              ? "var(--primary)"
              : "var(--dark-gray)";
          this.rating = event.target.getAttribute("number");
          this.dataChanged();
        });
      });
    });

    this.textarea.onkeyup = this.dataChanged.bind(this);
    this.sendButton.addEventListener("click", this.sendData.bind(this));
  }

  show() {
    this.addButton.style.display = "none";
    this.block.style.display = "grid";
  }

  close() {
    this.addButton.style.display = "block";
    this.block.style.display = "none";
    this.rating = 0;
    this.stars.forEach((star) => {
      star.style.fill = "var(--dark-gray)";
    });
    this.textarea.value = "";
    this.dataChanged();
  }

  dataChanged() {
    if (
      (!this.abilityToSend && this.rating && this.textarea.value) ||
      (this.abilityToSend && (!this.rating || !this.textarea.value))
    ) {
      this.abilityToSend = !this.abilityToSend;
      this.sendButton.classList.toggle("gray-btn");
      this.sendButton.classList.toggle("blue-btn");
    }
  }

  sendData() {
    if (this.abilityToSend) {
      console.log(this.rating, this.textarea.value);
      this.callback({
        id: 100,
        userId: 3,
        placeId: 0,
        text: this.textarea.value,
        rating: this.rating,
        createdAt: "Сейчас",
      });
      this.close();
    }
  }

  getHtml() {
    return this.block;
  }
}
