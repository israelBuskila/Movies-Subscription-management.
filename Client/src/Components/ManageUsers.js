import { useEffect, useState, useStste } from "react";

import axios from "axios";
import User from "./User";

const ManageUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState("allusers");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((resp) => setUsers(resp.data));
  }, []);

  const allUsers = users.map((item) => {
    return (
      <User
        call={(user) => props.callback(user)}
        person={item}
        key={item._id}
      />
    );
  });

  const addUser = () => {
    setToggle("adduser");
  };

  return (
    <div>
      <h2>Users</h2>

      <input
        type="button"
        value="All Users"
        onClick={() => setToggle("allusers")}
      />
      <input type="button" value="Add User" onClick={addUser} />
      <br />
      <br />
      {toggle == "allusers" && allUsers}
      {toggle == "adduser" && addUser}
    </div>
  );
};
export default ManageUsers;
