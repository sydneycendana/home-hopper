import { useDispatch } from "react-redux"
import { useState, useEffect } from "react";
import { useModal } from "../../../context/Modal";
import {createReviewsThunk, getReviewsThunk} from '../../../store/reviews'
import {getDetailsThunk} from '../../../store/spots'
import './CreateReview.css'


export default function CreateReview({spotId}) {
    const dispatch = useDispatch();

    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([]);
    const [stars, setStars] = useState("")
    const [starsSelected, setStarsSelected] = useState(false);
    const { closeModal } = useModal();

    const setStarsByIndex = (index) => {
        setStars(index);
        setStarsSelected(true)
    }

    const handleCreateReview = async (review, stars) => {
        const reviewData = { review, stars };
        await dispatch(createReviewsThunk(reviewData, spotId));
        await dispatch(getReviewsThunk(spotId))
        await dispatch(getDetailsThunk(spotId))
        closeModal();
    }

      const handleMouseEnter = (index) => {
    if (!starsSelected) {
      setStars(index);
    }
  };

  const handleMouseLeave = () => {
    if (!starsSelected) {
      setStars("");
    }
  };

    const isSubmitDisabled = () => {
        return review.length < 10 || !stars;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateReview(review, stars);
    }


    return (
        <div className="create-review__container">
            <h1 className="centered">How was your stay?</h1>
            <ul className="errors-list">
                {errors.map((error, id) => (
                <li key={id}>{error}</li>
                ))}
            </ul>
            <form className="create-review__form">
                <textarea
                    className="review-text"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Leave your review here..."
                    required
                />
                <div className="create-review__stars">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <span
                        key={index}
                        className={index <= stars ? "star-filled" : ""}
                        onClick={() => setStarsByIndex(index)}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        >
                        ★
                        </span>
                    ))}
                    <span>stars</span>
                </div>


                <button
                    className="submit-form__button"
                    type="submit"
                    disabled={isSubmitDisabled()}
                    onClick={handleSubmit}
                >
                    Submit Your Review
                </button>
            </form>
        </div>
  );
}
