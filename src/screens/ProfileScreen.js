import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailUser } from "../redux/actions/userActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProfileScreen() {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Update User Profile.
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
            <div>
              <label htmlFor="name">Name:</label>
              <input id="name" type="text" value={user.name}></input>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" value={user.email}></input>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input id="password" type="password"></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input id="confirmPassword" type="password"></input>
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
