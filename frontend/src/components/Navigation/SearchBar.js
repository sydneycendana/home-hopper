import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Navigation.css";

function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spot.allSpots);
  const spotsArr = Object.values(spots);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSpotClick = (spotId) => {
    setSearchTerm("");
    history.push(`/spots/${spotId}`);
  };

  const filteredSpots = spotsArr.filter((spot) => {
    const { city, state, country } = spot;
    const search = searchTerm.toLowerCase();
    return (
      city.toLowerCase().includes(search) ||
      state.toLowerCase().includes(search) ||
      country.toLowerCase().includes(search)
    );
  });

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Anywhere | City | State | Country"
      />
      {searchTerm && filteredSpots.length > 0 && (
        <div className="search-results">
          {filteredSpots.slice(0, 5).map((spot) => (
            <div
              key={spot.id}
              onClick={() => handleSpotClick(spot.id)}
              style={{ cursor: "pointer" }}
              className="search-result"
            >
              <img src={spot.previewImage} alt="Spot Preview"></img>
              <div className="spot-info">
                <h5>{spot.name}</h5>
                <p>{spot.address}</p>
                <p>
                  {spot.city}, {spot.state}, {spot.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
