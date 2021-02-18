import { Link } from "react-router-dom";
const Watching = (props) => {
  return (
    <div>
      Subscriptions watched:
      <ul>
        {props.w.map((item, index) => {
          return (
            <li key={index}>
              <Link to="">{item.memberName}</Link>
              {", "}
              {item.date}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Watching;
