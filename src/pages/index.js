import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteAccept from '../components/PopupDeleteAccept.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { configValidation, cardConfig, profileConfig, avatarConfig, addCardConfig, deletePopupConfig, serverConfig } from '../utils/constants.js';

import './index.css';

let userId;

const api = new Api(serverConfig.cardsAdress, serverConfig.token);

const validationCardForm = new FormValidator(configValidation, addCardConfig.cardForm);
const validationProfileForm = new FormValidator(configValidation, profileConfig.profileForm);
const validationAvatarForm = new FormValidator(configValidation, avatarConfig.avatarForm);

function createCard(newCard) {
    const card = new Card({
        item: newCard, 
        handleCardClick: (name, link) => {
            popupWithImage.open({name, link})
        },
        handleDeleteIconClick: () => {
            deleteAcceptPopup.handleConfirm(() => {
                deleteAcceptPopup.renderLoading(true);
                api.deleteCard(newCard._id)
                    .then(() => {
                        deleteAcceptPopup.close();
                        card.deleteCard();
                    })
                    .catch((err) => {console.log(err)})
                    .finally(() => deleteAcceptPopup.renderLoading(false));
            })
            deleteAcceptPopup.open();
        },
        handleLikeClick: () => {
            card.toggleLike();
        }
    }, userId, cardConfig.selectorCardTemplate, api);
    return card.getCard();
}

const cardList = new Section({
    renderer: (item)=> { 
        cardList.addItem(createCard(item)) 
    }}, cardConfig.selectorCardList);

Promise.all([api.getCards(), api.getCurrentUser()])
    .then(([items, user]) => {
        userId = user._id;
        userInfo.setUserInfo(user);
        cardList.renderItems(items);
    })
    .catch((err) => {console.log(err)});  

const popupWithImage = new PopupWithImage('.popup_view_card');

popupWithImage.setEventListeners();

const userInfo = new UserInfo({nameSelector: profileConfig.nameSelector, jobSelector: profileConfig.jobSelector, avatarSelector: profileConfig.avatarSelector});

const profilePopupForm = new PopupWithForm(profileConfig.profilePopupSelector, {handleFormSubmit: ({name, about}) => {
    profilePopupForm.renderLoading(true);
    api.editUserInfo({name, about})
        .then((data) => {
            userInfo.setUserInfo(data);
            profilePopupForm.close();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            profilePopupForm.renderLoading(false);
        });
}});

profilePopupForm.setEventListeners();

const avatarPopupForm = new PopupWithForm(avatarConfig.avatarPopupSelector, {handleFormSubmit: ({avatar}) => {
    avatarPopupForm.renderLoading(true);
    api.updateAvatar({avatar})
    .then((data) => {
        userInfo.setUserInfo(data);
        avatarPopupForm.close();
    })
    .catch((err) => {console.log(err)})
    .finally(() => {
        avatarPopupForm.renderLoading(false);
    });
}});

avatarPopupForm.setEventListeners();

const cardPopupForm = new PopupWithForm(addCardConfig.cardPopupSelector, {handleFormSubmit: (item) => {
    cardPopupForm.renderLoading(true);
    api.createCard(item)
        .then((item) => {
            cardList.addItem(createCard(item));
            cardPopupForm.close();
        })
        .catch((err) => {console.log(err)})
        .finally(() => {
            cardPopupForm.renderLoading(false);
        });
}});

cardPopupForm.setEventListeners();

const deleteAcceptPopup = new PopupDeleteAccept(deletePopupConfig.selector);
deleteAcceptPopup.setEventListeners();

profileConfig.editButton.addEventListener('click', () => {
    const userInfoShow = userInfo.getUserInfo();
    profilePopupForm.setInputValues(userInfoShow);
    profilePopupForm.open();
    validationProfileForm.toggleButtonState();
    validationProfileForm.resetFormValidation();
});

avatarConfig.avatarButton.addEventListener('click', () => {
    avatarPopupForm.open();
    validationAvatarForm.toggleButtonState();
    validationAvatarForm.resetFormValidation();
})

addCardConfig.addButton.addEventListener('click', () => {
    cardPopupForm.open();
    validationCardForm.toggleButtonState();
    validationCardForm.resetFormValidation();
});

validationAvatarForm.enableValidation()

validationCardForm.enableValidation();

validationProfileForm.enableValidation();