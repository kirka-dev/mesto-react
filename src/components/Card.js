import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`element__like ${isLiked ? 'element__like_active' : ''}`
	);

	return (
		<div className="element">
			<img onClick={() => { props.onCardClick(props.card) }} src={props.card.link} alt={props.card.name} className="element__cover" />
			<div className="element__info">
				<p className="element__title">{props.card.name}</p>
				<button onClick={() => { props.onCardLike(props.card) }} type="button" className={cardLikeButtonClassName}>{props.card.likes.length}</button>
			</div>
			{isOwn && <button onClick={() => { props.onCardDelete(props.card) }} type="button" className="element__delete"></button>}
		</div>
	);
}

export default Card;
