import { openModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const typeImagePopup = document.querySelector('.popup_type_image');
const popupImage = typeImagePopup.querySelector('.popup__image');

export function creationsCard(cardInfo, deleteCard, openImageModal, cardLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
 
  deleteButton.addEventListener('click', () => { deleteCard(cardElement)});
  cardImage.addEventListener('click', () => openImageModal(cardInfo.link, cardInfo.name));
  cardElement.querySelector('.card__like-button').addEventListener('click', cardLike);
  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function cardLike(event) {
  if (event.target.classList.contains('card__like-button')) {
    event.stopPropagation();
    event.target.classList.toggle('card__like-button_is-active');
  }
};

export function openImageModal(link, name) {
  openModal(typeImagePopup);  
  popupImage.src = link;
  popupImage.alt = name;
  typeImagePopup.querySelector('.popup__caption').textContent = name;
};