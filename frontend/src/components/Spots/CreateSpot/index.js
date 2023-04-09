import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import * as spotActions from '../../../store/spots'
import './CreateSpot.css'

export default function CreateSpot(){
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')

    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to={'/'} />

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const spot = dispatch(
        spotActions.createSpotThunk(
            {
              name,
              description,
              price,
              address,
              city,
              state,
              country,
              lat,
              lng
            },
            {
              url: previewImage,
              preview: true,
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
                    <div className="section">
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
                                <label htmlFor="lat">Latitude</label>
                                    {errors.lat && (
                                        <div className="errors">{errors.lat}</div>
                                    )}
                                </div>
                                <input
                                    className="form-input"
                                    id="lat"
                                    type="number"
                                    placeholder="Latitude"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    />
                            </div>
                            <div className="input-container__longitude">
                                <div className="create-spot__label">
                                    <label htmlFor="lng">Longitude</label>
                                        {errors.lng && (
                                            <div className="errors">{errors.lng}</div>
                                        )}
                                </div>
                                <input
                                    className="form-input"
                                    id="lng"
                                    type="number"
                                    placeholder="Longitude"
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                    required
                                    />
                            </div>
                        </div>
                    </div>
                    <div class="section">
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your place, special ammenities like fast wifi or parking, and what you love about the neighborhood</p>
                            <div className="input-container__textarea">
                                <input
                                className="form-input__textarea"
                                id="description"
                                type="textarea"
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                />
                            </div>
                    </div>
                    <div class="section">
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                        className="form-input"
                        id="name"
                        type="text"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={(e) => setName(e.targevalue)}
                        required
                        />
                    </div>
                    <div class="section">
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <div className="flex-columns">
                            <span>$</span>
                            <input
                            className="form-input"
                            id="price"
                            type="text"
                            placeholder="Price per night (USD)"
                            value={price}
                            onChange={(e) => setPrice(e.targevalue)}
                            required
                            />
                        </div>
                    </div>
                    <div class="section">
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot</p>
                            <input
                            className="form-input"
                            id="previewImage"
                            type="text"
                            placeholder="Preview Image URL"
                            value={previewImage}
                            onChange={(e) => setPreviewImage(e.targevalue)}
                            required
                            />
                            <input
                            className="form-input"
                            id="image1"
                            type="text"
                            placeholder="Image URL"
                            value={image1}
                            onChange={(e) => setImage1(e.targevalue)}
                            />
                            <input
                            className="form-input"
                            id="image2"
                            type="text"
                            placeholder="Image URL"
                            value={image2}
                            onChange={(e) => setImage2(e.targevalue)}
                            />
                            <input
                            className="form-input"
                            id="image3"
                            type="text"
                            placeholder="Image URL"
                            value={image3}
                            onChange={(e) => setImage3(e.targevalue)}
                            />
                            <input
                            className="form-input"
                            id="image4"
                            type="text"
                            placeholder="Image URL"
                            value={image4}
                            onChange={(e) => setImage4(e.targevalue)}
                            />
                    </div>
                    <button
                    type="submit"
                    onSubmit={handleSubmit}
                    >Create Spot</button>

                </form>
        </div>
    )
}
