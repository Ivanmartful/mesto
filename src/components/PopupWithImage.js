import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupTitle = this._popup.querySelector('.popup__card-title');
    }

    open({name, link}) {
        this._popupTitle.textContent =  name;
        this._popupImage.alt = name;
        this._popupImage.src = link;
        super.open();
    }
}