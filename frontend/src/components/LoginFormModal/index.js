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

  }

  return (

    <>
      <h1 className="centered">Log In</h1>
      <form onSubmit={handleSubmit}>
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
            {errors.map((error, idx) => <ul className="errors"> <li key={idx}>{error}</li> </ul>)}
            <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
