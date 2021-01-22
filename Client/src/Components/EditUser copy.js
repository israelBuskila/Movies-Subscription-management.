import { useState } from "react";
import axios from "axios";

function EditUser(props) {
  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [sessionTimeOut, setSessionTimeOut] = useState();

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
    console.log(isChecked);
  };

  const update = () => {
    let permitions = [];

    let obj = {
      Id: props.user.Id,
      FirstName: firstName,
      LastName: lastName,
      UserName: userName,
      SessionTimeOut: sessionTimeOut,
    };
    axios.put("http://localhost:3001/editUser", obj);
  };

  return (
    <div>
      <h2>Users</h2>
      <h3>
        Edit User: {props.user.FirstName} {props.user.LastName}
      </h3>
      <br />
      First Name:{" "}
      <input
        type="text"
        value={props.user.FirstName}
        onChange={(e) => setfirstName(e)}
      />
      <br />
      Last Name:{" "}
      <input
        type="text"
        value={props.user.LasttName}
        onChange={(e) => setLastName(e)}
      />
      <br />
      User Name:{" "}
      <input
        type="text"
        value={props.user.UserName}
        onChange={(e) => setUserName(e)}
      />
      <br />
      Session Time Out:{" "}
      <input
        type="text"
        value={props.user.SessionTimeOut}
        onChange={(e) => setSessionTimeOut(e)}
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
      <input type="button" value="Cancel" />
    </div>
  );
}

export default EditUser;
