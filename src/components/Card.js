export default class Card {
    constructor({item, handleCardClick, handleLikeClick, handleDeleteIconClick}, userId, template, api) {
        this._name = item.name;
        this._link = item.link;
        this._likes = item.likes;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;

        this._userId = userId;
        this._id = item._id;
        this._isOwner = item.owner._id === userId;

        this._template = template;

        this._api = api;

        this.deleteCard = this.deleteCard.bind(this);
        this.toggleLike = this.toggleLike.bind(this);
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
        this._deleteButton.addEventListener('click', this._handleDeleteIconClick);
        this._likeButton.addEventListener('click', this._handleLikeClick);
        this._cardImage.addEventListener('click', this._openPopup);
    }

    deleteCard() {
        this._element.remove();
    }

    toggleLike() {
        if(!(this._likeButton.classList.contains('element__button_active'))) {
            this._api.like(this._id)
                .then((item) => {
                    this._likeButton.classList.add('element__button_active');
                    this._likeNumber.textContent = item.likes.length;
                })
                .catch((err) => {console.log(err)})
        } else {
            this._api.deleteLike(this._id)
                .then((item) => {
                    this._likeButton.classList.remove('element__button_active');
                    this._likeNumber.textContent = item.likes.length;
                })
        }

        this._likeButton.classList.toggle('element__button_active');
    }

    _renderDeleteButton() {
        if (!this._isOwner) {
            this._deleteButton.remove();
        }
    }

    _renderLikeButton() {
        if(this._likes.find((item) => item._id === this._userId)) {
            this._likeButton.classList.add('element__button_active');
        }
    }

    _renderLikeNumber() {
        this._likeNumber.textContent = this._likes.length;
    }

    _openPopup() {
        this._handleCardClick(this._name, this._link);
    }

    getCard() {
        this._element = this._getCardFromTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._cardName = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__button');
        this._likeNumber = this._element.querySelector('.element__like-number');
        this._deleteButton = this._element.querySelector('.element__delete-button');

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._renderLikeButton();
        this._renderLikeNumber();
        this._renderDeleteButton();
        this._addEventListeners();
        return this._element;
    }
}