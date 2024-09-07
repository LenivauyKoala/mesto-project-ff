import '../index.css';
import { initialCards } from './cards.js';
import { creationsCard, deleteCard, cardLike, openImageModal } from './card.js';
import { openModal, closeModal } from './modal.js';

// //Переменные: выбрать все попапы
const popups = Array.from(document.querySelectorAll(".popup"));

//Переменные: общий лист карточек
const places = document.querySelector('.places__list');

//Переменные: Редактор профиля (карандаш) + Модульное окно (карандаш)
const profileEditButton = document.querySelector('.profile__edit-button'); 
const profileEditPopup = document.querySelector('.popup_type_edit');

//Переменные: Форма окна профиля + Поле Имя + Поле Проффесия
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//Классы из DOM поля формы профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//Переменные: Редактор карточки (плюс) + Модульное окно (плюс)
const profileAddbutton = document.querySelector('.profile__add-button'); 
const profileAddPopup = document.querySelector('.popup_type_new-card');

//Переменные: Форма окна карточки + Выделение формы + Поле Название + Поле Ссылка
const cardElement = document.getElementsByName('new-place')[0];
const formAdd = document.forms['new-place'];
const placeInput = cardElement.querySelector('.popup__input_type_card-name'); 
const imageInput = cardElement.querySelector('.popup__input_type_url');

//Переменные: Крестик модульного окна
const popupCloseButton= document.querySelectorAll('.popup__close');

//Работа: Модального окна редактора (каранддаш)
profileEditButton.addEventListener('click', function () {
  openModal(profileEditPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

function handleFormSubmit(event) {
  event.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closeModal(profileEditPopup);
};

formElement.addEventListener('submit', handleFormSubmit);

//Работа: Модального окна редактора (плюс)
profileAddbutton.addEventListener('click', function () {
  openModal(profileAddPopup);
  formAdd.reset();
});

function newCardSubmit() {
  const place = placeInput.value;
  const image = imageInput.value;
  const newCard = creationsCard({name:place, link:image, alt:place}, deleteCard, openImageModal, cardLike);
  places.prepend(newCard);
  closeModal(profileAddPopup);
};

cardElement.addEventListener('submit', function(event) {
  event.preventDefault();
  newCardSubmit();
});

//Работа: удаление
popupCloseButton.forEach((button) => { 
  button.addEventListener('click', (event) => { 
    event.stopPropagation();
    closeModal(event.target.closest('.popup')); 
  })
}); 

//Работа: Создания карточек
initialCards.forEach((cardInfo) => {
    const cardElement = creationsCard(cardInfo, deleteCard, openImageModal, cardLike);
    places.append(cardElement);
});

//Работа: Добавляет класс анимации каждому попапу
popups.forEach((event) => event.classList.add("popup_is-animated"));