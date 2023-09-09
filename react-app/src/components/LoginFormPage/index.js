import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session"
import { useHistory } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  if (sessionUser) return <Redirect to="/" />;

  const loginDemoUser = () => {
    const email = 'demo@aa.io'
    const password = 'password'
    return dispatch(sessionActions.login(email, password))
      .then(() => history.push('/products/all'))
      .catch(async (res) => {
            const data = await res.json();
          });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="login-form">
      <h1>Account Login</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div id="login-container">
          <label className="required">
            {/* Email */}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
          <label className="required">
            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>

          <button type="submit">Log In</button>

          <div>
            <NavLink to="/signup">
              Create an Account
            </NavLink>
          </div>
          <button id="demo" onClick={loginDemoUser}>
            Demo User
          </button>

        </div>
      </form>
    </>
  );
}

export default LoginFormPage;
