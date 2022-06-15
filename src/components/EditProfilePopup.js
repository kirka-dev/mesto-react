import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, props.isOpen])

	function handleSubmit(e) {
		e.preventDefault();

		props.onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Редактировать профиль" name="profile">
			<input
				type="text"
				name="name"
				id="profile-name"
				className="popup__input"
				placeholder="Имя"
				minLength="2"
				maxLength="40"
				value={name}
				onChange={(evt) => { setName(evt.target.value) }}
				required
			/>
			<p className="popup__error profile-name-error"></p>
			<input
				type="text"
				name="about"
				id="profile-about"
				className="popup__input"
				placeholder="Описание"
				minLength="2"
				maxLength="200"
				value={description}
				onChange={(evt) => { setDescription(evt.target.value) }}
				required
			/>
			<p className="popup__error profile-about-error"></p>
		</PopupWithForm>
	)

}

export default EditProfilePopup;