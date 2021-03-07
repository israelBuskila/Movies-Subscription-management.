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

  const options = () => {
    if (movies) {
      return movies.map((option, index) => {
        return (
          <option value={option._id} key={index}>
            {option.name}
          </option>
        );
      });
    }
  };

  const subscribe = async () => {
    // if (choice == "0") {
    //   setChoice(movies[0]._id);
    //   console.log(choice);
    // }
    window.location.reload();
    let obj = {
      MemberId: props.member.MemberId,
      Movie: { movieId: choice, date: date },
    };
    console.log(obj);
    let resp = await axios.post(
      "http://localhost:3001/subscriptions/addSub",
      obj
    );
  };

  return (
    <div>
      <h4>Add a new movie</h4>

      <select onChange={(e) => setChoice(e.target.value)}>
        <option value="" disabled selected>
          Select Movie
        </option>
        {options()}
      </select>

      <input type="text" onChange={(e) => setDate(e.target.value)} />
      <br />
      <input type="button" value="Subscribe" onClick={() => subscribe()} />
      {choice}
    </div>
  );
};
export default AddSubs;
