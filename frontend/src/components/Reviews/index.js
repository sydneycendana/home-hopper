import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReviewsThunk } from "../../store/reviews";

export default function SpotReviews() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const sessionUser = useSelector(state => state.session.id);
    const reviews = useSelector(state => state.review.allReviews);
    const spots = useSelector(state => state.spot.allSpots)




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

    return (
        <div>
            (noReviewUser && (
            <button>Post Your Review</button>
            ))
            <div className="all-reviews__container">
                {Object.values(reviews).map((review) => {
                    return (
                        <div className="review" key={review.id}>
                            <h6>{review.userId}</h6>
                        </div>
                    )
                })}
            </div>
        </div>
    );

}
