import { useState, useEffect } from "react";
import axios from "axios";

const User = (props) => {
  const [permissions, setPermissions] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/permissions/" + props.person.Id)
      .then((resp) => setPermissions(resp.data));
  }, []);

  const editUser = () => {
    props.call(props.person);
  };
  const deleteUser = () => {};

  return (
    <div>
      Name: {props.person.FirstName} {props.person.LastName}
      <br />
      User Name: {props.person.UserName}
      <br />
      Session time out (Minutes): {props.person.SessionTimeOut}
      <br />
      Created Data: {props.person.CreatedDate}
      <br />
      Permissions:
      <br />
      <input type="button" value="Edit" onClick={editUser} />
      <input type="button" value="Delete" onClick={deleteUser} />
    </div>
  );
};
export default User;
