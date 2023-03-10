export default class Card {
    constructor({item, handleCardClick}, template) {
        this._name = item.name;
        this._link = item.link;
        this._handleCardClick = handleCardClick;

        this._template = template;

        this._deleteCard = this._deleteCard.bind(this);
        this._toggleLike = this._toggleLike.bind(this);
        this._openPopup = this._openPopup.bind(this);
    }

    _getCardFromTemplate() {
        return document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _addEventListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', this._deleteCard);
        this._element.querySelector('.element__button').addEventListener('click', this._toggleLike);
        this._element.querySelector('.element__image').addEventListener('click', this._openPopup);
    }

    _deleteCard() {
        this._element.remove();
    }

    _toggleLike() {
        this._element.querySelector('.element__button').classList.toggle('element__button_active');
    }

    _openPopup() {
        this._handleCardClick(this._name, this._link);
    }

    getCard() {
        this._element = this._getCardFromTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardName = this._element.querySelector('.element__title');
        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._addEventListeners();
        return this._element;
    }
}