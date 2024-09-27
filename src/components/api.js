const requestConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'f6cb9800-3604-45de-9049-9d278dc81a46',
    'Content-Type': 'application/json',
  },
};

function handleApiReturn(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка:${res.status}`);
}

//Информации о карточках
export function getCardsFromApi() {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    headers: requestConfig.headers,
  }).then(handleApiReturn);
}

//Информации о пользователе с сервера
export function getUserInfoFromApi() {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    headers: requestConfig.headers,
  }).then(handleApiReturn);
}

//Обновить аватар
export function updateAvatar(avatar) {
  return fetch(`${requestConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleApiReturn);
}

//Обновить данные Профиля
export function updateProfileInfo(data) {
  return fetch(`${requestConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.job,
    }),
  }).then(handleApiReturn);
}

//Функция добавить новую карточку на сервер
export function addNewCard(data) {
  return fetch(`${requestConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: requestConfig.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link,
    }),
  }).then(handleApiReturn);
}

//Добавить лайк
export function addLike(cardId) {
  return fetch(`${requestConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: requestConfig.headers,
  }).then(handleApiReturn);
}

//Удалить карточку с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${requestConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: requestConfig.headers,
  }).then(handleApiReturn);
}

//Удалить лайк
export function deleteLike(cardId) {
  return fetch(`${requestConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: requestConfig.headers,
  }).then(handleApiReturn);
}