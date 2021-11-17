import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placeOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";

import Checkout from "../components/Checkout";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) props.history.push("/payment-method");

  const toDecimal = (number) => Number(number.toFixed(2));
  const orderPlacement = useSelector((state) => state.orderPlacement);
  const { error, loading, order, success } = orderPlacement;

  cart.itemsPrice = toDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 450 ? toDecimal(0) : toDecimal(50); // Shipping costs are condtional based on cart total.
  cart.taxPrice = toDecimal(0.15 * cart.itemsPrice); // VAT (Value Added Tax @ 15%).
  cart.total = cart.itemsPrice + cart.shippingPrice + cart.taxPrice; // The Cart Total.

  const dispatch = useDispatch();

  const handleOrderPlacement = (e) => {
    e.preventDefault();
    dispatch(placeOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) props.history.push(`/order/${order._id}`);
    dispatch({ type: ORDER_CREATE_RESET });
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <Checkout step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x R{item.price} = R{item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        {/* Order Summary */}
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>R{cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>R{cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>R{cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>R{cart.total.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={(e) => handleOrderPlacement(e)}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
