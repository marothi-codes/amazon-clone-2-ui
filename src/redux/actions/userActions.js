import axios from "axios";
import {
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAILURE,
  USER_SIGN_OUT,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_FAILURE,
  USER_SIGN_UP_SUCCESS,
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
