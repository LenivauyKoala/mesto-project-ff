import { deleteCardOnServer } from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(result, openDeleteModal, openImageModal, changeLike, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');
  const cardId = result._id;
  const ownerId = result.owner._id;
  const likesLength = result.likes.length;
  const isOwner = userId === ownerId;
  const userLikesArr = result.likes.filter((user) => user._id === userId);
  const isLiked = userLikesArr.length > 0;

  cardTitle.textContent = result.name;
  cardImage.src = result.link;
  cardImage.alt = result.name;

  cardElement.setAttribute('card-id', cardId);

  if (isOwner) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => openDeleteModal(cardElement));
  }

  cardLikesCounter.textContent = likesLength;

  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => openImageModal(result));

  cardLikeButton.addEventListener("click", (event) =>
    changeLike(cardId, event, cardLikesCounter)
  );
  return cardElement;
}

export function deleteCard(cardId) {
  return deleteCardOnServer(cardId);
}