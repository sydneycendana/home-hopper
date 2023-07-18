// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { getSpotsThunk } from "../../store/spots";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const ulRef = useRef();

  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spot.allSpots);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 55em)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = (e) => {
      setIsSmallScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    history.push("/");
    dispatch(sessionActions.logout());
  };

  const handleManageSpots = () => {
    history.push("/spots/current");
    setShowMenu(false);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-icon" onClick={openMenu}>
        <i className="fas fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello, {user.firstName}</li>
            <li>{user.email}</li>
            {sessionUser && (
              <li onClick={handleManageSpots}>
                <NavLink exact to="/spots/current">
                  Manage Spots
                </NavLink>
              </li>
            )}
            {sessionUser && isSmallScreen && (
              <li>
                <NavLink exact to="/spots/new">
                  Create a New Spot
                </NavLink>
              </li>
            )}
            <li>
              <button className="profile-dropdown__logout" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="left-align">
              <OpenModalButton
                buttonText="Log In"
                className="__login-signup"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className="left-align">
              <OpenModalButton
                buttonText="Sign Up"
                className="__login-signup"
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
