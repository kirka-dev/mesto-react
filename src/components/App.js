import React from 'react';

import Header from './Header'
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});
	const [currentUser, setCurrentUser] = React.useState({ _id: '', name: '', avatar: '', about: '' });
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		api.getUserInfo()
			.then(res => {
				setCurrentUser(res);
			})
			.catch(err => console.log(err));
	}, []);

	React.useEffect(() => {
		api.getCards()
			.then(res => {
				setCards(res);
			})
			.catch(err => console.log(err));
	}, []);

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard({});
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
			setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
		}).catch(err => console.log(err));
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id).then(() => {
			const newCards = cards.filter(c => c._id !== card._id);
			setCards(newCards);
		}).catch(err => console.log(err));
	}

	function handleUpdateUser(userInfo) {
		api
			.setUserInfo(userInfo)
			.then((userData) => {
				setCurrentUser(userData);
				setIsEditProfilePopupOpen(false);
			}).catch(err => console.log(err));
	}

	function handleUpdateAvatar(avatar) {
		api
			.setAvatar(avatar)
			.then((userData) => {
				setCurrentUser(userData);
				setIsEditAvatarPopupOpen(false);
			}).catch(err => console.log(err));
	}

	function handleAddPlaceSubmit(card) {
		api
			.createCard(card)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				setIsAddPlacePopupOpen(false);
			}).catch(err => console.log(err));
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />
				<Main
					cards={cards}
					onEditAvatar={handleEditAvatarClick}
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
				/>

				<AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

				<EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

				<EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

				<PopupWithForm title="Вы уверены?" name="confirm" buttonTitle="Да" />

				<ImagePopup onClose={closeAllPopups} card={selectedCard} />

				<Footer />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
