const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_names');
let jobInput = formElement.querySelector('.popup__input_type_description');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

editButton.addEventListener('click', (Event) => {
    popup.classList.add('popup_opened');
})

closeButton.addEventListener('click', (Event) => {
    popup.classList.remove('popup_opened');
})

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', handleFormSubmit); 
