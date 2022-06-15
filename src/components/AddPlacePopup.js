import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Новое место" name="element" buttonTitle="Создать">
            <input
                type="text"
                name="name"
                id="element-title"
                className="popup__input"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
                required
            />
            <p className="popup__error element-title-error"></p>
            <input
                type="url"
                name="link"
                id="element-image"
                className="popup__input"
                placeholder="Ссылка на картинку"
                value={link}
                onChange={handleLinkChange}
                required
            />
            <p className="popup__error element-image-error"></p>
        </PopupWithForm>
    )

}

export default AddPlacePopup;