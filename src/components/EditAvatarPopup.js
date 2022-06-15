import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarInput = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarInput.current.value,
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} title="Обновить аватар" name="avatar">
            <input
                type="url"
                name="avatar"
                id="profile-avatar"
                className="popup__input"
                placeholder="Ссылка"
                ref={avatarInput}
                required
            />
            <p className="popup__error profile-avatar-error"></p>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;