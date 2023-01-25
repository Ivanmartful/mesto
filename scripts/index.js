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

    cardImg.addEventListener('click', function (evt) {
        openPopup(viewPopup);
        popupImage.src = item.link;
        popupImage.alt = item.name;
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
    closePopup(cardPopup);
    cardNameInput.value = '';
    cardLinkInput.value = '';
};

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function handleProfileFormSubmit (evt) {
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
});

cardFormElement.addEventListener('submit', addCard);

renderCards();

addButton.addEventListener('click', () => openPopup(cardPopup));

profileForm.addEventListener('submit', handleProfileFormSubmit);