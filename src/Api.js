import { config } from './config.js';
import { key } from './AutorizationKey.js';
import { profileName, profileAbout } from './variables.js';
import { cardList } from './CardList.js';
import { profile } from './Profile.js';

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';

class Api {
    constructor(options) {
      this.options = options;
    }
    //запрос данных о пользователе
    getProfileInfo() {
      fetch(`${serverUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: key,
            'Content-Type': config.headers.contentType
        }
      })
        .then((res) => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject('Ошибка');
        }) 
        .then((data) => {
            profile.editProfileInfo(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    //запрос данных о карточках
    getInitialCards() {
        fetch(`${serverUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: key,
            'Content-Type': config.headers.contentType
        }
      })
        .then((res) => {
            if(res.ok){
                return res.json();
            }
            return Promise.reject('Ошибка');
        })
        .then((data) => {
            cardList.render(data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    //запрос изменения имени профиля
    patchProfileInfo() {
        fetch(`${serverUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: key,
                'Content-Type': config.headers.contentType
            },
            body: JSON.stringify({
                name: profileName.value,
                about: profileAbout.value
            })
        });
    }
    
    //добавление новой карточки
    addCard(card) {
        return fetch(`${serverUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: key,
                'Content-Type': config.headers.contentType
            },
            body: JSON.stringify(card)
        })
        .then(res => {
            if (res.ok) return res.json();
        })
    }

    deleteCard(cardId) {
        return fetch(`${serverUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: key,
                'Content-Type': config.headers.contentType
            }
        })
        .then(res => {
            if (res.ok) return res.json();
        })
    }

    addlike(cardId) {
        return fetch(`${serverUrl}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: key,
                'Content-Type': config.headers.contentType
            }
        })
        .then(res => {
            if (res.ok) return res.json();
        })
    }

    deleteLike(cardId) {
        return fetch(`${serverUrl}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: key,
                'Content-Type': config.headers.contentType
            }
        })
        .then(res => {
            if (res.ok) return res.json();
        })
    }
}

// cсоздаем экземпляр класса
const api = new Api({
    baseUrl: serverUrl,
    headers: config.headers
});


export { Api, api,  };