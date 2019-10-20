class Api {
    constructor(options) {
      this.options = options;
    }
    //запрос данных о пользователе
    getProfileInfo() {
      fetch(`${config.baseUrl}users/me`, {
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
        fetch(`${config.baseUrl}cards`, {
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
        fetch(`${config.baseUrl}users/me`, {
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
        return fetch(`${config.baseUrl}cards`, {
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
        return fetch(`${config.baseUrl}cards/${cardId}`, {
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
        return fetch(`${config.baseUrl}cards/like/${cardId}`, {
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
        return fetch(`${config.baseUrl}cards/like/${cardId}`, {
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
    baseUrl: config.baseUrl,
    headers: config.headers
});
//вызовы функций
api.getProfileInfo();
api.getInitialCards();


/**
 * 
 * @Date 21.09.2019
 * 
 * Здравствуйте, неплохо, молодцы
 * 
 * Работа этого спринта в основном касается класса Api
 * Необходимо вынести всё, что относится ip адресам, урлам и так далее отдельно
 * Авторизированные ключи тоже надо выносить, при этом желательно в отдельный файл
 * 
 * Класс Api должен уметь только работать общаться с внешними ресурсами и не должен уметь вставлять данные или редактировать
 * Поэтому следует убрать всё что в .then в метод класса который вызывает метод
 * 
 * Не обновляется информация на странице после добавления карточки, только после перезагрузки
 * Можно удалить любую карточку, но при этом не удаляется ни одна карточка. Надо доделать и сделать правильное удаление
 * Только своих карточек
 * 
 * Счётчик лайков не работает, необходимо поправить
 * 
 * @koras
 * 
 */


 /**
  * 
  * Всё чётенько ;)
  * Учиться всегдя тяжело, но знать что-то очень круто
  * 
  * Добавьте в другие методы Api , catch
  * 
  * Работу принимаю, вижу что стараетесь
  * 
  */