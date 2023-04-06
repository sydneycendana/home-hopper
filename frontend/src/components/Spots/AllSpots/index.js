import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSpotsThunk } from "../../../store/spots"
import {ReactComponent as Star} from '../../../assets/images/star.svg'



export default function AllSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    const spots = useSelector((state) => state.spot.allSpots)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    if(!spots) return null;
    const listedSpots = Object.values(spots);

    return (
        <div className="landing-spots-container">
            {listedSpots.map((spot) => {
                return (
                    <div
                        className="landing-spot"
                        key={spot.id}>
                        <div className="landing-previewImg-container">
                            <img
                            className="landing-previewImg"
                            src={spot.previewImage ? spot.previewImage.url : "0"}
                            alt={`${spot.name}`}/>
                        </div>
                        <div className="landing-spot-info">
                            <div className="location-stars-container">
                                <p className="location">
                                    {spot.city}, {spot.state}
                                </p>
                                <div className="reviews">
                                    <Star alt="star"/>
                                    {Number(spot.avgRating) ?  Number(spot.avgRating).toFixed(1) : "New"}
                                </div>
                            </div>
                            <div className="price">
                                ${spot.price}
                            </div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
