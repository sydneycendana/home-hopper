import React, { useState } from 'react';
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
        if (data && data.message) setErrors([data.message]);
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
            <button type="submit" className="submit-form__button">Log In</button>
            <button onClick={demoUser} type="submit" className="demoLogin">Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
