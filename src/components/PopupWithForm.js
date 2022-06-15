function PopupWithForm(props) {
	return (
		<section className={'popup' + (props.isOpen ? ' popup_show' : '')} id={`popup-${props.name}`}>
			<form className="popup__form" id={`form-${props.name}`} autoComplete="off" onSubmit={props.onSubmit}>
				<h3 className="popup__title">{props.title}</h3>
				{props.children}
				<button type="submit" className="popup__button">{props.buttonTitle ?? 'Сохранить'}</button>
				<button onClick={props.onClose} type="button" className="popup__close" />
			</form>
		</section>
	);
}

export default PopupWithForm;