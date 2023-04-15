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
        <div className="delete-spot__container">
            <h1 className="centered">Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from your listings?</p>
            <button onClick={handleSubmit}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (KeepSpot)</button>

        </div>
  );
}
