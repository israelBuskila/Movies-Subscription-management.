import { useState, useEffect } from "react";
import axios from "axios";
import Movie from "../Pages/Movie";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import { useHistory } from "react-router-dom";

const Movies = (props) => {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [toggle, setToggle] = useState("allMovies");
  const [find, setFind] = useState();
  const history = useHistory();

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userInfo"))) {
      let permission = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).Permissions.filter((x) => x == "View Movies");
      if (
        JSON.parse(sessionStorage.getItem("userInfo")).Login == true &&
        permission.length > 0
      ) {
        axios
          .get("http://localhost:3001/movies")
          .then((resp) => setMovies(resp.data));
        if (props.location !== undefined) {
          setToggle("movieLink");
        }
      }
    } else return history.push("/");
  }, []);

  const allMovies = () => {
    if (movies) {
      return movies.map((item, index) => {
        return (
          <Movie
            key={index}
            movie={item}
            call={(mc) => {
              toggleEditMovie(mc);
            }}
          />
        );
      });
    }
  };

  const addMovie = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "createMovies");
    if (permission.length > 0)
      return <AddMovie callback={() => setToggle("allMovies")} />;
  };

  const findButton = () => {
    return (
      <div>
        Find Button:{" "}
        <input type="text" onChange={(e) => setFind(e.target.value)} />
        <input
          type="button"
          value="Find"
          onClick={() => setToggle("findMovie")}
        />
      </div>
    );
  };

  const findMovie = () => {
    if (find != undefined && toggle == "findMovie") {
      let result = movies.filter((x) => x.name == find);
      if (result.length > 0) {
        console.log(result[0]);
        return (
          <Movie
            movie={result[0]}
            call={(mc) => {
              toggleEditMovie(mc);
            }}
          />
        );
      }
    }
  };

  const toggleEditMovie = (m) => {
    if (m !== undefined) {
      setMovie(m);
      setToggle("editMovie");
    }
  };
  const editMovie = () => {
    return (
      <EditMovie
        movie={movie}
        callback={() => setToggle("allMovies")}
      ></EditMovie>
    );
  };

  const movieFromLink = () => {
    if (movies) {
      let result = movies.filter(
        (x) => x.name == props.location.state.item.name
      );
      if (result.length > 0) {
        return (
          <Movie
            movie={result[0]}
            call={(mc) => {
              toggleEditMovie(mc);
            }}
          />
        );
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
      {toggle == "allMovies" && findButton()}
      <br />
      {toggle == "allMovies" && allMovies()}
      {toggle == "findMovie" && findMovie()}
      <br />
      {toggle == "addMovie" && addMovie()}
      {toggle == "editMovie" && editMovie()}
      {toggle == "movieLink" && movieFromLink()}
    </div>
  );
};
export default Movies;
