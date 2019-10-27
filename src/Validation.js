import { submitCardButton, newCardForm, newCardName, newCardLink, editName,
     editAbout,editProfileForm, saveButton, profileName, profileAbout } from './variables.js';
import { api } from './Api';
import { newCardPopup, editProfilePopup } from './Popup';
import { cardList } from './CardList';

class Validation {
    constructor(form) {
        this.form = form;
        if (this.form === newCardForm) {
            document.querySelector('#cardName').addEventListener('input', this.handleValidate);
            document.querySelector('#cardLink').addEventListener('input', this.handleValidate);
            submitCardButton.addEventListener('click',this.submitNewCardForm);
            this.form.addEventListener('input', this.isValidNewCard);
        } else if (this.form === editProfileForm) {
            editName.addEventListener('input', this.handleValidate);
            editAbout.addEventListener('input', this.handleValidate);
            saveButton.addEventListener('click', this.sendForm);
            this.form.addEventListener('input', this.isValidEditProfile);
        }
    }
    //обработчик проверки валидации попапа с новой карточкой
    isValidNewCard = () => {
        if(this.validate(newCardName) && this.validate(newCardLink)) {
            submitCardButton.removeAttribute('disabled');
            submitCardButton.classList.add('popup__button_is-active')
        } else {
          submitCardButton.setAttribute('disabled', true);
          submitCardButton.classList.remove('popup__button_is-active');
        };
    }
    //обработчик отправки формы новой карточки
    submitNewCardForm = (event) => {
        event.preventDefault();
        const newCard = {
            name: this.form.elements.name.value,
            link: this.form.elements.link.value
        }
        api.addCard(newCard)
          .then(res => cardList.addCard(res))
          .catch(err => console.log(err));
        newCardForm.reset();
        newCardPopup.close();
    }
    //проверка валидности редактирования профиля
    isValidEditProfile = () => {
        if(this.validate(profileName) && this.validate(profileAbout)) {
            saveButton.removeAttribute('disabled');
            saveButton.classList.add('popup__button_is-active');
        } else {
            saveButton.setAttribute('disabled', true);
            saveButton.classList.remove('popup__button_is-active');
        };
    }
    //валидация элемента
    validate = (elem) => {
        const errorElement = document.querySelector(`#error-${elem.id}`);
        if(elem.id === 'cardLink') {
            if(!this.isEmptyField(elem)) {
                errorElement.textContent = 'Это обязательное поле';
                this.activateError(errorElement);
                return false;
            }else if (!this.isLink(elem)) {
                errorElement.textContent = 'Здесь должна быть ссылка';
                this.activateError(errorElement);
                return false;
            }
            return true;
        } else {
            if (!this.isEmptyField(elem)) {
                errorElement.textContent = 'Это обязательное поле';
                this.activateError(errorElement);
                return false
            } else if (!this.isValidLength(elem)) {
                errorElement.textContent = 'Должно быть от 2 до 30 символов';
                this.activateError(errorElement);
                return false;
            }
        }   return true;
    }
    //валидация изменения полей ввода
    handleValidate = (event) => {
        this.resetError(event.target);
        this.validate(event.target);
    }
    //активация ошибки
    activateError = (elem) => {
        elem.parentNode.classList.add('input-container__invalid');
    }
    //сброс ошибки
    resetError = (elem) => {
        elem.parentNode.classList.remove('input-container__invalid');
        elem.textContent = '';
    }
    //обработчик проверки пустого поля
    isEmptyField = (elem) => {
        if(elem.value.length !== 0) return true;
    }
    //обработчик проверки ссылки
    isLink = (elem) => {
        if(elem.value.startsWith('https://') || elem.value.startsWith('http://')) return true;
    }
    //обработчик проверки длины поля ввода
    isValidLength = (elem) => {
        if(elem.value.length >= 2 && elem.value.length <= 30) return true;
    }
    //обработчик отправки формы редактирования профиля
    sendForm = (event) => {
        event.preventDefault();
        document.querySelector('.popup__button_save').textContent = 'Загрузка...';
        api.patchProfileInfo();
        document.querySelector('.popup__button_save').textContent = 'Сохранить';
        document.querySelector('.user-info__name').textContent = editProfileForm.elements.name.value;
        document.querySelector('.user-info__job').textContent = editProfileForm.elements.about.value;
        editProfilePopup.close();
    }
}
//создание экземпляров класса 
const newCardValidation = new Validation(newCardForm);
const editProfileValidation = new Validation(editProfileForm);

export { Validation, newCardValidation, editProfileValidation };