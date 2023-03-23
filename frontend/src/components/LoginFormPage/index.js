import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);


  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setCredential("");
    setPassword("");
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        console.log("data ------>", data)
        if (data && data.message) setErrors([data.message]);
      });

  }

  return (
    <form className="form" onSubmit={handleSubmit}>
        <h1>
            Login
        </h1>
          <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label className="form-input">
            <input
              type="text"
              value={credential}
              placeholder="Email or Username"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label className="form-input">
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="button" type="submit">Log In</button>
    </form>
  );
}

export default LoginFormPage;
