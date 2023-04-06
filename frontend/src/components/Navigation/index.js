import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import {ReactComponent as Logo} from '../../assets/images/logo.svg'



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="container">
      <li>
        <NavLink exact to="/">
          <Logo className="logo" alt="logo"/>
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
