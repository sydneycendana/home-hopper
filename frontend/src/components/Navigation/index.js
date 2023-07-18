import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LogoLarge from "../../assets/images/logo.png";
import LogoSmall from "../../assets/images/small-logo.png";
import SearchBar from "./SearchBar";
import CreateSpot from "../Spots/CreateSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 35em)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const logoImage = isSmallScreen ? LogoSmall : LogoLarge;

  return (
    <ul className="container">
      <li>
        <NavLink exact to="/">
          {/* <Logo className="logo" alt="logo" /> */}
          <img src={logoImage} className="logo" alt="logo" />
        </NavLink>
      </li>
      {!isSmallScreen && (
        <li>
          <SearchBar />
        </li>
      )}
      <div className="top-right">
        {sessionUser && (
          <li className="create-navbar">
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
