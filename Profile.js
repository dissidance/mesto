class Profile {
    constructor(name, about){
        this.name = name;
        this.about = about;
    }

    editProfileInfo(data) {
        document.querySelector('.user-info__name').textContent = data.name;
        document.querySelector('.user-info__job').textContent = data.about;
        document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`;
    }
}

profile = new Profile();