// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const containerCard = document.querySelector('.places__list');

addCard(containerCard, initialCards);

function addCard(containerCard, initialCards) {
  for (i = 0; i < initialCards.length; i++) {
    containerCard.append(creationsCard(cardTemplate, initialCards[i], deleteCard));
  };
}

function creationsCard(cardTemplate, cardInfo, remove) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  
  const cardPictures = cardElement.querySelector('.card__image');
  cardPictures.src = cardInfo.link;
  cardPictures.alt = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
 
  deleteButton.addEventListener('click', () => remove(cardElement));

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}
