import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import {deleteSpotThunk} from '../../../store/spots'
import { useHistory } from "react-router-dom";

export default function DeleteSpot({spot}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const spotId = spot.id

    const { closeModal } = useModal();

    const handleDeleteSpot = async () => {
        await dispatch(deleteSpotThunk(spotId));
        closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDeleteSpot(spotId);
        history.push('/spots/current')
    }


    return (
        <div className="delete-container">
            <h1 className="centered">Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from your listings?</p>
            <div className="delete-buttons__container">
                <button className="submit-form__button" onClick={handleSubmit}>Yes (Delete Spot)</button>
                <button className="submit-form__button" style={{backgroundColor: 'gray'}} onClick={closeModal}>No (Keep Spot)</button>
            </div>

        </div>
  );
}
