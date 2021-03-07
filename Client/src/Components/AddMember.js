import axios from "axios";
import { useState } from "react";

const AddMember = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();

  const saveButton = async () => {
    window.location.reload();
    let obj = {
      Name: name,
      Email: email,
      City: city,
    };
    await axios.post("http://localhost:3001/subscriptions/addMember", obj);
  };

  return (
    <div>
      <h2>Add New Member</h2>
      Name: <input type="text" onChange={(e) => setName(e.target.value)} />
      <br />
      Email: <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <br />
      City: <input type="text" onChange={(e) => setCity(e.target.value)} />
      <br />
      <input type="button" value="update" onClick={saveButton} />
      <input type="button" value="cancel" onClick={() => props.call()} />
    </div>
  );
};
export default AddMember;
