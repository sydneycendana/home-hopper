import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/getReviews'
const CREATE_REVIEW = 'reviews/createReview'


const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const createReview = (review, spotId) => {
  return {
    type: CREATE_REVIEW,
    review,
    spotId
  };
};

//******************** THUNKS ********************

//***** GET ALL REVIEWS *****
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data));
        return data;
    }
    return;
};

//***** CREATE REVIEW *****
export const createReviewsThunk = (review, spotId) => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const reviewData = await response.json();
    dispatch(createReview(reviewData, spotId));
    return reviewData;
  }
};

//******************** REDUCER ********************

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {
        case GET_REVIEWS:
            const allReviews = {};
            const getAllReviews = action.reviews.Reviews;
            getAllReviews.forEach((review) => (allReviews[review.id] = review));
            newState["allReviews"] = {...allReviews};
            return newState;
        case CREATE_REVIEW:
            const createdReview = action.review;
            newState.allReviews[createdReview.id] = createdReview;
            return {...newState};
        default:
            return state;
    }
}

export default reviewReducer;
