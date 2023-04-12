import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({modalComponent, buttonText, className, onButtonClick, onModalClose}){
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (typeof onButtonClick === "function") onButtonClick();
        if (typeof onModalClose === "function") setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    };

    return <button className={`modal-button${className}`} onClick={onClick}>{buttonText}</button>
}

export default OpenModalButton;
