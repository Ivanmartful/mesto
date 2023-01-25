const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');

const cardPopup = document.querySelector('.popup_name_card');
const viewPopup = document.querySelector('.popup_view_card');

const closeButton = popup.querySelector('.popup__close-button');
const cardCloseButton = cardPopup.querySelector('.popup__close-button');
const viewCloseButton = viewPopup.querySelector('.popup__close-button');

let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_names');
let jobInput = formElement.querySelector('.popup__input_type_description');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let cardFormElement = cardPopup.querySelector('.popup__form');
let cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
let cardLinkInput = cardFormElement.querySelector('.popup__input_type_card-link');

let popupImage = viewPopup.querySelector('.popup__image');
let popupName = viewPopup.querySelector('.popup__card-title');

const elementsList = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');

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

function createCard(item) {
    const cardElement = elementTemplate.cloneNode(true);
    const cardName = cardElement.querySelector('.element__title');
    const cardImg =  cardElement.querySelector('.element__image');

    cardName.textContent = item.name;
    cardImg.src = item.link;
    cardImg.alt = item.name;

    cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__button_active');
    });

    cardElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });

    cardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        viewPopup.classList.add('popup_opened');
        popupImage.src = item.link;
        popupName.textContent = item.name;
    });

    return cardElement;
};

function renderCards(){
    initialCards.forEach(item => {
        const cardHtml = createCard(item);
        elementsList.append(cardHtml);
    })
};

function addCard(evt) {
    evt.preventDefault();
    const cardInfo = {};
    cardInfo.name = cardNameInput.value;
    cardInfo.alt = cardNameInput.value;
    cardInfo.link = cardLinkInput.value;
    const newCard = createCard(cardInfo);
    elementsList.prepend(newCard);
    cardPopupClose();
    cardNameInput.value = '';
    cardLinkInput.value = '';
  }

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

function popupClose() {
    popup.classList.remove('popup_opened');
};

function cardPopupOpen() {
    cardPopup.classList.add('popup_opened');
};

function cardPopupClose() {
    cardPopup.classList.remove('popup_opened');
};

function viewPopupOpen() {
    viewPopup.classList.add('popup_opened');

};

function viewPopupClose() {
    viewPopup.classList.remove('popup_opened');
};

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popupClose();
};

cardFormElement.addEventListener('submit', addCard);

renderCards();

editButton.addEventListener('click', popupOpen);

closeButton.addEventListener('click', popupClose);

addButton.addEventListener('click', cardPopupOpen);

cardCloseButton.addEventListener('click', cardPopupClose);

viewCloseButton.addEventListener('click', viewPopupClose);

formElement.addEventListener('submit', handleFormSubmit);