import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserSpotsThunk } from "../../../store/spots"
import { getSpotsThunk } from "../../../store/spots"
import {ReactComponent as Star} from '../../../assets/images/star.svg'
// import './allSpots.css'



export default function CurrentUserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)

    // adding an empty object if state is null or undefined ???
    const spots = useSelector((state) => state.spot.allSpots);
    const spotsArray = Object.values(spots)

    const userSpots = spotsArray.filter((spot) => sessionUser.id === spot.ownerId)
    // const [isLoading, setIsLoading] = useState(true);

    //   useEffect(() => {
    //     dispatch(getUserSpotsThunk(sessionUser.id)).then(() => setIsLoading(false));
    // }, [dispatch, sessionUser.id]);


    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);


    const clickHandler = (e, spotId) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return userSpots && (
        <>
        <div className="manage-spots__header">
        <h1>Manage Your Spots</h1>
        <button>Create a New Spot</button>
        </div>
        <div className="landing-spots__container">
            {userSpots.map((spot) => {
                return (
                    <div
                        className="landing-spot"
                        data-tooltip="Tooltip text"
                        onClick={(e) => clickHandler(e, spot.id)}
                        key={spot.id}>
                        <div className="landing-previewImg__container">
                            <img
                            className="landing-previewImg"
                            src={spot.previewImage}
                            alt={`${spot.name}`}/>
                        </div>
                        <div className="landing-spot-info">
                            <div className="location-stars__container">
                                <p className="location">
                                    {spot.city}, {spot.state}
                                </p>
                                <div className="stars">
                                    <Star alt="star"/>
                                    {Number(spot.avgRating) ?  Number(spot.avgRating).toFixed(1) : "New"}
                                </div>
                            </div>
                            <div className="price">
                                <span className="amount"> ${spot.price}</span>night
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}
