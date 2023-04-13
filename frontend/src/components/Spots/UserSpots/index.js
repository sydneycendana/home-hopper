import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDetailsThunk } from "../../../store/spots"
import { getSpotsThunk } from "../../../store/spots"
import {ReactComponent as Star} from '../../../assets/images/star.svg'
import DeleteSpot from "../DeleteSpot";
import { Link, NavLink } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
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


    const clickSpotDetails = (e, spotId) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    // const clickEditSpot = (() => {
    //     (async (e, spotId) => await dispatch(getDetailsThunk(spotId)).then((spot) => history.push(`/spots/${spot}/edit`)))()
    // })

    const clickEditSpot = async (e, spotId) => {
    e.preventDefault();
    await dispatch(getDetailsThunk(spotId)).then(() => history.push(`/spots/${spotId}/edit`))
}
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return userSpots && (
        <>
        <div className="manage-spots__header">
        <h1>Manage Your Spots</h1>
        <button>
            <Link exact to="/spots/new">
                Create a New Spot
            </Link>
        </button>
        </div>
        <div className="landing-spots__container">
            {userSpots.map((spot) => {
                return (
                    <div
                        className="landing-spot"
                        data-tooltip="Tooltip text"
                        key={spot.id}>
                        <div
                        className="landing-previewImg__container"
                        onClick={(e) => clickSpotDetails(e, spot.id)}
                        >
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

                        <div className="manage-spots__buttons">
                            <button onClick={(e) => clickEditSpot(e, spot.id)}>
                                {/* <NavLink exact to={`/spots/${spot.id}/edit`}> */}
                                    Update
                                {/* </NavLink> */}
                            </button>
                                <Link exact="true" to={`/spots/${spot.id}`} className="update">
                                    <OpenModalButton
                                        itemText="Delete"
                                        modalComponent={<DeleteSpot spot={spot} />}
                                    />
                                </Link>
                        </div>
                    </div>
                )
            })}
        </div>
        </>
    )
}
