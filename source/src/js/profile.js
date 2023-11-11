class ProfilePage extends Page {
    constructor() {
        super('profile-page page-padding-horizontal page-padding-vertical', PROFILE_PAGE_TEMPLATE);
        this.context = {
            isEditing: false,
            userName: main.temporaryContext.userName,
            birthday: '01.01.1990',
            about: 'Здесь может быть краткое описание о вас и ваших интересах.',
            avatar: '../../static/img/example.jpg'
        }
    }

    async render() {
        await this.generateContext()
        await super.render()
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
                var file = this.node.querySelector("#avatar").files[0];
                console.log(file);
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
        main.reRender()
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
        main.reRender()
    }
}
