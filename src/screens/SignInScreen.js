import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/actions/userActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Sign In</h1>
        </div>

        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit" className="primary">
            <i className="fa fa-sign-in"></i> Sign In
          </button>
        </div>

        <div>
          <label></label>
          <div>
            New Customer? <Link to="signup">Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
