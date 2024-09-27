import '../index.css';
import { createCard, deleteCard} from './card.js';
import { openModal, closeModal, setCloseModalByClickListeners} from './modal.js';
import { validationSettings, enableValidation, clearValidation} from './validation.js'
import {
  getCardsFromApi,
  getUserInfoFromApi,
  updateAvatar,
  updateProfileInfo,
  addNewCard,
  addLike,
  deleteLike,
} from './api.js'

//Список модальных окон
const modals = document.querySelectorAll('.popup');
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

//Переменные: Аватарка
const profileAvatar = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['avatar'];

//Переменные: Потверждение удаления
const confirmDeletePopup = document.querySelector(".popup_type_confirm-delete");
const confirmDeleteForm = document.forms["confirm-delete"];

let userId, cardToDelete, cardId;

//Работа: Создания карточки. Изменения профиля
Promise.all([getCardsFromApi(), getUserInfoFromApi()])
  .then(([cardsFromApi, userInfoFromApi]) => {
    userId = userInfoFromApi._id;
    profileName.textContent = userInfoFromApi.name;
    profileJob.textContent = userInfoFromApi.about;
    profileAvatar.style.backgroundImage = `url(${userInfoFromApi.avatar})`;
    cardsFromApi.forEach((data) => {
      const card = createCard(data, prepareDeleteCard, openImageModal, changeLike, userId);
      cardsContainer.append(card);
    });
  })
  .catch((error) =>
    console.error('Ошибка при загрузке данных ', error));

//Работа: Сохранить данные. Форма с Профилем.
function saveEditedProfileData(data, button) {
  renderLoading(true, button);

  updateProfileInfo(data)
    .then((profileInfo) => {
      profileName.textContent = profileInfo.name;
      profileJob.textContent = profileInfo.about;
      closeAndClearForm(profileEditPopup, formEditProfile);
    })
    .catch((error) => {
      console.error('Ошибка при обновлении данных профиля', error)
    })
    .finally(() => renderLoading(false, button));
}

//Работа: Очистить форму и закрыть попап при успешном ответе сервера
function closeAndClearForm(popup, formElement) {
  formElement.reset();
  closeModal(popup);
}

//Работа: Показать на кнопке процесс загрузки данных
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//Работа: Добавить карточку. Форма с новой карточкой.
function addImageData(data, button) {
  renderLoading(true, button);
  //Обработать ответ с сервера
  addNewCard(data)
    .then((card) => {
      //Добавить новую карточку в начало разметки
      cardsContainer.prepend(createCard(card, prepareDeleteCard, openImageModal, changeLike, userId));
      closeAndClearForm(profileAddPopup, newPlaceForm);
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки', error)
    })
    .finally(() => renderLoading(false, button));
}

//Работа: Удаление карточки
function prepareDeleteCard(card) {
  cardToDelete = card;
  openModal(confirmDeletePopup);
}

//Работа: Подтвердить удаление с сервера
function handleSubmitDeleteCard() {
  cardId = cardToDelete.getAttribute('card-id');
  //Обработать ответ с сервера
  deleteCard(cardId)
    .then(() => {
      cardToDelete.closest('.card').remove();
      //Снять слушатель с кнопки удаления - "корзинки"
      cardToDelete.querySelector('.card__delete-button').removeEventListener('submit', prepareDeleteCard);
      closeAndClearForm(confirmDeletePopup, confirmDeleteForm);
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки', error)
    });
}

//Работа: Сохранить новый Аватар. Форма с Аватаром
function saveAvatarData(avatarLink, button) {
  renderLoading(true, button);
  //Обработать ответ с сервера
  updateAvatar(avatarLink)
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeAndClearForm(popupAvatar, avatarForm);
    })
    .catch((error) => {
      console.error('Ошибка с данными Аватара', error)
    })
    .finally(() => renderLoading(false, button));
}

  //Работа: Работа лайка
function changeLike(cardId, evt, cardLikesCounter) {
  const isLiked = evt.target.classList.value.includes(
    'card__like-button_is-active'
  );
  if (isLiked) {
    deleteLike(cardId)
      .then((data) => {
        evt.target.classList.remove('card__like-button_is-active');
        cardLikesCounter.textContent = data.likes.length;
      })
      .catch((error) => console.error('Невозможно удалить лайк', error));
  } else {
    addLike(cardId)
      .then((data) => {
        evt.target.classList.add('card__like-button_is-active');
        cardLikesCounter.textContent = data.likes.length;
      })
      .catch((error) => console.error('Невозможно поставить лайк', error));
  }
}

//Работа: Универсальная - проверить и сохранить данные для всех форм.
function handleFormSubmit(evt) {
  evt.preventDefault();

  const formElement = evt.target;
  const formName = formElement.getAttribute('name');
  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  const data = {};

  switch (formName) {
    case 'edit-profile':
      data.name = formElement.elements['name'].value;
      data.job = formElement.elements['description'].value;
      saveEditedProfileData(data, formSubmitButton);
      break;
    case "new-place":
      data.name = formElement.elements['place-name'].value;
      data.link = formElement.elements['link'].value;
      addImageData(data, formSubmitButton);
      break;
    case 'confirm-delete':
      handleSubmitDeleteCard();
      break;
    case 'avatar':
      data.link = formElement.elements['link'].value;
      saveAvatarData(data.link, formSubmitButton);
      break;
    default:
      console.error('Форма не найдена');
  }
}

//Работа: Навесить слушатель сабмита на каждую форму
forms.forEach((formElement) => {
  formElement.addEventListener('submit', handleFormSubmit);
});

//Работа: Создание закрытия на Оверлэй, Кристик, Esc
setCloseModalByClickListeners(modals)

//Работа: Модального окна редактора (каранддаш)
profileEditButton.addEventListener('click', openFormProfile);

function openFormProfile() {
  openModal(profileEditPopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(profileEditPopup, validationSettings)
}

//Работа: Модального окна редактора (плюс)
profileAddbutton.addEventListener('click', function () {
  openModal(profileAddPopup);
  clearValidation(profileAddPopup, validationSettings)
});

//Работа: Модального окна карточки
function openImageModal(data) {
  openModal(typeImagePopup);  
  popupImage.src = data.link;
  popupImage.alt = data.name;
  typeImagePopup.querySelector('.popup__caption').textContent = data.name;
};

//Работа: Открытия аватарки
profileAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
  clearValidation(popupAvatar, validationSettings);
  avatarForm.reset();
});

enableValidation(validationSettings)



