//Я правда пытался исправить первый коментарий но не смог разобраться и решил попробывать переписать код по другому (удалил в index.js удаление и повесил снятие обработчика)

export function openModal(event) {
  event.classList.add('popup_is-opened');
  event.addEventListener('click', сloseOverlayOrCross);
  document.addEventListener('keydown', сloseEsc);
};

export function closeModal(event) {
  event.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', сloseEsc);
  event.removeEventListener('click', сloseOverlayOrCross);
};

// Cross - Крест(крестик закрытия)
function сloseOverlayOrCross(event) {
  if (event.currentTarget === event.target || event.target.classList.value.includes("popup__close")) {
    closeModal(event.currentTarget)
  }
};

function сloseEsc(event) {
  if (event.key === 'Escape') { 
    closeModal(document.querySelector('.popup_is-opened')); 
  }
};