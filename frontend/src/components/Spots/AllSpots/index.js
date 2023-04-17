import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots"
import {ReactComponent as Star} from '../../../assets/images/star.svg'
import './allSpots.css'



export default function AllSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);


    const spots = useSelector((state) => state.spot.allSpots)

    useEffect(() => {
        dispatch(getSpotsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const clickHandler = (e, spotId) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    if(!spots) return null;
    const listedSpots = Object.values(spots);

    if(!isLoaded) return <p>Loading...</p>;

    return (
        <div className="page-container">
        <div className="landing-spots-wrapper">
        <div className="landing-spots__container">
            {listedSpots.map((spot) => {
                return (
                    <div
                        className="landing-spot"
                        onClick={(e) => clickHandler(e, spot.id)}
                        key={spot.id}
                        title={spot.name}>
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
                        {/* <span className='tooltip'>{spot.name}</span> */}
                    </div>
                )
            })}
        </div>
        </div>
        </div>
    )
}
