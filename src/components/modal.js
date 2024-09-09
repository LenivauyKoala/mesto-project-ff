//Кажется я понял. И подумал почему Esc так же нельзя сделать? Но не стал делать вдруг это пока что не затрагивает но в будущем будут проблемы с ним
//Думал добавить: document.addEventListener('keydown', closeModalByEsc);
//В функцию: setCloseModalByClickListeners

export function setCloseModalByClickListeners(popupList) {
  popupList.forEach(popup => {
    // находим кнопку закрытия попапа
    const closeButton = popup.querySelector('.popup__close');

    // вешаем обработчик закрытия на кнопку
    closeButton.addEventListener('click', closeModalByOverlayOrCross);

    // вешаем обработчик закрытия на оверлей
    popup.addEventListener('click', closeModalByOverlayOrCross);
  })
} 

export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByEsc);
};

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByEsc);
};

// Cross - Крест(крестик закрытия)
function closeModalByOverlayOrCross(event) {
  if (event.currentTarget === event.target || event.target.classList.contains("popup__close")) {
    closeModal(event.currentTarget)
  }
};

function closeModalByEsc(event) {
  if (event.key === 'Escape') { 
    closeModal(document.querySelector('.popup_is-opened')); 
  }
};