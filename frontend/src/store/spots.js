import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

// THUNKS
export const getSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpots(data));
        return data;
    }
}

//REDUCER
const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {
        case GET_SPOTS:
            const allSpots = {};
            const getAllSpots = action.spots.Spots;
            getAllSpots.forEach((spot) => (allSpots[spot.id] = spot));
            newState["allSpots"] = {...allSpots};
            return newState;
        default:
            return state;
    }
}
