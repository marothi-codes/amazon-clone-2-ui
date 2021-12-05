import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/actions/userActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignUpScreen(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const userSignUp = useSelector((state) => state.userSignUp);
  const { userInfo, loading, error } = userSignUp;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
    } else {
      dispatch(signUp(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>Sign Up for an Amazon Account</h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        {/* Name Field */}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        {/* Passord Confirm Field */}
        <div>
          <label htmlFor="passwordConfirm">Password Confirm:</label>
          <input
            type="password"
            id="passwordConfirm"
            required
            onChange={(e) => setPasswordConfirm(e.target.value)}
          ></input>
        </div>

        {/* Submit Button */}
        <div>
          <label />
          <button className="primary" type="submit">
            <i className="fa fa-sign-up"></i> Sign Up
          </button>
        </div>

        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={`/sign-in?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
