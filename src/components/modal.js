export function openModal(event) {
  event.classList.add('popup_is-opened');
  event.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', closeEscape);
};

export function closeModal(event) {
  event.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
};

export function closeOverlay(event) {
  if (event.currentTarget === event.target || event.target.classList.value.includes("popup__close")) {
    closeModal(event.currentTarget)
  }
};

function closeEscape(event) {
  if (event.key === 'Escape') { 
    closeModal(document.querySelector('.popup_is-opened')); 
  }
};