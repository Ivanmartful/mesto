import Popup from './Popup.js';

export default class PopupDeleteAccept extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._acceptButton = this._popup.querySelector('.popup__save-button');
        this._acceptButtonText = this._acceptButton.textContent;
    }

    handleConfirm(handleConfirmCallback) {
        this._handleConfirmCallback = handleConfirmCallback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._acceptButton.addEventListener('click', (evt) => {
            this._handleConfirmCallback();
        })
    }

    renderLoading(isLoading) {
        if(isLoading) {
            this._acceptButton.textContent = 'Удаление...'
        } else {
            this._acceptButton.textContent = this._acceptButtonText;
        }
    }
}