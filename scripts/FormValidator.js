export default class FormValidator {
    constructor(configValidation, formElement) {
        this._configValidation = configValidation;
        this._formElement = formElement;

        this._inputList = Array.from(this._formElement.querySelectorAll(this._configValidation.inputSelector));
        this._formList = Array.from(document.querySelectorAll(this._configValidation.formSelector));
        this._submitButton = this._formElement.querySelector(this._configValidation.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._configValidation.inputErrorClass);
        errorElement.classList.add(this._configValidation.errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._configValidation.inputErrorClass);
        errorElement.classList.remove(this._configValidation.errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    checkButton() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation() {
        this._formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
            this._setEventListeners();
        });
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._configValidation.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
        else {
            this._submitButton.classList.remove(this._configValidation.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

};