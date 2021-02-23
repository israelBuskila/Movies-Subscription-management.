import Watching from "../Views/Watching";
import axios from "axios";

const Movie = (props) => {
  const premierd = () => {
    if (props.movie.premiered) return props.movie.premiered.split("-", 1);
  };

  const editMovie = () => {};

  const deleteMovie = async () => {
    window.location.reload();
    await axios.post("http://localhost:3001/movies/deleteMovie", props.movie);
  };

  return (
    <div>
      <h3>
        {props.movie.name}
        {","} {premierd()}
      </h3>
      id:{props.movie.id}
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
      <input type="button" value="Edit" onClick={editMovie} />
      <input type="button" value="Delete" onClick={deleteMovie} />
    </div>
  );
};
export default Movie;
