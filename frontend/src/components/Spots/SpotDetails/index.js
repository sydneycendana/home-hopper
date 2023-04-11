import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailsThunk } from "../../../store/spots";
import OpenModalButton from '../../OpenModalButton';
import { createReviewsThunk } from "../../../store/reviews";
import {ReactComponent as Star} from '../../../assets/images/star.svg'
import './SpotDetails.css'
import SpotReviews from "../../Reviews/SpotReviews/index";
import CreateReview from "../../Reviews/CreateReview";

export default function SpotDetails() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const spot = useSelector(state => state.spot.spotDetails);
    const sessionUser = useSelector(state => state.session.id)

    const previewImage = spot?.SpotImages?.find(image => image.preview);
    const otherImages = spot?.SpotImages?.filter(image => !image.preview);

        useEffect(() => {
        dispatch(getDetailsThunk(spotId))
    }, [dispatch, spotId]);

    // useEffect(() => {
    //     dispatch(getReviewsThunk(spotId))
    // }, [dispatch, spotId]);

   let currentUserStatus;
    if (sessionUser) {
        if (sessionUser === spot.ownerId) {
            currentUserStatus = 'owner';
        } else {
            currentUserStatus = 'user';
        }
    }

    const createNewReview = async (e, review, stars) => {
    e.preventDefault();
    let errors = [];

    await dispatch(createReviewsThunk({ review, stars }, spotId))
    .catch(async (res) => {
        const data = await res.json();

        if (data && data.errors) {
          errors = data.errors;
        }
      }
    )};

    console.log()


    if (!spot) return null;

    return (
        <div className="spot-details__container">
            <section class="section">
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
                                            <p>{spot.numReviews === 1 ? '1 review' : `${spot.numReviews} reviews`}</p>
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
            </section>
            <section className="reviews-section">
                <div className="reviews-summary">
                    {Number(spot.avgStarRating) ? (
                    <div className='stars'>
                        <Star alt="star"/>
                        {Number(spot.avgStarRating).toFixed(1)}
                        <span>•</span>
                        <p>{spot.numReviews === 1 ? '1 review' : `${spot.numReviews} reviews`}</p>
                    </div>
                    ) : (
                    <div className='stars'>
                        <Star alt="star"/>
                        New
                    </div> )}
                </div>
                <div className="review-modal">
                    <OpenModalButton
                    className="addReview"
                    buttonText="Post your Review"
                    modalComponent={
                        <CreateReview
                        spotId={spotId}
                        createNewReview={createNewReview}
                        />
                    }
                    />
                </div>
                <SpotReviews/>
            </section>
        </div>
    )
};
