import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="main">
			<section className="profile">
				<div className="profile-info">
					<div onClick={props.onEditAvatar} className="profile-info__avatar-wrapper">
						<img src={currentUser.avatar} alt="Аватар" className="profile-info__avatar" />
					</div>
					<h1 className="profile-info__name">{currentUser.name}</h1>
					<p className="profile-info__about">{currentUser.about}</p>
					<button onClick={props.onEditProfile} type="button" id="edit-profile" className="profile-info__edit-button"></button>
				</div>
				<button onClick={props.onAddPlace} type="button" id="add-element" className="profile__add-button"></button>
			</section>
			<section className="elements">
				{props.cards.map((card) => (
					<Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
				))}
			</section>
		</main>
	)
}

export default Main