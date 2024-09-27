import { deleteCardFromServer } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(data, prepareDeleteCard, openImageModal, changeLike, userId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikesCounter = cardElement.querySelector('.card__like-counter');

  const cardId = data._id;
  const ownerId = data.owner._id;
  const likesLength = data.likes.length;
  const isOwner = userId === ownerId;

  const userLikesArr = data.likes.filter((user) => user._id === userId);
  const isLiked = userLikesArr.length > 0;

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement.setAttribute("card-id", cardId);

  if (isOwner) {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", () => prepareDeleteCard(cardElement));
  }

  cardLikesCounter.textContent = likesLength;

  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => openImageModal(data));
  cardLikeButton.addEventListener("click", (evt) =>
    changeLike(cardId, evt, cardLikesCounter)
  );
  return cardElement;
}

export function deleteCard(cardId) {
  return deleteCardFromServer(cardId);
}