import { imagePopup } from './ImagePopup.js';
import { api } from './Api.js';
import { placesListContainer } from './variables.js';
class Card {
  constructor(name, link, isLiked) {
    this.name = name;
    this.link = link;
    this.isLiked = isLiked || false;
    this.cardElement = this.createCard(this.name, this.link);
    this.likeCount =  this.cardElement.querySelector('.place-card__likes');
    this.cardElement
      .querySelector('.place-card__like-icon')
      .addEventListener('click', (e) => this.like(e.target));
    this.cardElement
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
    this.cardElement
      .querySelector('.place-card__image')
      .addEventListener('click', imagePopup.applyImage);
    this.like = this.like.bind(this);
  }

  //обработчик лайка карточки
  like(target) {
    this.isLiked = !this.isLiked;
    const card = this;
    if (this.isLiked){
      api.addlike(target.closest('.place-card').dataset.id)
        .then(res => {
          res.likes.forEach(function(item) {
            if (item.name.includes(document.querySelector('.user-info__name').textContent)) {
              card.likeCount.textContent = Number.parseInt(card.likeCount.textContent) + 1;
              target.classList.add('place-card__like-icon_liked');
            }
          })
        })
    } else {
      api.deleteLike(target.closest('.place-card').dataset.id)
        .then(res => {
          card.likeCount.textContent = Number.parseInt(card.likeCount.textContent) - 1;
        })
    }
    target.classList.toggle('place-card__like-icon_liked');
  }
  
  //обработчик удаления карточки
  remove(event) {
    event.preventDefault();
    if(confirm('Вы действительно ходите удалить эту карточку?')) {
      const delButtonId = event.target.closest('.place-card').dataset.id;
      api.deleteCard(delButtonId)
        .then(res => {
          placesListContainer.removeChild(event.target.closest('.place-card'))})
        .catch(err => console.log(err));
    } else {
      return
    }
  }
  //создание DOM-элемента карточки
  createCard(name, link) {
    //создание DOM-элементов карточки
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const deleteButton = document.createElement('button');
    const likeButton = document.createElement('button');
    const descriptionContainer = document.createElement('div');
    const likes = document.createElement('p');
    const likeContainer = document.createElement('div');
    //добавление классов к элементам DOM
    placeCard.classList.add('place-card');
    descriptionContainer.classList.add('place-card__description');
    deleteButton.classList.add('place-card__delete-icon');
    likeButton.classList.add('place-card__like-icon');
    likes.classList.add('place-card__likes');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.style.backgroundImage = `url(${link})`;
    placeCardName.classList.add('place-card__name');
    //сборка и возвращение DOM-элемента карточки
    placeCardName.textContent = name;
    likeContainer.appendChild(likeButton);
    likeContainer.appendChild(likes);
    likes.textContent = '0';
    placeCardImage.appendChild(deleteButton);
    descriptionContainer.appendChild(placeCardName);
    descriptionContainer.appendChild(likeContainer);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(descriptionContainer);
    return placeCard;
  }
}

export { Card };