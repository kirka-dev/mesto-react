function ImagePopup(props) {
	return (
		<section className={'popup' + (props.card.name ? ' popup_show' : '')} id="popup-image">
			<div className="popup-image">
				<img className="popup-image__image" src={props.card.link} alt={props.card.name} />
				<div className="popup-image__title">{props.card.name}</div>
				<button onClick={props.onClose} type="button" className="popup__close"></button>
			</div>
		</section>
	);
}

export default ImagePopup;