import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import createReviewsThunk from '../../../store/reviews'

export default function CreateReview() {
    const dispatch = useDispatch();

    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // useEffect(() => {
    //     dispatch(getSpotReviewsThunk(spotId));
    // }, [dispatch, spotId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(createReviewsThunk({ review, stars }))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.message) setErrors([data.message]);
        });


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
