import { useDispatch } from "react-redux";
import { useState } from "react";

import * as spotActions from '../../../store/spots'

export default function CreateSpot(){
    const dispatch = useDispatch();

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errors, setErrors] = useState([]);

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
            <div className="form">
                <form className="create-spot__form">
                    <div>
                        <div class="create-spot__label">
                            <label htmlFor="country">Country</label>
                            {errors.country && (
                                <div className="errors">{errors.country}</div>
                            )}
                        </div>
                        <input
                        className="input-long"
                        id="country"
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Street Address</label>
                        <input
                        className="input-long"
                        id="address"
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
