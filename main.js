(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-23",headers:{authorization:"f6cb9800-3604-45de-9049-9d278dc81a46","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))}var n=document.querySelector("#card-template").content;function r(e,t,r,o,c){var a=n.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),u=a.querySelector(".card__delete-button"),l=a.querySelector(".card__title"),s=a.querySelector(".card__like-button"),d=a.querySelector(".card__like-counter"),f=e._id,p=e.owner._id,m=e.likes.length,_=c===p,y=e.likes.filter((function(e){return e._id===c})).length>0;return l.textContent=e.name,i.src=e.link,i.alt=e.name,a.setAttribute("card-id",f),_&&(u.style.display="block",u.addEventListener("click",(function(){return t(a)}))),d.textContent=m,y&&s.classList.add("card__like-button_is-active"),i.addEventListener("click",(function(){return r(e)})),s.addEventListener("click",(function(e){return o(f,e,d)})),a}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function a(e){(e.currentTarget===e.target||e.target.classList.contains("popup__close"))&&c(e.currentTarget)}function i(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function l(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function s(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}(n,r,t)}))}))}function d(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){l(e,n,t)})),s(e,t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,m,_=document.querySelectorAll(".popup"),y=Array.from(document.querySelectorAll(".popup__form")),h=document.querySelector(".places__list"),v=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_edit"),S=document.forms["edit-profile"],k=document.querySelector(".popup__input_type_name"),q=document.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),C=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_new-card"),A=document.forms["new-place"],x=document.querySelector(".popup_type_image"),w=x.querySelector(".popup__image"),U=document.querySelector(".profile__image"),T=document.querySelector(".popup_type_avatar"),j=document.forms.avatar,O=document.querySelector(".popup_type_confirm-delete"),B=document.forms["confirm-delete"];function P(e,t){t.reset(),c(e)}function I(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function D(e){m=e,o(O)}function M(n,r,o){r.target.classList.value.includes("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(n).then((function(e){r.target.classList.remove("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.error("Невозможно удалить лайк",e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)}(n).then((function(e){r.target.classList.add("card__like-button_is-active"),o.textContent=e.likes.length})).catch((function(e){return console.error("Невозможно поставить лайк",e)}))}function N(n){n.preventDefault();var o,c,a,i,l=n.target,s=l.getAttribute("name"),d=l.querySelector(u.submitButtonSelector),f={};switch(s){case"edit-profile":f.name=l.elements.name.value,f.job=l.elements.description.value,function(n,r){I(!0,r),function(n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n.name,about:n.job})}).then(t)}(n).then((function(e){g.textContent=e.name,E.textContent=e.about,P(b,S)})).catch((function(e){console.error("Ошибка при обновлении данных профиля",e)})).finally((function(){return I(!1,r)}))}(f,d);break;case"new-place":f.name=l.elements["place-name"].value,f.link=l.elements.link.value,function(n,o){I(!0,o),function(n){return fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n.name,link:n.link})}).then(t)}(n).then((function(e){h.prepend(r(e,D,J,M,p)),P(L,A)})).catch((function(e){console.error("Ошибка при добавлении карточки",e)})).finally((function(){return I(!1,o)}))}(f,d);break;case"confirm-delete":(i=m.getAttribute("card-id"),function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(i)).then((function(){m.closest(".card").remove(),m.querySelector(".card__delete-button").removeEventListener("submit",D),P(O,B)})).catch((function(e){console.error("Ошибка при удалении карточки",e)}));break;case"avatar":f.link=l.elements.link.value,o=f.link,I(!0,c=d),(a=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:a})}).then(t)).then((function(e){U.style.backgroundImage="url(".concat(e.avatar,")"),P(T,j)})).catch((function(e){console.error("Ошибка с данными Аватара",e)})).finally((function(){return I(!1,c)}));break;default:console.error("Форма не найдена")}}function J(e){o(x),w.src=e.link,w.alt=e.name,x.querySelector(".popup__caption").textContent=e.name}Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];p=a._id,g.textContent=a.name,E.textContent=a.about,U.style.backgroundImage="url(".concat(a.avatar,")"),c.forEach((function(e){var t=r(e,D,J,M,p);h.append(t)}))})).catch((function(e){return console.error("Ошибка при загрузке данных ",e)})),y.forEach((function(e){e.addEventListener("submit",N)})),_.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",a),e.addEventListener("click",a)})),v.addEventListener("click",(function(){o(b),k.value=g.textContent,q.value=E.textContent,d(b,u)})),C.addEventListener("click",(function(){o(L),d(L,u)})),U.addEventListener("click",(function(){o(T),d(T,u),j.reset()})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),s(t,e),t.reset()}))}(u)})();