import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerRoute = ({ children }) => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  return userInfo && userInfo.isSeller ? children : <Navigate to="/sign-in" />;
};

export default SellerRoute;
