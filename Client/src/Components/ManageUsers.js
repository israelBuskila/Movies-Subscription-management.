import { useEffect, useState } from "react";

import axios from "axios";
import User from "../Views/User";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
import { useHistory } from "react-router-dom";

const ManageUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState("allusers");
  const [mainToggle, setMainToggle] = useState("users");
  const [editUser, setEditUser] = useState();

  let history = useHistory();

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userInfo"))) {
      if (JSON.parse(sessionStorage.getItem("userInfo")).Login == true) {
        axios
          .get("http://localhost:3001/users")
          .then((resp) => setUsers(resp.data));
      }
    } else {
      return history.push("/");
    }
  }, []);

  const showButtons = () => {
    if (mainToggle == "users")
      return (
        <div>
          <input
            type="button"
            value="All Users"
            onClick={() => setToggle("allusers")}
          />
          <input type="button" value="Add User" onClick={addUser} />
          <br />
          <br />
          {toggle == "allusers" && allUsers}
          {toggle == "adduser" && (
            <AddUser
              callback={(cancel) => {
                if (cancel == "allusers") setToggle("allusers");
              }}
            />
          )}
        </div>
      );
  };

  const allUsers = users.map((item, index) => {
    return (
      <User call={(user) => toggleEditUsers(user)} person={item} key={index} />
    );
  });

  const addUser = () => {
    setToggle("adduser");
  };

  const toggleEditUsers = (user) => {
    if (user !== undefined) {
      setEditUser(user);
      setMainToggle("edituser");
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {showButtons()}
      {mainToggle == "edituser" && (
        <EditUser
          call={(cancel) => {
            if (cancel == "users") setMainToggle("users");
          }}
          user={editUser}
        />
      )}
    </div>
  );
};
export default ManageUsers;
