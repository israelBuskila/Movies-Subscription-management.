import { useEffect, useState, useStste } from "react";

import axios from "axios";
import User from "./User";
import EditUser from "./EditUser";
import AddUser from "./AddUser";

const ManageUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState("allusers");
  const [mainToggle, setMainToggle] = useState("users");
  const [editUser, setEditUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((resp) => setUsers(resp.data));
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

  const allUsers = users.map((item) => {
    return (
      <User
        call={(user) => toggleEditUsers(user)}
        person={item}
        key={item._id}
      />
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
