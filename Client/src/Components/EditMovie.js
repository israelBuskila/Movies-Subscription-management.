import axios from "axios";
import { useState } from "react";

const EditMovie = (props) => {
  const [Name, setName] = useState(props.movie.name);
  const [Genres, setGenres] = useState(props.movie.genres);
  const [Image, setImage] = useState(props.movie.image.medium);
  const [Premiered, setPremiered] = useState(props.movie.premiered);

  const save = async () => {
    window.location.reload();
    let obj = {
      id: props.movie.id,
      name: Name,
      genres: Genres,
      image: { medium: Image },
      premiered: Premiered,
    };
    console.log(obj);
    await axios.post("http://localhost:3001/movies/editMovie", obj);
  };

  return (
    <div>
      <h3>Movies</h3>
      <h3>Edit Movie: {props.movie.name}</h3>
      Name:{" "}
      <input
        type="text"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Genres:{" "}
      <input
        type="text"
        value={Genres}
        onChange={(e) => setGenres(e.target.value)}
      />
      <br />
      Image Url:{" "}
      <input
        type="text"
        value={Image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      Premiered:{" "}
      <input
        type="text"
        value={Premiered}
        onChange={(e) => setPremiered(e.target.value)}
      />
      <br />
      <input type="button" value="save" onClick={save} />
      <input type="button" value="cancel" onClick={() => props.callback()} />
    </div>
  );
};
export default EditMovie;
