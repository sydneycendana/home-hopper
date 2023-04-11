import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/getSpots'
const GET_SPOT_DETAILS = 'spots/getSpotDetails'
const CREATE_SPOT = 'spots/createSpot'
const GET_USER_SPOTS = 'spots/getUserSpots'

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

const createSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}

const getUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots
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

//***** CREATE SPOT *****
export const createSpotThunk = (newSpot, previewImage) => async (dispatch) => {
    const spotResponse = await csrfFetch(`/api/spots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSpot)
    });

    if (spotResponse.ok) {
        const spotData = await spotResponse.json();

        const imageResponse = await csrfFetch(
        `/api/spots/${spotData.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: previewImage.url,
                preview: true,
            }),
        });

        if(imageResponse.ok){
            const imageData = await imageResponse.json();
            spotData.previewImage = imageData.url;

            dispatch(createSpot(spotData));
            return spotData;
        }
    }
};

//***** GET USERS SPOTS *****
export const getUserSpotsThunk = () => async (dispatch) => {

  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSpots(data));
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
        case CREATE_SPOT:
            const createSpot = action.newSpot;
            return createSpot;
        case GET_USER_SPOTS:
            const userSpots = {};
            action.spots.Spots.forEach((spot) => (userSpots[spot.id] = spot));
            newState["userSpots"] = userSpots;
            return newState;
        default:
            return state;
    }
}

export default spotReducer;
