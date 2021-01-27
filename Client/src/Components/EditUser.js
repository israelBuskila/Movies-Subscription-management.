import { useState } from "react";
import axios from "axios";

function EditUser(props) {
  const [firstName, setfirstName] = useState(props.user.FirstName);
  const [lastName, setLastName] = useState(props.user.LastName);
  const [userName, setUserName] = useState(props.user.UserName);
  const [sessionTimeOut, setSessionTimeOut] = useState(
    props.user.SessionTimeOut
  );

  const [viewSubscriptions, setViewSubscriptions] = useState(false);
  const [viewMovies, setViewMovies] = useState(false);
  const [isChecked, setIsChecked] = useState({
    createSubscriptions: false,
    deleteSubscriptions: false,
    updateSubscriptions: false,
    createMovies: false,
    deleteMovies: false,
    updateMovies: false,
  });

  const handleChange = ({ target: { name, checked } }) => {
    if (
      name == "createSubscriptions" ||
      name == "updateSubscriptions" ||
      name == "deleteSubscriptions"
    )
      setViewSubscriptions(checked);
    else if (
      name == "createMovies" ||
      name == "deleteMovies" ||
      name == "updateMovies"
    )
      setViewMovies(checked);
    setIsChecked({
      ...isChecked,
      [name]: checked,
    });
  };

  const update = async () => {
    let permissions = [];
    Object.keys(isChecked).map((p) => {
      permissions.push({ [p]: isChecked[p] });
    });
    permissions.push({ viewSubscriptions: viewSubscriptions });
    permissions.push({ viewMovies: viewMovies });

    let obj = {
      Id: props.user.Id,
      FirstName: firstName,
      LastName: lastName,
      UserName: userName,
      CreatedDate: props.user.CreatedDate,
      SessionTimeOut: parseInt(sessionTimeOut),
      Permissions: permissions,
    };
    props.call("users");
    await axios.post("http://localhost:3001/users/editUser", obj);
  };

  return (
    <div>
      <h3>
        Edit User: {props.user.FirstName} {props.user.LastName}
      </h3>
      <br />
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
      Created Data: {props.user.CreatedDate}
      <br />
      Permissions:
      <br />
      <input
        type="checkbox"
        name="viewSubscriptions"
        checked={viewSubscriptions}
        onChange={(e) => setViewSubscriptions(e.target.checked)}
      />{" "}
      View Subscriptions
      <br />
      <input
        type="checkbox"
        name="createSubscriptions"
        checked={isChecked[0]}
        onChange={handleChange}
      />{" "}
      Create Subscriptions
      <br />
      <input
        type="checkbox"
        name="deleteSubscriptions"
        checked={isChecked[1]}
        onChange={handleChange}
      />{" "}
      Delete Subscriptions
      <br />
      <input
        type="checkbox"
        name="updateSubscriptions"
        checked={isChecked[2]}
        onChange={handleChange}
      />{" "}
      Update Subscriptions
      <br />
      <input
        type="checkbox"
        name="viewMovies"
        checked={viewMovies}
        onChange={(e) => setViewMovies(e.target.checked)}
      />{" "}
      View Movies
      <br />
      <input
        type="checkbox"
        name="createMovies"
        checked={isChecked[3]}
        onChange={handleChange}
      />{" "}
      Create Movies
      <br />
      <input
        type="checkbox"
        name="deleteMovies"
        checked={isChecked[4]}
        onChange={handleChange}
      />{" "}
      Delete Movies
      <br />
      <input
        type="checkbox"
        name="updateMovies"
        checked={isChecked[5]}
        onChange={handleChange}
      />{" "}
      Update Movies
      <br />
      <input type="button" value="Update" onClick={update} />
      <input type="button" value="Cancel" onClick={() => props.call("users")} />
    </div>
  );
}

export default EditUser;
