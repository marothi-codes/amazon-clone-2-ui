import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_HISTORY_LIST_REQUEST,
  ORDER_HISTORY_LIST_FAILURE,
  ORDER_HISTORY_LIST_SUCCESS,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAYMENT_FAILURE,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
} from "../constants/orderConstants";

export const placeOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    const { data } = await axios.post("/api/orders", order, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailOrder = (id) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, playload: id });
  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(`/api/orders/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_PAYMENT_REQUEST,
      payload: { order, paymentResult },
    });

    const {
      userSignIn: { userInfo },
    } = getState();

    try {
      const { data } = axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PAYMENT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: ORDER_PAYMENT_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listOrderHistory = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_HISTORY_LIST_REQUEST });

  const {
    userSignIn: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get("/api/orders/history", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_HISTORY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: ORDER_HISTORY_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
