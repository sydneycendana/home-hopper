import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import * as spotActions from '../../../store/spots'
import './CreateSpot.css'

export default function CreateSpot(){
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [description, setDescription] = useState('')

    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const spot = dispatch(
        spotActions.createSpotThunk(
            {
            //   name,
              description,
            //   price,
            address,
            city,
            state,
            country,
            },
            {
            //   url: previewImage,
            //   preview: true,
            }
        )
        );
        history.push(`/spots/${spot.id}`);
    } catch (error) {
        const response = await error.response.json();
        if (response && response.errors) {
        setErrors(response.errors);
        }
    }
    };


    return (
        <div className="create-spot__container">
            <h1>Create a new Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guest's will only get your exact address once they booked a reservation</p>
                <form className="create-spot__form">
                    <div className="section-one">
                        <div className="create-spot__input">
                            <div className="create-spot__label">
                                <label htmlFor="country">Country</label>
                                {errors.country && (
                                    <div className="errors">{errors.country}</div>
                                )}
                            </div>
                            <input
                            className="form-input"
                            id="country"
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            />
                        </div>
                        <div className="create-spot__input">
                            <div className="create-spot__label">
                                <label htmlFor="address">Street Address</label>
                                {errors.address && (
                                    <div className="errors">{errors.address}</div>
                                )}
                            </div>
                            <input
                            className="form-input"
                            id="address"
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            />
                        </div>
                        <div className = "flex-columns">
                            <div className="input-container__city">
                                <div className="create-spot__label">
                                <label htmlFor="city">City</label>
                                    {errors.city && (
                                        <div className="errors">{errors.city}</div>
                                    )}
                                </div>
                                <input
                                    className="form-input"
                                    id="city"
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    />
                            </div>
                            <div className="input-container__state">
                                <div className="create-spot__label">
                                    <label htmlFor="state">State</label>
                                        {errors.state && (
                                            <div className="errors">{errors.state}</div>
                                        )}
                                </div>
                                <input
                                    className="form-input"
                                    id="state"
                                    type="text"
                                    placeholder="STATE"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                    />
                            </div>
                        </div>
                        <div className = "flex-columns">
                            <div className="input-container-latitude">
                                <div className="create-spot__label">
                                <label htmlFor="latitude">Latitude</label>
                                    {errors.latitude && (
                                        <div className="errors">{errors.latitude}</div>
                                    )}
                                </div>
                                <input
                                    className="form-input"
                                    id="latitude"
                                    type="number"
                                    placeholder="Latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                    />
                            </div>
                            <div className="input-container__longitude">
                                <div className="create-spot__label">
                                    <label htmlFor="longitude">Longitude</label>
                                        {errors.longitude && (
                                            <div className="errors">{errors.longitude}</div>
                                        )}
                                </div>
                                <input
                                    className="form-input"
                                    id="longitude"
                                    type="number"
                                    placeholder="Longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                    required
                                    />
                            </div>
                        </div>
                    </div>
                    <h3>Describe your place to guests</h3>
                    <p>Mention the best features of your place, special ammenities like fast wifi or parking, and what you love about the neighborhood</p>
                        <input
                        className="form-input--textarea"
                        id="description"
                        type="textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                </form>
        </div>
    )
}
