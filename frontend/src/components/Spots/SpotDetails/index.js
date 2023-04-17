import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailsThunk } from "../../../store/spots";
import { getReviewsThunk } from "../../../store/reviews";
import OpenModalButton from '../../OpenModalButton';
import { createReviewsThunk } from "../../../store/reviews";
import {ReactComponent as Star} from '../../../assets/images/star.svg'
import './SpotDetails.css'
import SpotReviews from "../../Reviews/SpotReviews/index";
import CreateReview from "../../Reviews/CreateReview";

export default function SpotDetails() {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [reviewsLoaded, setReviewsLoaded] = useState(false);
    const [fetchReviews, setFetchReviews] = useState(false)

    const spot = useSelector(state => state.spot.spotDetails);

    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.review.allReviews);


    const reviewsArray = reviews ? Object.values(reviews) : [];
    const previewImage = spot?.SpotImages?.find(image => image.preview);
    const otherImages = spot?.SpotImages?.filter(image => !image.preview);

    useEffect(() => {
        const fetchSpotDetails = async () => {
            await Promise.all([
                dispatch(getDetailsThunk(spotId)),
                dispatch(getReviewsThunk(spotId)),
            ]);
            setIsLoaded(true);
            setReviewsLoaded(true);
        };
        fetchSpotDetails();
    }, [dispatch, spotId, fetchReviews]);

    const owner = isLoaded && sessionUser?.id === spot.ownerId;

    const hasUserReviewed = isLoaded && sessionUser?.id && reviewsArray.some((review) => {
        return (review.userId === sessionUser.id);
    });


    const canPostReview = sessionUser && !hasUserReviewed && !owner

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

    const fetchData = async () => {
        setFetchReviews(true);
    };

    if (!spot) return null;

    if (!isLoaded) {
        return <div>Loading...</div>;
    }


    return (
        <div className="spot-details__container">
            <section className="section">
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
                <div className="spot-images__container">
                    <div className="large-images__container">
                        <img
                        className="large-image"
                        src={previewImage && previewImage.url ? previewImage.url : "https://a0.muscache.com/im/pictures/prohost-api/Hosting-549139249395273435/original/ed7f1dbc-e834-478e-974d-0bea94926f0b.jpeg"}
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
                        <button className="submit-form__button" onClick={() => alert('Feature coming soon!')}>Reserve</button>
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
                        {canPostReview && <OpenModalButton
                            className="__add-review"
                            buttonText="Post your Review"
                            modalComponent={
                                <CreateReview
                                    spotId={spotId}
                                    createNewReview={createNewReview}
                                />
                            }
                        />
                        }
                {reviewsLoaded && <SpotReviews fetchData={fetchData}/>}
            </section>
        </div>
    )
};
