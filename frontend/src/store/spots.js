import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots'
const GET_SPOT_DETAILS = 'spots/getSpotDetails'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

const getSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
        spot
    }
}

//******************** THUNKS ********************

//***** GET ALL SPOTS *****
export const getSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(getSpots(data));
        return data;
    }
};

//***** GET SPOTS DETAILS *****
export const getDetailsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if(response.ok) {
        const data = await response.json();
        dispatch(getSpotDetails(data))
        return data;
    }
};

//******************** REDUCER ********************

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
        case GET_SPOT_DETAILS:
            newState["spotDetails"] = action.spot;
            return newState;
        default:
            return state;
    }
}

export default spotReducer;
