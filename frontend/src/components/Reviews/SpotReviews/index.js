import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../../store/reviews";

export default function SpotReviews() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const sessionUser = useSelector(state => state.session.id);
    const reviews = useSelector(state => state.review.allReviews);
    const spot = useSelector(state => state.spot.spotDetails)

    console.log(reviews)




    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId]);

    let owner;
    let noReviewUser;
    let reviewedUser;
    if (sessionUser) {
        if (sessionUser) {
            owner = 'true';
        } else {
            noReviewUser = 'true';
        }
    }

    if(!reviews) return null;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    return (
        <div>
            <div className="all-reviews__container">
                {reviews.length > 0 ? (
                Object.values(reviews).reverse().map((review) => {
                    const date = new Date(review.createdAt);
                    const monthName = monthNames[date.getMonth()];
                    const year = date.getFullYear();
                    return (
                        <div className="review" key={review.id}>
                            <h5>{review.User.firstName}</h5>
                            <h6>{`${monthName} ${year}`}</h6>
                            <p>{review.review}</p>
                        </div>
                    )
                })
            ) : (
                <p>Be the first to post a review!</p>
            )}
            </div>
        </div>
    );

}
