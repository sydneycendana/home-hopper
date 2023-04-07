import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/getReviews'

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

//******************** THUNKS ********************

//***** GET ALL REVIEWS *****
export const getReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getReviews(data));
        return data;
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
        default:
            return state;
    }
}

export default reviewReducer;
