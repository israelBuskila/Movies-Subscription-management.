import axios from "axios";
import { useState } from "react";

const AddMovie = () => {
  const [Name, setName] = useState();
  const [Genres, setGenres] = useState();
  const [Image, setImage] = useState();
  const [Premiered, setPremiered] = useState();

  const save = async () => {
    window.location.reload();
    let obj = {
      name: Name,
      genres: Genres,
      image: { medium: Image },
      premiered: Premiered,
    };
    console.log(obj);
    await axios.post("http://localhost:3001/movies/addMovie", obj);
  };

  const cancel = () => {};
  return (
    <div>
      Name: <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      Genres: <input type="text" onChange={(e) => setGenres(e.target.value)} />
      <br />
      Image Url:{" "}
      <input type="text" onChange={(e) => setImage(e.target.value)} />
      <br />
      Premiered:{" "}
      <input type="text" onChange={(e) => setPremiered(e.target.value)} />
      <br />
      <input type="button" value="save" onClick={save} />
      <input type="button" value="cancel" onClick={cancel()} />
    </div>
  );
};
export default AddMovie;
