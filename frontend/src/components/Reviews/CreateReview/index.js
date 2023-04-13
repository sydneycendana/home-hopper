import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import {createReviewsThunk, getReviewsThunk} from '../../../store/reviews'
import {getDetailsThunk} from '../../../store/spots'


export default function CreateReview({spotId}) {
    const dispatch = useDispatch();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // useEffect(() => {
    //     dispatch(getSpotReviewsThunk(spotId));
    // }, [dispatch, spotId]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setErrors([]);

    //     return dispatch(createReviewsThunk(review, stars))
    //     .then(closeModal)
    //     .catch(async (res) => {
    //         const data = await res.json();
    //         if (data && data.message) setErrors([data.message]);
    //     });


    // }

    const handleCreateReview = async (review, stars) => {
        const reviewData = { review, stars };
        await dispatch(createReviewsThunk(reviewData, spotId));
        await dispatch(getReviewsThunk(spotId))
        await dispatch(getDetailsThunk(spotId))
        closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateReview(review, stars);
    }


    return (
        <div className="create-review__container">
            <h1 className="centered">How was your stay?</h1>
            <form className="create-review__form">
                <textarea
                    className="review-desc"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="How was your stay ?"
                    required
                />
                <input
                    className="create-review__stars"
                    type="number"
                    min={0}
                    max={5}
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    placeholder="Stars"
                    required
                />
                <ul className="errors">
                    {errors.map((error, id) => (
                    <li key={id}>{error}</li>
                    ))}
                </ul>

                <button
                    className="reviewBttn"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Create a Review
                </button>
            </form>
        </div>
  );
}
