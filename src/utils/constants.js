const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: '.popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const cardConfig = {
    selectorCardList: '.elements',
    selectorCardTemplate: '.element-template'
};

const profileConfig = {
    nameSelector: '.profile__title',
    jobSelector: '.profile__subtitle',
    profilePopupSelector: '.popup_name_profile',
    editButton: document.querySelector('.profile__edit-button'),
    profileForm: document.forms["profileForm"],
    nameInput: document.querySelector('.popup__input_type_names'),
    jobInput: document.querySelector('.popup__input_type_description')
}

const addCardConfig = {
    cardForm: document.forms["editForm"],
    addButton: document.querySelector('.profile__add-button'),
    cardPopupSelector: '.popup_name_card'
}

export {initialCards, configValidation, cardConfig, profileConfig, addCardConfig};