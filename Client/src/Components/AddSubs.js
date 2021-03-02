import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState, useEffect } from "react";
import axios from "axios";

const AddSubs = (props) => {
  const [date, setDate] = useState();
  const [movies, setMovies] = useState();
  const [choice, setChoice] = useState();

  useEffect(() => {
    axios
      .post(
        "http://localhost:3001/subscriptions/subMovies",
        props.member.MoviesWathced
      )
      .then((resp) => setMovies(resp.data));
  }, []);

  const subscribe = () => {};

  return (
    <div>
      <h4>Add a new movie</h4>
      <Dropdown
        options={movies}
        placeholder="Select an option"
        onChange={(movies) => setChoice(movies)}
      />
      <input type="text" onChange={(e) => setDate(e.target.value)} />
      <br />
      <input type="button" value="Subscribe" onClick={subscribe()} />
      <h1>{choice}</h1>
    </div>
  );
};
export default AddSubs;
