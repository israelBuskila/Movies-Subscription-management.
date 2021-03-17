import { Link } from "react-router-dom";
import AddSubs from "./AddSubs";
import { useState } from "react";
import axios from "axios";

const Member = (props) => {
  const [toggle, setToggle] = useState(false);

  const showEditButton = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "updateSubscriptions");
    if (permission.length > 0)
      return <input type="button" value="Edit" onClick={edit} />;
  };

  //button to edit member -
  const edit = () => {
    props.call(props.member);
  };

  const showDeleteButton = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "deleteSubscriptions");
    if (permission.length > 0)
      return <input type="button" value="Delete" onClick={deleteMember} />;
  };

  const deleteMember = () => {
    window.location.reload();
    axios.get(
      "http://localhost:3001/subscriptions/deleteMember/" +
        props.member.MemberId
    );
  };
  const moviesWathced = () => {
    return props.member.MoviesWathced.map((item, index) => {
      return (
        <li key={index}>
          <Link to={{ pathname: "/movies", state: { item } }}>{item.name}</Link>
          {", "}
          {item.date}
        </li>
      );
    });
  };

  const addSubs = () => {
    return <AddSubs member={props.member} />;
  };

  return (
    <div>
      <h3>{props.member.Name}</h3>
      Email: {props.member.Email}
      <br />
      City: {props.member.City}
      <br />
      {showEditButton()}
      {showDeleteButton()}
      <h3>Movies Watched</h3>
      <input
        type="button"
        value="Subscription to new movie"
        onClick={() => setToggle(!toggle)}
      />
      {toggle == true && addSubs()}
      <ul>{moviesWathced()}</ul>
    </div>
  );
};
export default Member;
