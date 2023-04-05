import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.png'
import shortLogo from '../../images/logo-short.png'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="container">
      <li>
        <NavLink exact to="/">
          <img className="logo" src={logo} alt="logo"/>
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser}/>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
