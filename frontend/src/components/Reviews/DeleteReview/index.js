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
        <div className="delete-spot__container">
            <h1 className="centered">Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from your listings?</p>
            <button onClick={handleSubmit}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>

        </div>
  );
}
