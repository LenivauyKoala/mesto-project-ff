import '../index.css';
// import { initialCards } from './cards.js';
import { createCard, deleteCard, deleteClassactiveLike, addClassactiveLike} from './card.js';
import { openModal, closeModal, setCloseModalByClickListeners} from './modal.js';
import { enableValidation, clearValidation, validationConfig} from './validation.js';
import { 
  getInfoProfileFromServer,
  patchInfoProfileOnServer,
  getInfoCardsFromServer,
  patchCardsOnServer,
  deleteCardOnServer,
  addLike,
  deleteLike,
  patchAvatarOnServer
} from './api.js';


//Список модальных окон
const modals = document.querySelectorAll('.popup');

//Список форм
const forms = Array.from(document.querySelectorAll('.popup__form'));

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

//Переменные: Модальный окна карточки
const typeImagePopup = document.querySelector('.popup_type_image');
const popupImage = typeImagePopup.querySelector('.popup__image');
const popupImageCaption = typeImagePopup.querySelector('.popup__caption');

//Переменные: Аватарка
const avatarImage = document.querySelector('.profile__image');
const avatarForm = document.forms['avatar'];
const popupAvatar = document.querySelector('.popup_type_avatar');

//Переменные: Кнопка и Модульное окно удаления карточки
const confirmationDeletePopup = document.querySelector('.popup_type_confirmation-delete');
const confirmDeleteForm = document.forms['confirmation-delete'];


//Работа: Создание закрытия на Оверлэй, Кристик, Esc
setCloseModalByClickListeners(modals)

//Работа: Модального окна Аватарка
avatarImage.addEventListener('click', () => {
  clearValidation(popupAvatar);
  avatarForm.reset();
  openModal(popupAvatar);
})

//Работа: Модального окна редактора (каранддаш)
profileEditButton.addEventListener('click', openFormProfile);

function openFormProfile() {
  clearValidation(profileEditPopup)
  openModal(profileEditPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//Работа: Модального окна редактора (плюс)
profileAddbutton.addEventListener('click', function () {
  clearValidation(profileAddPopup)
  newPlaceForm.reset();
  openModal(profileAddPopup);
});

//Работа: Модального окна карточки
function openImageModal(result) {
  openModal(typeImagePopup);  
  popupImage.src = result.link;
  popupImage.alt = result.name;
  popupImageCaption.textContent = result.name;
};

//Работа: Процесс ожидния загрузки на сервер. Кнопка - Сохранить
function playScreensaver(state, button) {
  if (state) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

let userId, cardToDelete, cardId;

// Работа: Загрузка данных с сервера: Профиль, аватарк, карточки
Promise.all([getInfoProfileFromServer(), getInfoCardsFromServer()])
  .then(([resultProile, resultCard]) => {
    profileName.textContent = resultProile.name;
    profileJob.textContent = resultProile.about;
    avatarImage.style.backgroundImage = `url(${resultProile.avatar})`;
    userId = resultProile._id;
    resultCard.forEach((result) => {
      const card = createCard(result, openDeleteModal, openImageModal, changeLike, userId);
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Работа: Удаление и добавления лайка
function changeLike(cardId, event, likesCounter) {
  const isLiked = event.target.classList.value.includes('card__like-button_is-active');
  if (isLiked) {
    deleteLike(cardId)
      .then((result) => {
        deleteClassactiveLike(event, result, likesCounter)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((result) => {
        addClassactiveLike(event, result, likesCounter)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

forms.forEach((formElement) => {
  formElement.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
  event.preventDefault();

  const formElement = event.target;
  const formName = formElement.getAttribute('name');
  const formSubmitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  const result = {};

  switch (formName) {
    case 'edit-profile':
      result.name = formElement.elements['name'].value;
      result.job = formElement.elements['description'].value;
      changeInfoProfileOnServer(result, formSubmitButton);
      break;
    case 'new-place':
      result.name = formElement.elements['place-name'].value;
      result.link = formElement.elements['link'].value;
      addImageOnServer(result, formSubmitButton);
      break;
    case 'confirmation-delete':
      deleteCardBasket();
      break;
    case 'avatar':
      result.link = formElement.elements['link'].value;
      addAvatar(result.link, formSubmitButton);
      break;
    default:
      console.error('Ошибка');
  }
}

// Работа: Изменить данные профиля на сервер
function changeInfoProfileOnServer(result, button) {
  playScreensaver(true, button);
  patchInfoProfileOnServer(result)
    .then((resultProile) => {
      profileName.textContent = resultProile.name;
      profileJob.textContent = resultProile.about;
      closeModal(profileEditPopup, formEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => playScreensaver(false, button));
}

// Работа: Добавить новую карточку
function addImageOnServer(result, button) {
  playScreensaver(true, button);
  patchCardsOnServer(result)
    .then((card) => {
      cardsContainer.prepend(createCard(card, openDeleteModal, openImageModal, changeLike, userId));
      closeModal(profileAddPopup, newPlaceForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => playScreensaver(false, button));
}

//Работа: Открыть модульное окно удаления картинки
function openDeleteModal(card) {
  cardToDelete = card;
  openModal(confirmationDeletePopup);
}

//Работа: Удалить с сервера карточку через корзинку
function deleteCardBasket() {
  cardId = cardToDelete.getAttribute('card-id');
  deleteCardOnServer(cardId)
    .then(() => {
      deleteCard(cardToDelete);
      ;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => closeModal(confirmationDeletePopup, confirmDeleteForm));
}

//Работа: Добавить новую аватарку
function addAvatar(avatar, button) {
  playScreensaver(true, button);
  patchAvatarOnServer(avatar)
    .then((result) => {
      avatarImage.style.backgroundImage = `url(${result.avatar})`;
      closeModal(popupAvatar, newPlaceForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => playScreensaver(false, button));
}

//Работа: Запуск валидации
enableValidation();
