import { Link } from "react-router-dom";

const Member = (props) => {
  const edit = () => {};
  const deleteMember = () => {};
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

  return (
    <div>
      <h3>{props.member.Name}</h3>
      Email: {props.member.Email}
      <br />
      City: {props.member.City}
      <br />
      <input type="button" value="Edit" onClick={edit()} />
      <input type="button" value="Delete" onClick={deleteMember()} />
      <h3>Movies Watched</h3>
      <input type="button" value="Subscription to new movie" />
      <ul>{moviesWathced()}</ul>
    </div>
  );
};
export default Member;
