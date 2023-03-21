//const initialCards = [
//    {
//        name: 'Архыз',
//        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//    },
//    {
//        name: 'Челябинская область',
//        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//    },
//    {
//        name: 'Иваново',
//        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//    },
//    {
//        name: 'Камчатка',
//        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//    },
//    {
//        name: 'Холмогорский район',
//        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//    },
//    {
//        name: 'Байкал',
//        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//    }
//];

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
    avatarSelector: '.profile__avatar',
    profilePopupSelector: '.popup_name_profile',
    editButton: document.querySelector('.profile__edit-button'),
    profileForm: document.forms["profileForm"],
    nameInput: document.querySelector('.popup__input_type_names'),
    jobInput: document.querySelector('.popup__input_type_description')
}

const avatarConfig = {
    avatarPopupSelector: '.popup_name_avatar',
    avatarForm: document.forms["avatarForm"],
    avatarButton: document.querySelector('.profile__avatar-button'),
}

const addCardConfig = {
    cardForm: document.forms["editForm"],
    addButton: document.querySelector('.profile__add-button'),
    cardPopupSelector: '.popup_name_card'
}

const deletePopupConfig = {
    selector: '.popup_delete_accept'
}

const serverConfig = {
    cardsAdress: 'https://mesto.nomoreparties.co/v1/cohort-61',
    token: '3e94a288-591a-4578-ae34-fb38b084d81f'
}

export { configValidation, cardConfig, profileConfig, avatarConfig, addCardConfig, deletePopupConfig, serverConfig};