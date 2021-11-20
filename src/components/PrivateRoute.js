import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
}
