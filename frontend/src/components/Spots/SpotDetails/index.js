import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailsThunk } from "../../../store/spots";
import { getReviewsThunk } from "../../../store/reviews";
import './SpotDetails.css'

export default function SpotDetails() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const spot = useSelector(state => state.spot.spotDetails)


    // const spotImages = spot.SpotImages;

    useEffect(() => {
        dispatch(getDetailsThunk(spotId))
    }, [dispatch, spotId]);

    if (!spot) return null;

    return (
        <div className="spot-details__container">
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className="spot-images__container">
                <div className="large-images__container">
                    {/* <img
                    className="large-image"
                    src={spotImages[0].url}
                    alt={`${spot.name}`}/> */}
                </div>
                <div className="small-images__container">
                    <div className="small-image__container">
                        {/* <img
                        className="small-image"
                        src={spotImages[1].url}
                        alt={`${spot.name}`}/> */}
                    </div>
                    <div className="small-image__container">
                        {/* <img
                        className="small-image"
                        src={spotImages[2].url}
                        alt={`${spot.name}`}/> */}
                    </div>
                    <div className="small-image__container">
                        {/* <img
                        className="small-image"
                        src={spotImages[3].url}
                        alt={`${spot.name}`}/> */}
                    </div>
                    <div className="small-image__container">
                        {/* <img
                        className="small-image"
                        src={spotImages[4].url}
                        alt={`${spot.name}`}/> */}
                    </div>
                </div>
            </div>
            <div className="spot-details-bottom__container">
                <div className="spot-text__container">
                    <h2>Hosted by {spot.Owner.firstName}</h2>
                    <p>{spot.description}</p>
                </div>
            </div>
        </div>
    )
};
