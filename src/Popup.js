'use strict'
//класс попапов
class Popup {
    constructor(popupSelector, openSelector) {
      if (openSelector) {
        this.openSelector = openSelector;
        document.querySelector(this.openSelector).addEventListener('click', this.open);
      }
      this.popupSelector = popupSelector;
      this.container = document.querySelector(this.popupSelector);
      this.container.querySelector('.popup__close').addEventListener('click', this.close);
    }
  //метод открытия попапа
    open = () => {
      if(this.popupSelector === '#edit-profile') {
        editProfileForm.elements.name.value = document.querySelector('.user-info__name').textContent;
        editProfileForm.elements.about.value = document.querySelector('.user-info__job').textContent;
        editProfileValidation.resetError(editAbout);
        editProfileValidation.resetError(editName);
        editProfileValidation.isValidEditProfile();
      } else if (this.popupSelector === '#new-card') {
        newCardValidation.isValidNewCard();
        newCardValidation.resetError(newCardName);
        newCardValidation.resetError(newCardLink);
      }
      this.container.classList.add('popup_is-opened');
    }
  //метод закрытия попапа
    close = () => {
      if (this.popupSelector === '#new-card') {
        newCardForm.reset();
      }
      this.container.classList.remove('popup_is-opened');
    }
}

//создание экземпляра класса
const newCardPopup = new Popup('#new-card', '.user-info__button');
const editProfilePopup = new Popup('#edit-profile', '.user-info__edit-button');