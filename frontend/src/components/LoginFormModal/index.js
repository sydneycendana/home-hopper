import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors(["The provided credentials were invalid."])
          setCredential('')
          setPassword('')
      };
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(
      sessionActions.login({
        credential: "mnorms123",
        password: "mypassword",
      })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

    const isSubmitDisabled = () => {
    return credential.length < 4 || password.length < 6;
  }

  return (

    <>
      <h1 className="centered">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="errors-list">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
              <input
                type="text"
                value={credential}
                placeholder="Email or Username"
                onChange={(e) => setCredential(e.target.value)}
                required
              />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            <button type="submit" className="submit-form__button" disabled={isSubmitDisabled()}>Log In</button>
            <button onClick={demoUser} type="submit" className="demoLogin">Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
