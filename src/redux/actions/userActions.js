import axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants";
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  USER_SIGN_OUT,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_FAILURE,
  USER_SIGN_UP_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_FAILURE,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAILURE,
  USER_LIST_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAILURE,
  USER_DELETE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAILURE,
} from "../constants/userConstants";

export const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_IN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/sign-in", {
      email,
      password,
    });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: CART_EMPTY });
  dispatch({ type: USER_SIGN_OUT });
};

export const signUp = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGN_UP_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post("/api/users/sign-up", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_SIGN_UP_SUCCESS, payload: data }); // Register the new user.
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data }); // Log the user in once registered.
  } catch (error) {
    dispatch({
      type: USER_SIGN_UP_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailUser = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: id });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_UPDATE_REQUEST, payload: user });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/profile/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAILURE,
      payload:
        err.response.data.message && err.response
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST, payload: user });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(`/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload:
        err.response.data.message && err.response
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({ type: USER_DELETE_REQUEST, payload: id });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        err.response.data.message && err.response
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listTopSellers = () => async (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });
  try {
    const { data } = await axios.get("/api/users/top-sellers");
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_TOPSELLERS_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
