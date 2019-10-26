
// переменные
const placesListContainer = document.querySelector('.places-list');
const addCardForm = document.querySelector('#new-card');
const popupImg = document.querySelector('.popup__card-image');
const submitCardButton = document.querySelector('#submitCard');
const newCardForm = document.forms.new;
const newCardName = newCardForm.elements.name;
const newCardLink = newCardForm.elements.link;
const editProfile = document.querySelector('#edit-profile');
const editName = document.querySelector('#editName');
const editAbout = document.querySelector('#editAbout');
const editProfileForm = document.forms.edit;
const saveButton = document.querySelector('.popup__button_save');
const profileName = editProfileForm.elements.name;
const profileAbout = editProfileForm.elements.about;

export { placesListContainer, addCardForm, popupImg, submitCardButton, 
    newCardForm, newCardName, newCardLink, editProfile, editName,
     editAbout,editProfileForm, saveButton, profileName, profileAbout };