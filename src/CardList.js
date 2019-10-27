import { placesListContainer } from './variables.js';
import { api } from './Api.js';
import { Card } from './Card.js' 
//класс контейнера с карточками
class CardList {
    constructor(container) {
      this.container = container;
      api.getProfileInfo();
      api.getInitialCards();
    }
  //отрисовка карточек
    render(data) {
        data.forEach(element => {
            const isLiked = element.likes.some(x => x.name.includes(document.querySelector('.user-info__name').textContent));
            const {cardElement} = new Card(element.name, element.link, isLiked);
            this.container.appendChild(cardElement);
            if (isLiked) {
                cardElement.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
            }
            cardElement.querySelector('.place-card__likes').textContent = element.likes.length;
            cardElement.dataset.id = element._id;
            if (element.owner.name === document.querySelector('.user-info__name').textContent){
                cardElement.querySelector('.place-card__delete-icon').style.display = 'block'; 
            }
      });
    }

    //добавление карточек в контейнер
    addCard({_id, name, link}) {
        const {cardElement} = new Card(name, link);
        cardElement.querySelector('.place-card__delete-icon').style.display = 'block';
        cardElement.dataset.id = _id;
        this.container.appendChild(cardElement);
    }
}
//создание экземпляра класса
const cardList = new CardList(placesListContainer);

export { CardList, cardList };