import Card from './card.js';
import FormValidator from './FormValidator.js';
import {initialCards, configValidation, cardConfig} from './constants.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.popup_name_profile');
const cardPopup = document.querySelector('.popup_name_card');
const viewPopup = document.querySelector('.popup_view_card');

const closeButtons = document.querySelectorAll('.popup__close-button');

const profileForm = document.forms["profileForm"];
const nameInput = profileForm.querySelector('.popup__input_type_names');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardFormElement = document.forms["editForm"];
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_card-link');

const popupImage = viewPopup.querySelector('.popup__image');
const popupName = viewPopup.querySelector('.popup__card-title');

const escCode = 27;

const cardList = document.querySelector(cardConfig.selectorCardList);

const ValidationCardForm = new FormValidator(configValidation, cardFormElement);
const ValidationProfileForm = new FormValidator(configValidation, profileForm);

for (const item of initialCards) {
    const card = new Card(cardConfig.selectorCardTemplate, item);
    const element = card.getCard();
    cardList.append(element);
}

function createCard(newCard) {
    const card = new Card(cardConfig.selectorCardTemplate, newCard, openViewPopup);
    const cardElement = card.getCard();
    return cardElement; 
}

function addCard(evt) {
    evt.preventDefault();
    const cardInfo = {};
    cardInfo.name = cardNameInput.value;
    cardInfo.alt = cardNameInput.value;
    cardInfo.link = cardLinkInput.value;
    const newCard = createCard(cardInfo);
    cardList.prepend(newCard);
    closePopup(cardPopup);
    evt.target.reset();
};

export function openViewPopup(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupName.textContent = name;
    openPopup(viewPopup)
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closeEscFunc);
    document.addEventListener('click', closePopupClickOnOverlay);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeEscFunc);
    document.removeEventListener('click', closePopupClickOnOverlay);
};

function closeEscFunc(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape' || evt.keyCode === escCode) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

function closePopupClickOnOverlay() {
    document.addEventListener('click', evt => {
        if (evt.target.classList.contains("popup_opened")) {
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup);
        }
    });
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(profilePopup);
};

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

editButton.addEventListener('click', function () {
    openPopup(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    ValidationProfileForm.checkButton();
});

cardFormElement.addEventListener('submit', addCard);

addButton.addEventListener('click', () => {
    openPopup(cardPopup);
    ValidationCardForm.checkButton();
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

ValidationCardForm.enableValidation();

ValidationProfileForm.enableValidation();