import { useDispatch } from "react-redux"
import { useModal } from "../../../context/Modal";
import {deleteReviewThunk} from '../../../store/reviews'

export default function DeleteReview({review}) {
    const dispatch = useDispatch();

    const reviewId = review.id

    const { closeModal } = useModal();

    const handleDeleteReview = async () => {
        await dispatch(deleteReviewThunk(reviewId));
        closeModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleDeleteReview(reviewId);
        // history.push('/spots/current')
    }


    return (
        <div className="delete-container">
            <h1 className="centered">Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <div className="delete-buttons__container">
                <button className="submit-form__button" onClick={handleSubmit}>Yes (Delete Review)</button>
                <button className="submit-form__button" style={{backgroundColor: 'gray'}} onClick={closeModal}>No (Keep Review)</button>
            </div>

        </div>
  );
}
