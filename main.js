(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,o){var c=e.querySelector(".places__item").cloneNode(!0),p=c.querySelector(".card__image");return c.querySelector(".card__title").textContent=t.name,p.src=t.link,p.alt=t.name,c.querySelector(".card__delete-button").addEventListener("click",(function(){n(c)})),p.addEventListener("click",(function(){return r(t.link,t.name)})),c.querySelector(".card__like-button").addEventListener("click",o),c}function n(e){e.remove()}function r(e){e.target.classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function p(e){(e.currentTarget===e.target||e.target.classList.contains("popup__close"))&&c(e.currentTarget)}function u(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var a=document.querySelectorAll(".popup"),d=document.querySelector(".places__list"),i=document.querySelector(".profile__edit-button"),l=document.querySelector(".popup_type_edit"),s=document.forms["edit-profile"],_=document.querySelector(".popup__input_type_name"),m=document.querySelector(".popup__input_type_description"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),f=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),q=document.forms["new-place"],S=q.querySelector(".popup__input_type_card-name"),g=q.querySelector(".popup__input_type_url"),L=document.querySelector(".popup_type_image"),E=L.querySelector(".popup__image");function h(e,t){o(L),E.src=e,E.alt=t,L.querySelector(".popup__caption").textContent=t}a.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",p),e.addEventListener("click",p)})),i.addEventListener("click",(function(){o(l),_.value=y.textContent,m.value=v.textContent})),s.addEventListener("submit",(function(e){e.preventDefault();var t=_.value,n=m.value;y.textContent=t,v.textContent=n,c(l)})),f.addEventListener("click",(function(){o(k)})),q.addEventListener("submit",(function(e){var o,p;e.preventDefault(),p=t({name:o=S.value,link:g.value,alt:o},n,h,r),d.prepend(p),c(k),q.reset()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=t(e,n,h,r);d.append(o)}))})();