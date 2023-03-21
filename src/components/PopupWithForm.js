import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));

        this._acceptButton = this._popup.querySelector('.popup__save-button');
        this._acceptButtonText = this._acceptButton.textContent;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        })
        console.log(inputValues);
        return inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    renderLoading(isLoading, renderText='Сохранение...') {
        if(isLoading) {
            this._acceptButton.textContent = renderText;
        } else {
            this._acceptButton.textContent = this._acceptButtonText;
        }
    }

    close() {
        super.close();
        this._form.reset();
    }
}