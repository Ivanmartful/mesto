import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, configValidation, cardConfig, profileConfig, addCardConfig } from '../utils/constants.js';

import './index.css';

const validationCardForm = new FormValidator(configValidation, addCardConfig.cardForm);
const validationProfileForm = new FormValidator(configValidation, profileConfig.profileForm);

function createCard(newCard) {
    const card = new Card({
        item: newCard, 
        handleCardClick: (name, link) => {
            popupWithImage.open({name, link})
        }
    }, cardConfig.selectorCardTemplate);
    return card.getCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: (item)=> { 
        cardList.addItem(createCard(item)) 
    }}, cardConfig.selectorCardList);

cardList.renderItems();

const popupWithImage = new PopupWithImage('.popup_view_card');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({nameSelector: profileConfig.nameSelector, jobSelector: profileConfig.jobSelector});

const profilePopupForm = new PopupWithForm(profileConfig.profilePopupSelector, {handleFormSubmit: (data) => {
    userInfo.setUserInfo({
    name: data.name, 
    job: data.job});
}});

profilePopupForm.setEventListeners();

const cardPopupForm = new PopupWithForm(addCardConfig.cardPopupSelector, { handleFormSubmit: (item) => {
    cardList.addItem(createCard(item));
}});

cardPopupForm.setEventListeners();

profileConfig.editButton.addEventListener('click', () => {
    const userInfoShow = userInfo.getUserInfo();
    profilePopupForm.setInputValues(userInfoShow);
    profilePopupForm.open();
    validationProfileForm.toggleButtonState();
    validationProfileForm.resetFormValidation();
});

addCardConfig.addButton.addEventListener('click', () => {
    cardPopupForm.open();
    validationCardForm.toggleButtonState();
    validationCardForm.resetFormValidation();
});

validationCardForm.enableValidation();

validationProfileForm.enableValidation();