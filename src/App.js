import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signOut } from "./redux/actions/userActions";
import { listProductCategories } from "./redux/actions/productActions";

// Component and Screen Imports below.
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchScreen from "./screens/SearchScreen";
import SearchBox from "./components/SearchBox";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [sideBarIsOpen, setSidebarIsOpen] = useState(false);

  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    error: errorLoadingCategories,
    loading: loadingCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signOut());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              amazon
            </Link>
          </div>
          <div>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>
          <div>
            <Link to="/cart">
              <i className="fa fa-shopping-cart"></i> Cart{" "}
              <strong>
                (
                {cartItems.reduce(
                  (accumulator, currentItem) => accumulator + currentItem.qty,
                  0
                )}
                )
              </strong>
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                  <li>
                    <Link to="/order-history">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={(e) => handleSignOut(e)}>
                      <i className="fa fa-sign-out"></i> Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/sign-in">
                <i className="fa fa-sign-in"></i> Sign In
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/products/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orders/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <aside className={sideBarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                type="button"
                className="close-sidebar"
                onClick={() => setSidebarIsOpen(false)}
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox />
            ) : errorLoadingCategories ? (
              <MessageBox variant="danger">{errorLoadingCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>

        <main>
          <Route path="/seller/:id" component={SellerScreen} />
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route
            path="/product/:id"
            component={ProductDetailsScreen}
            exact
          ></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <Route path="/search/name/:name?" component={SearchScreen} exact />
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          />
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          />
          <Route path="/sign-in" component={SignInScreen}></Route>
          <Route path="/sign-up" component={SignUpScreen}></Route>
          <Route path="/checkout" component={CheckoutScreen}></Route>
          <Route path="/order-history" component={OrderHistoryScreen}></Route>
          <SellerRoute path="/products/seller" component={ProductListScreen} />
          <SellerRoute path="/orders/seller" component={OrderListScreen} />
          <AdminRoute
            path="/orders"
            exact
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute path="/users" component={UserListScreen} />
          <Route path="/payment-method" component={PaymentMethodScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen} />
          <AdminRoute
            path="/products"
            exact
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute path="/dashboard" component={DashboardScreen} />
          <AdminRoute
            path="/products/pageNumber/:pageNumber"
            exact
            component={ProductListScreen}
          ></AdminRoute>
          <Route
            path="/pageNumber/:pageNumber"
            component={HomeScreen}
            exact
          ></Route>
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
