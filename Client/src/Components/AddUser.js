import { useState } from "react";
import axios from "axios";

const AddUser = (props) => {
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [sessionTimeOut, setSessionTimeOut] = useState();

  const [viewSubscriptions, setViewSubscriptions] = useState(false);
  const [viewMovies, setViewMovies] = useState(false);
  const [isChecked, setIsChecked] = useState({
    "Create Subscriptions": false,
    "Delete Subscriptions": false,
    "Update Subscriptions": false,
    "Create Movies": false,
    "Delete Movies": false,
    "Update Movies": false,
  });

  const save = async () => {
    let permissions = [];
    Object.keys(isChecked).map((p) => {
      console.log(p);
      if (isChecked[p]) permissions.push(p);
    });
    if (viewSubscriptions) permissions.push("View Subscriptions");
    if (viewMovies) permissions.push("View Movies");

    let obj = {
      FirstName: firstName,
      LastName: lastName,
      UserName: userName,
      SessionTimeOut: sessionTimeOut,
      Permissions: permissions,
    };
    // props.call("users");
    await axios.post("http://localhost:3001/users/addNewUser", obj);
  };

  const handleChange = ({ target: { name, checked } }) => {
    if (
      name == "Create Subscriptions" ||
      name == "Update Subscriptions" ||
      name == "Delete Subscriptions"
    )
      setViewSubscriptions(checked);
    else if (
      name == "Create Movies" ||
      name == "Delete Movies" ||
      name == "Update Movies"
    )
      setViewMovies(checked);
    setIsChecked({
      ...isChecked,
      [name]: checked,
    });
  };

  return (
    <div>
      <h3>Add New User</h3>
      First Name:{" "}
      <input
        type="text"
        onChange={(e) => setfirstName(e.target.value)}
        value={firstName}
      />
      <br />
      Last Name:{" "}
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      User Name:{" "}
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      Session Time Out:{" "}
      <input
        type="text"
        value={sessionTimeOut}
        onChange={(e) => setSessionTimeOut(e.target.value)}
      />
      <br />
      Permissions:
      <br />
      <input
        type="checkbox"
        name="View Subscriptions"
        checked={viewSubscriptions}
        onChange={(e) => setViewSubscriptions(e.target.checked)}
      />{" "}
      View Subscriptions
      <br />
      <input
        type="checkbox"
        name="Create Subscriptions"
        checked={isChecked[0]}
        onChange={handleChange}
      />{" "}
      Create Subscriptions
      <br />
      <input
        type="checkbox"
        name="Delete Subscriptions"
        checked={isChecked[1]}
        onChange={handleChange}
      />{" "}
      Delete Subscriptions
      <br />
      <input
        type="checkbox"
        name="Update Subscriptions"
        checked={isChecked[2]}
        onChange={handleChange}
      />{" "}
      Update Subscriptions
      <br />
      <input
        type="checkbox"
        name="View Movies"
        checked={viewMovies}
        onChange={(e) => setViewMovies(e.target.checked)}
      />{" "}
      View Movies
      <br />
      <input
        type="checkbox"
        name="Create Movies"
        checked={isChecked[3]}
        onChange={handleChange}
      />{" "}
      Create Movies
      <br />
      <input
        type="checkbox"
        name="Delete Movies"
        checked={isChecked[4]}
        onChange={handleChange}
      />{" "}
      Delete Movies
      <br />
      <input
        type="checkbox"
        name="Update Movies"
        checked={isChecked[5]}
        onChange={handleChange}
      />{" "}
      Update Movies
      <br />
      <input type="button" value="Save" onClick={save} />
      <input
        type="button"
        value="Cancel"
        onClick={() => props.callback("allusers")}
      />
    </div>
  );
};

export default AddUser;
