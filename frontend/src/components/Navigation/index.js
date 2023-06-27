import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import Logo from "../../assets/images/logo.png";
import SearchBar from "./SearchBar";
import CreateSpot from "../Spots/CreateSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="container">
      <li>
        <NavLink exact to="/">
          {/* <Logo className="logo" alt="logo" /> */}
          <img src={Logo} className="logo" alt="logo" />
        </NavLink>
      </li>
      <li>
        <SearchBar />
      </li>
      <div className="top-right">
        {sessionUser && (
          <li>
            <NavLink exact to="/spots/new">
              Create a New Spot
            </NavLink>
          </li>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
