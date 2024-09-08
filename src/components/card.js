const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardInfo, deleteCard, openImageModal, likeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
 
  deleteButton.addEventListener('click', () => { deleteCard(cardElement)});
  cardImage.addEventListener('click', () => openImageModal(cardInfo.link, cardInfo.name));
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
};