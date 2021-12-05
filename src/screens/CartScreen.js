import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    if (userInfo) navigate("/checkout");
    else navigate(`/sign-in?redirect=checkout`);
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            The cart is empty.{" "}
            <Link to="/">
              Start Shopping <i className="fa fa-shopping-cart"></i>
            </Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>R{item.price.toFixed(2)}</div>
                  <div>
                    <button
                      type="button"
                      onClick={(event) => handleRemoveFromCart(item.product)}
                    >
                      <i className="fa fa-trash-o"></i> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, currentItem) => accumulator + currentItem.qty,
                  0
                )}{" "}
                items) : R
                {cartItems.reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.price * currentItem.qty,
                  0
                )}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCheckout}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
            <li>
              <Link to="/">
                <button className="block">
                  <i className="fa fa-back"></i> Keep Shopping
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
