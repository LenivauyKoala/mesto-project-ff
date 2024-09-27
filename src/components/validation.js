export const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

  inputElement.classList.add(validationSettings.inputErrorClass); 
  errorElement.classList.add(validationSettings.errorClass); 
  errorElement.textContent = errorMessage; 
}

function hideInputError (formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
}; 

function checkInputValidy(formElement, inputElement, validationSettings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
  
}

function toggleButtonStatus(inputList, buttonElement, validationSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function checkFormInputs(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidy(formElement, inputElement, validationSettings);
      toggleButtonStatus(inputList, buttonElement, validationSettings);
    });
  });
}

export function enableValidation(validationSettings) {
  document.querySelectorAll(validationSettings.formSelector).forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      checkFormInputs(formElement, validationSettings);
      formElement.reset();
    });
}

export function clearValidation(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
  checkFormInputs(formElement, validationSettings)
}