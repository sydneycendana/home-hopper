import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import DeleteReview from "../DeleteReview";
import { getReviewsThunk } from "../../../store/reviews";
import './SpotReviews.css'

export default function SpotReviews() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const spot = useSelector(state => state.spot.spotDetails)
    const reviews = useSelector(state => state.review.allReviews);

    const owner = sessionUser && spot.Owner.id === sessionUser.id

    if(!reviews) return null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    return (
        <div>
            <div className="all-reviews__container">
                {Object.values(reviews).length > 0 ? (
                Object.values(reviews).reverse().map((review) => {
                    const date = new Date(review.createdAt);
                    const monthName = monthNames[date.getMonth()];
                    const year = date.getFullYear();
                    return (
                        <div className="review" key={review.id}>
                            <h5>{review.User.firstName}</h5>
                            <h6>{`${monthName} ${year}`}</h6>
                            <p>{review.review}</p>
                            {sessionUser && sessionUser.id === review.userId && (
                                <OpenModalButton
                                    buttonText="Delete"
                                    className="__delete-review"
                                    modalComponent={<DeleteReview review={review} />}
                                />
                            )}
                        </div>
                    )
                })
            ) : (
                    sessionUser && !owner ? (
                    <p>Be the first to post a review!</p>
                    ) : null
                )}
            </div>
        </div>
    );

}
