import { csrfFetch } from "./csrf";

const CREATE = "spots/createSpot"
const EDIT = "spots/editSpot"

//ACTIONS
const createSpot = (newSpot) => {
    return {
        type: CREATE,
        newSpot
    };
};

const editSpot = (spotId) => {
    return {
        type: EDIT,
        spotId
    };
};

//THUNKS
export const createSpotThunk = (newSpot, previewImage) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots`, {
        method: "POST",
        body: JSON.stringify(newSpot),
    });

    if (response.ok) {
        const createdSpot = await response.json();
        const imageResponse = await csrfFetch(
            `/api/spots/${createdSpot.id}/images`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    url: previewImage.url,
                    preview: true,
                }),
            }
        );

        if (imageResponse.ok){
            const image = await imageResponse.json();
            createdSpot.previewImage = image.url;

            dispatch(createSpot(createdSpot));

            return createdSpot;
        }
    }
}

export const editSpotThunk = (editedSpotData, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(editedSpotData)
    })

    if(response.ok) {
        const editedSpot = response.json();
        const spot = {...editedSpotData, id: spotId};
        dispatch(editSpot(spot));
        return editedSpot;
    }
}

//REDUCER
const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState = { ...state};
    switch (action.type) {
        case CREATE:
            const addSpot = action.newSpot;
            return addSpot;
        //NEED TO ADD EDIT SPOT CASE
        default:
            return state;
    }
};

export default spotReducer;
