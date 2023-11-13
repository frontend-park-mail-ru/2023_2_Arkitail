class ProfilePage extends Page {
  constructor() {
    super(
      "profile-page page-padding-horizontal page-padding-vertical",
      PROFILE_PAGE_TEMPLATE
    );
  }

  async renderTemplate() {
    await this.generateContext();
    await super.renderTemplate();
    this.addEditProfileButtonListener();
  }

  async generateContext() {
    await main.getUserInfo();
    this.context.userName = main.temporaryContext.userName;
    this.context.about = main.temporaryContext.about;
    this.context.avatar = main.temporaryContext.imageURL;
  }

  async addEditProfileButtonListener() {
    if (this.context.isEditing) {
      this.node.querySelector("[data-save-button]").addEventListener("click", () => {
        this.saveProfileChanges();
      });

      this.node.querySelector("[data-cancel-button]").addEventListener("click", () => {
        this.toggleEditProfileMode();
      });

      this.node.querySelector("[data-avatar]").addEventListener("change", (event) => {
        const {target} = event
        const file = target.files[0];
        console.log(file);
        main.upload(file);
      });
    } else {
      this.node.querySelector("[data-edit-button]").addEventListener("click", () => {
        this.toggleEditProfileMode();
      });
    }
  }

  toggleEditProfileMode() {
    this.context = {
      userName: main.temporaryContext.userName,
      about: main.temporaryContext.about,
      isEditing: !this.context.isEditing,
      avatar: main.temporaryContext.imageURL,
    };
    main.reRender();
  }

  async updateUserInfo(newUserInfo) {
    await main.updateUserInfo(newUserInfo);
  }

  async saveProfileChanges() {
    const newUserName = this.node.querySelector("[data-user-name-input]").value;
    const newAbout = this.node.querySelector("[data-about-input]").value;
    const newAvatar = this.node.querySelector("[data-avatar]").value;
    const newUserInfo = {
      name: newUserName,
      about: newAbout,
      avatar: newAvatar,
    };

    await this.updateUserInfo(newUserInfo);

    this.context = {
      userName: newUserName,
      about: newAbout,
      isEditing: false,
      avatar: newAvatar,
    };
    main.route(main.context.location);
    main.reRender();
  }
}
