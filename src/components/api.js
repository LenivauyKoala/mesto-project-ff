export {
  getInfoProfileFromServer,
  patchInfoProfileOnServer,
  getInfoCardsFromServer,
  patchCardsOnServer,
  deleteCardOnServer,
  addLike,
  deleteLike,
  patchAvatarOnServer,
}

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'f6cb9800-3604-45de-9049-9d278dc81a46',
    'Content-Type': 'application/json'
  }
}

//Узнать ответ от сервера
function getAnswerFromServer(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка:${res.status}`);
}

//Получение информации о пользователе с сервера
function getInfoProfileFromServer() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(getAnswerFromServer);
}

//Отправка новой информации профиля на сервер
function patchInfoProfileOnServer(result) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: result.name,
      about: result.job,
    }),
  })
    .then(getAnswerFromServer);
}

//Получение информации о карточках с сервера
function getInfoCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(getAnswerFromServer);
}

//Отправка новой карточки на Сервер
function patchCardsOnServer(result) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: result.name,
      link: result.link,
    }),
  })
    .then(getAnswerFromServer);
}

//Удалить крточку на сервере
function deleteCardOnServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(getAnswerFromServer);
}

//Добавить лайк на Сервер
function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(getAnswerFromServer);
}

//Удалить лайк с сервера
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(getAnswerFromServer);
}

//Обновить аватарку на сервере
function patchAvatarOnServer(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(getAnswerFromServer);
}