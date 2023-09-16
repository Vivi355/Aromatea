import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});



  useEffect(() => {
    const errObj = {};

    if (firstName && (firstName.length < 3 || firstName.length > 50)) errObj.firstName = "First name must be between 3 and 50 characters";
    if (lastName && (lastName.length < 3 || lastName.length > 50)) errObj.lastName = "Last name must be at least 3 characters long";
    if (password && password.length < 6) errObj.password = "Password must be at least 6 characters long";
    if (confirmPassword && confirmPassword !== password) errObj.confirmPassword = "Password and Confirm Password fields must match";

    setErrors(errObj)
  }, [firstName, lastName, password, confirmPassword])


  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // valid email
    const okEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!okEmail.test(email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'The provided email is invalid'
      }))
      return
    }

    if (password === confirmPassword) {
        const data = await dispatch(signUp(firstName, lastName, email, password));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="signup-form">
      <div className="signup-title">Sign Up</div>
        <div className="signup-error">
          {Object.values(errors).map((error, idx) => <div key={idx}>{error}</div>)}
        </div>

        <div id="signup-container">

          <label className="required">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
            />
          </label>

          <label className="required">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </label>

          <label className="required">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </label>
          {/* <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label> */}
          <label className="required">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>

          <label className="required">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </label>

          <button type="submit" className="signup-btn">SIGN UP</button>
          <div className="go-create">
            ALREADY HAVE AN ACCOUNT?
            <NavLink to="/login">
              LOG IN
            </NavLink>
          </div>
        </div>

      </form>
    </>
  );
}

export default SignupFormPage;
