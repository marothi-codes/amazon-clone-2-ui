import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./redux/actions/userActions";

import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import SignInScreen from "./screens/SignInScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazon
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart ({cartItems.length})
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={(e) => handleSignOut(e)}>
                      <i className="fa fa-sign-out"></i> Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <i className="fa fa-sign-in"></i> Sign In
              </Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductDetailsScreen}></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          Copyright &copy; Marothi Codes Inc. {new Date().getFullYear()} | All
          Rights Reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
