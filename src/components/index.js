import '../index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard} from './card.js';
import { openModal, closeModal, setCloseModalByClickListeners} from './modal.js';

//Список модальных окон
const modals = document.querySelectorAll('.popup');

//Переменные: общий лист карточек
const cardsContainer = document.querySelector('.places__list');

//Переменные: Редактор профиля (карандаш) + Модульное окно (карандаш)
const profileEditButton = document.querySelector('.profile__edit-button'); 
const profileEditPopup = document.querySelector('.popup_type_edit');

//Переменные: Форма окна профиля + Поле Имя + Поле Проффесия
const formEditProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

//Классы из DOM поля формы профиля
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//Переменные: Редактор карточки (плюс) + Модульное окно (плюс)
const profileAddbutton = document.querySelector('.profile__add-button'); 
const profileAddPopup = document.querySelector('.popup_type_new-card');

//Переменные: Форма окна карточки + Выделение формы + Поле Название + Поле Ссылка
const newPlaceForm = document.forms['new-place'];
const placeInput = newPlaceForm.querySelector('.popup__input_type_card-name'); 
const imageInput = newPlaceForm.querySelector('.popup__input_type_url');

//Переменные: Модальный окна карточки
const typeImagePopup = document.querySelector('.popup_type_image');
const popupImage = typeImagePopup.querySelector('.popup__image');

//Работа: Создание закрытия на Оверлэй, Кристик, Esc
setCloseModalByClickListeners(modals)

//Работа: Модального окна редактора (каранддаш)
profileEditButton.addEventListener('click', openFormProfile);

function openFormProfile() {
  openModal(profileEditPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

formEditProfile.addEventListener('submit', handleFormProfileSubmit);

function handleFormProfileSubmit(event) {
  event.preventDefault(); 
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closeModal(profileEditPopup);
};

//Работа: Модального окна редактора (плюс)
profileAddbutton.addEventListener('click', function () {
  openModal(profileAddPopup);
});

function handleAddCardFormSubmit() {
  const place = placeInput.value;
  const image = imageInput.value;
  const newCard = createCard({name:place, link:image, alt:place}, deleteCard, openImageModal, likeCard);
  cardsContainer.prepend(newCard);
  closeModal(profileAddPopup);
};

newPlaceForm.addEventListener('submit', function(event) {
  event.preventDefault();
  handleAddCardFormSubmit();
  newPlaceForm.reset();
});

//Работа: Создания карточек
initialCards.forEach((cardInfo) => {
    const cardElement = createCard(cardInfo, deleteCard, openImageModal, likeCard);
    cardsContainer.append(cardElement);
});

//Работа: Модального окна карточки
function openImageModal(link, name) {
  openModal(typeImagePopup);  
  popupImage.src = link;
  popupImage.alt = name;
  typeImagePopup.querySelector('.popup__caption').textContent = name;
};