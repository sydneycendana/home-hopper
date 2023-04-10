import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailsThunk } from "../../../store/spots";
import { getReviewsThunk } from "../../../store/reviews";
import {ReactComponent as Star} from '../../../assets/images/star.svg'
import './SpotDetails.css'

export default function SpotDetails() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const spot = useSelector(state => state.spot.spotDetails)
    const reviews = useSelector(state => state.review.allReviews)


    const previewImage = spot?.SpotImages?.find(image => image.preview);
    const otherImages = spot?.SpotImages?.filter(image => !image.preview);



    useEffect(() => {
        dispatch(getDetailsThunk(spotId))
    }, [dispatch, spotId]);

//     useEffect(() => {
//     async function fetchData() {
//         await dispatch(getDetailsThunk(spotId))
//     }
//     fetchData();
// }, [dispatch, spotId]);

        useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId]);

    if (!spot) return null;

    return (
        <div className="spot-details__container">
            <div class="section">
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
                <div className="spot-images__container">
                    <div className="large-images__container">
                        <img
                        className="large-image"
                        src={previewImage.url}
                        alt={`${spot.name}`}/>
                    </div>
                    <div className="small-images__container">
                        {otherImages.map((image, index) => (
                        <img key={index} src={image.url} alt={spot.name} className="small-image" />
                        ))}
                    </div>
                </div>
                <div className="spot-details-bottom__container">
                    <div className="spot-text__container">
                        <h2>Hosted by {spot.Owner.firstName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className="reserve-info__container">
                        <div className="price-and-stars__container">
                            <div className="price"><span className="amount"> ${spot.price}</span>night</div>
                            <div className="reviews__container">
                                    {Number(spot.avgStarRating) ? (
                                        <div className='stars'>
                                            <Star alt="star"/>
                                            {Number(spot.avgStarRating).toFixed(1)}
                                            <span>•</span>
                                            <p>{spot.numReviews} reviews</p>
                                        </div>
                                    ) : (
                                        <div className='stars'>
                                        <Star alt="star"/>
                                        New
                                        </div> )}
                            </div>
                        </div>
                        <button className="reserve-button">Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
