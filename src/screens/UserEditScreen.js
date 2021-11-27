import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailUser, updateUser } from "../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: userUpdateError,
    loading: updatingUser,
    success: userUpdated,
  } = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userUpdated) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/users");
    }
    if (!user) {
      dispatch(detailUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsSeller(user.isSeller);
    }
  }, [dispatch, props.history, userUpdated, userId, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };

  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h1>Updating {name}'s Profile</h1>
          {updatingUser && <LoadingBox />}
          {userUpdateError && (
            <MessageBox variant="error">{userUpdateError}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="isAdmin">Is Admin?</label>
              <input
                type="checkbox"
                name="isAdmin"
                id="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>

            <div>
              <label htmlFor="isSeller">Is Seller?</label>
              <input
                type="checkbox"
                name="isSeller"
                id="isSeller"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>

            <div>
              <button type="submit" className="primary">
                <i className="fa fa-save"></i> Save Changes
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
