import axios from "axios";

const User = (props) => {
  const editUser = () => {
    props.call(props.person);
  };
  const deleteUser = async () => {
    window.location.reload();
    const deleteUser = await axios.get(
      "http://localhost:3001/users/deleteUser/" + props.person.UserName
    );
  };

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
      <ul>
        {props.person.Permissions.map((x, i) => {
          return <li key={i}>{x}</li>;
        })}
      </ul>
      <input type="button" value="Edit" onClick={editUser} />
      <input type="button" value="Delete" onClick={deleteUser} />
      <br />
    </div>
  );
};
export default User;
