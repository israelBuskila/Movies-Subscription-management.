import { Link } from "react-router-dom";
import AddSubs from "./AddSubs";
import { useState } from "react";
import axios from "axios";

const Member = (props) => {
  const [toggle, setToggle] = useState(false);

  //button to edit member -
  const edit = () => {
    props.call(props.member);
  };

  const deleteMember = () => {
    axios.get(
      "http://localhost:3001/subscriptions/deleteMember/" +
        props.member.MemberId
    );
  };
  const moviesWathced = () => {
    return props.member.MoviesWathced.map((item, index) => {
      return (
        <li key={index}>
          <Link>{item.name}</Link>
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
      <input type="button" value="Edit" onClick={edit} />
      <input type="button" value="Delete" onClick={deleteMember} />
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
