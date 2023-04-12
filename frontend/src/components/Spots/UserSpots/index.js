import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUserSpotsThunk } from "../../../store/spots"
import {ReactComponent as Star} from '../../../assets/images/star.svg'
// import './allSpots.css'



export default function CurrentUserSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    const spots = useSelector((state) => state.spot.userSpots)
    const sessionUser = useSelector(state => state.session.user)
    console.log(sessionUser)
    console.log(spots)
    const spotsArray = Object.values(spots)

    useEffect(() => {
        dispatch(getUserSpotsThunk(sessionUser.id))
    }, [dispatch]);

    const clickHandler = (e, spotId) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    if(!spots) return null;
    const listedSpots = Object.values(spots);

    return (
        <div className="landing-spots__container">
            {spotsArray.map((spot) => {
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
    )
}
