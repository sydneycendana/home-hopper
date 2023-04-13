import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import {deleteSpotThunk} from '../../../store/spots'

export default function DeleteSpot({spot}) {
    const dispatch = useDispatch();

    const spotId = spot.id

    const { closeModal } = useModal();

    const handleDeleteSpot = async () => {
        await dispatch(deleteSpotThunk(spotId));
        closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDeleteSpot(spotId);
    }


    return (
        <div className="delete-spot__container">
            <h1 className="centered">Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from your listings?</p>
            <button onClick={handleSubmit}>Yes (Delete Spot)</button>
            <button>No (KeepSpot)</button>

        </div>
  );
}
