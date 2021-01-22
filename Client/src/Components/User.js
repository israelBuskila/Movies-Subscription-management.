const User = (props) => {
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
      Created Data: {props.person.CreatedData}
      <br />
      Permition:
      <br />
      <input type="button" value="Edit" onClick={editUser} />
      <input type="button" value="Delete" onClick={deleteUser} />
    </div>
  );
};
export default User;
