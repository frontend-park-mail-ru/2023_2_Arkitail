class ProfilePage extends Page {
    constructor(template) {
        super('profile-page', template);

        this.template = Handlebars.compile(`
        <div class="profile">
    <div class="profile-picture">
        <img src="file:///{{avatar}}" alt="Ваше фото профиля">
        {{#if isEditing}}
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
        {{/if}}
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
        `
        );
        this.context = {
            isEditing: false,
            userName: main.temporaryContext.userName,
            birthday: '01.01.1990',
            about: 'Здесь может быть краткое описание о вас и ваших интересах.',
            avatar: '../../static/img/example.jpg'
        }
    }

    async render(isFirstRender) {
        await this.generateContext()
        await super.render()
        main.reRender('profile');
        this.addEditProfileButtonListener();
    }

    async generateContext() {
        await main.getUserInfo();
        this.context.userName = main.temporaryContext.userName;
        this.context.birthday = main.temporaryContext.birthday;
        this.context.about = main.temporaryContext.about;
        this.context.avatar = main.temporaryContext.imageURL;
    }

    async addEditProfileButtonListener() {
        if (this.context.isEditing == false) {
            const editButton = this.node.querySelector('#edit-button');
            editButton.addEventListener('click', () => {
                this.toggleEditProfileMode();
            });
        } else {
            const saveButton = this.node.querySelector('#save-button');
            saveButton.addEventListener('click', () => {
                this.saveProfileChanges();
            });

            const cancelButton = this.node.querySelector('#cancel-button');
            cancelButton.addEventListener('click', () => {
                this.toggleEditProfileMode();
            });

            const fileInput = this.node.querySelector('#avatar');
            fileInput.addEventListener('change', (event) => {
                debugger
                var file = this.node.querySelector("#avatar").files[0];
                main.upload(file);
            });
        };
    }


    toggleEditProfileMode() {
        this.context = {
            userName: main.temporaryContext.userName,
            birthday: main.temporaryContext.birthday,
            about: main.temporaryContext.about,
            isEditing: !this.context.isEditing,
            avatar: main.temporaryContext.imageURL,
        }
        this.render();
    }

    async updateUserInfo(newUserInfo) {
        await main.updateUserInfo(newUserInfo);
    }

    async saveProfileChanges() {
        const newUserName = this.node.querySelector('#userNameInput').value;
        const newBirthday = this.node.querySelector('#birthdayInput').value;
        const newAbout = this.node.querySelector('#aboutInput').value;
        const newAvatar = this.node.querySelector('#avatar').value;
        const newUserInfo = {
            name: newUserName,
            birthDate: newBirthday,
            about: newAbout,
            avatar: newAvatar,
        };

        await this.updateUserInfo(newUserInfo);

        this.context = {
            userName: newUserName,
            birthday: newBirthday,
            about: newAbout,
            isEditing: false,
            avatar: newAvatar,
        };
        main.route(main.context.location);
        this.render();
    }
}