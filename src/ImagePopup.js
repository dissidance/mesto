import { Popup } from './Popup.js';
import { popupImg} from './variables.js';
//класс попапа с картинкой
class ImagePopup extends Popup {
    constructor(popupSelector, openSelector) {
      super(popupSelector);
    }
    //присваем картинке попапа свойство background
    applyImage = (event) => {
      if (event.target.classList.contains('place-card__image')) { 
      popupImg.src = event.target.style.backgroundImage.slice(5, length - 2);
      imagePopup.open();
      }
    }
}

//создание экземпляра класса
const imagePopup = new ImagePopup('#popup-image');

export { ImagePopup, imagePopup };