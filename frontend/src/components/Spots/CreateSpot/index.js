import { useDispatch } from "react-redux";
import { useState } from "react";

export default function CreateSpot(){
    const dispatch = useDispatch();

    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')

    return (
        <div className="create-spot__container">
            <h1>Create a new Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guest's will only get your exact address once they booked a reservation</p>
            <div className="form">
                <form className="create-spot__form">
                    <label htmlFor="country">Country</label>
                    <input
                    className="input-long"
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                    <label htmlFor="address">Street Address</label>
                    <input
                    className="input-long"
                    id="adress"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    />
                </form>
            </div>
        </div>
    )
}
