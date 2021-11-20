import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailUser, updateUserDetails } from "../redux/actions/userActions";
import { USER_DETAILS_UPDATE_RESET } from "../redux/constants/userConstants";

// Component Imports.
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userDetailsUpdate = useSelector((state) => state.userDetailsUpdate);
  const {
    error: updateError,
    loading: loadingUpdate,
    success: updateSuccess,
  } = userDetailsUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_DETAILS_UPDATE_RESET });
      dispatch(detailUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user, userInfo._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password fields don't match");
    } else {
      dispatch(updateUserDetails({ userId: user._id, name, email, password }));
    }
  };

  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>Your Profile</h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox />}
            {updateError && <MessageBox variant="danger">{error}</MessageBox>}
            {updateSuccess && (
              <MessageBox variant="success">
                Profile details updated.
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                id="confirmPassword"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                <i className="fa fa-save"></i> Save Changes
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
