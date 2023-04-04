import { csrfFetch } from "./csrf";

const CREATE = "spots/createSpots"

//ACTIONS
const createSpots = (newSpot) => {
    return {
        type: CREATE,
        newSpot
    };
};

//THUNKS
export const createSpotsThunk = (newSpot, previewImage) => async (dispatch) => {
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

            dispatch(createSpots(createdSpot));

            return createdSpot;
        }
    }
}

//REDUCER
const initialState = {};

const spotReducer = (state = initialState, action) => {
    let newState = { ...state};
    switch (action.type) {
        case CREATE:
            const createSpot = action.newSpot;
            return createSpot;
        default:
            return state;
    }
};

export default spotReducer;
