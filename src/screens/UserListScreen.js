import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../redux/actions/userActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../redux/constants/userConstants";

export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    error: userDeletionError,
    loading: deletingUser,
    success: userDeleted,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch, userDeleted]);

  const handleUserDeletion = (user) => {
    if (window.confirm(`Delete user: ${user.name}?`)) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {deletingUser && <LoadingBox />}
      {userDeletionError && (
        <>
          <MessageBox variant="danger">{userDeletionError}</MessageBox>
          <br />
        </>
      )}
      {userDeleted && (
        <>
          <MessageBox variant="success">User successfully deleted</MessageBox>
          <br />
        </>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS SELLER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? "Yes" : "No"}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    <i className="fa fa-pencil"></i> Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => handleUserDeletion(user)}
                  >
                    <i className="fa fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
