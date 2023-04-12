import { csrfFetch } from './csrf';
import { useSelector } from 'react-redux';

const GET_SPOTS = 'spots/getSpots'
const EDIT_SPOT = "spots/editSpot";
const GET_SPOT_DETAILS = 'spots/getSpotDetails'
const CREATE_SPOT = 'spots/createSpot'
const GET_USER_SPOTS = 'spots/getUserSpots'

const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

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

//***** EDIT SPOT *****
export const editSpotThunk = (spotId, updatedSpotData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedSpotData),
  });

  if (response.ok) {
    const spotData = response.json();
    dispatch(editSpot(spotData));
    return spotData;
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
// export const createSpotThunk = (newSpot, previewImage, images) => async (dispatch) => {
//     console.log(newSpot)
//     const spotResponse = await csrfFetch(`/api/spots`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newSpot)
//     });

//     if (spotResponse.ok) {
//         const spotData = await spotResponse.json();
//         console.log(spotData.id);

//         const imageResponse = await csrfFetch(
//         `/api/spots/${spotData.id}/images`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 url: previewImage.url,
//                 preview: true,
//             }),
//         });

//         if(imageResponse.ok){
//             const imageData = await imageResponse.json();
//             spotData.previewImage = imageData.url;

//             dispatch(createSpot(spotData));
//             return spotData;
//         }
//     }
// };

export const createSpotThunk = (newSpot, previewImage, images) => async (dispatch) => {

  const spotResponse = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSpot),
  });

  if (spotResponse.ok) {
    const spotData = await spotResponse.json();

    const imagesWithPreview = [
      {
        url: previewImage.url,
        preview: true,
      },
      ...images.map((image) => ({
        url: image.url,
        preview: false,
      })),
    ];

    const imageResponses = await Promise.all(
      imagesWithPreview.map((image) =>
        csrfFetch(`/api/spots/${spotData.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(image),
        })
      )
    );

    const imageDatas = await Promise.all(
      imageResponses.map((response) => response.json())
    );

    const imageDataWithPreview = imageDatas.find(
      (imageData) => imageData.preview
    );

    if (imageDataWithPreview) {
      spotData.previewImage = imageDataWithPreview.url;
    }

    dispatch(createSpot(spotData));
    return spotData;
  }
};


//***** GET USERS SPOTS *****
export const getUserSpotsThunk = (userId) => async (dispatch) => {
  console.log("hello")
  const response = await csrfFetch(`/api/spots/current`);


  if (response.ok) {
    const data = await response.json();
    dispatch(getUserSpots(data));
    return data;
  } else {
    return {};
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
        case EDIT_SPOT:
            const updatedSpot = action.spot;
            newState["allSpots"][updatedSpot.id] = updatedSpot;
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
