import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../Views/Movie";

const Movies = () => {
  const [movies, setMovies] = useState();
  const [toggle, setToggle] = useState("allMovies");
  const [find, setFind] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/movies")
      .then((resp) => setMovies(resp.data));
  }, []);

  const allMovies = () => {
    if (movies)
      return movies.map((item, index) => {
        return <Movie key={index} movie={item} />;
      });
  };

  const findMovie = () => {
    if (find != undefined && toggle == "findMovie") {
      let result = movies.filter((x) => x.name == find);
      if (result.length > 0) {
        console.log(result[0]);
        return <Movie movie={result[0]} />;
      }
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <br />
      <input
        type="button"
        value="All Movies"
        onClick={() => setToggle("allMovies")}
      />
      <input
        type="button"
        value="Add movie"
        onClick={() => setToggle("addMovie")}
      />{" "}
      Find Movie:
      <input type="text" onChange={(e) => setFind(e.target.value)} />
      <input
        type="button"
        value="Find"
        onClick={() => setToggle("findMovie")}
      />
      <br />
      {toggle == "allMovies" && allMovies()}
      {toggle == "findMovie" && findMovie()}
    </div>
  );
};
export default Movies;
