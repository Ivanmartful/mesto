import {openViewPopup} from './newindex.js';

export default class Card {
    constructor(template, item) {
        this._template = template;
        this._name = item.name;
        this._link = item.link;

        this._deleteCard = this._deleteCard.bind(this);
        this._toggleLike = this._toggleLike.bind(this);
        this._openViewPopup = openViewPopup;
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
        this._element.querySelector('.element__image').addEventListener('click', () => this._openViewPopup(this._name, this._link));
    }

    _deleteCard() {
        this._element.remove();
    }

    _toggleLike() {
        this._element.querySelector('.element__button').classList.toggle('element__button_active');
    }

    getCard() {
        this._element = this._getCardFromTemplate();
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._addEventListeners();
        return this._element;
    }
}