import Watching from "../Pages/Watching";
import axios from "axios";

const Movie = (props) => {
  const premierd = () => {
    if (props.movie.premiered) return props.movie.premiered.split("-", 1);
  };

  const showEditButton = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "updateMovies");
    if (permission.length > 0)
      return <input type="button" value="Edit" onClick={editMovie} />;
  };

  const editMovie = () => {
    props.call(props.movie);
  };

  const shoeDeleteButton = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "deleteMovies");
    if (permission.length > 0)
      return <input type="button" value="Delete" onClick={deleteMovie} />;
  };

  const deleteMovie = async () => {
    window.location.href = "/movies";
    await axios.post("http://localhost:3001/movies/deleteMovie", props.movie);
  };

  return (
    <div>
      <h3>
        {props.movie.name}
        {","} {premierd()}
      </h3>
      <br />
      genres: {props.movie.genres.toString()}
      <br />
      <img
        src={props.movie.image.medium}
        alt="alternatetext"
        width="128"
        height="128"
      />
      <Watching w={props.movie.watchMovie} />
      <br />
      {showEditButton()}
      {shoeDeleteButton()}
    </div>
  );
};
export default Movie;
