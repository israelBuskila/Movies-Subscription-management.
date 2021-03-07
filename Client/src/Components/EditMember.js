import axios from "axios";
import { useState } from "react";

const EditMember = (props) => {
  const [name, setName] = useState(props.member.Name);
  const [email, setEmail] = useState(props.member.Email);
  const [city, setCity] = useState(props.member.City);

  const updateButton = async () => {
    let obj = {
      Id: props.member.MemberId,
      Name: name,
      Email: email,
      City: city,
    };
    await axios.post("http://localhost:3001/subscriptions/updateMember", obj);
  };
  return (
    <div>
      <h3>Members</h3>
      <h2>Edit Member: {props.member.Name}</h2>
      Name:{" "}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      Email:{" "}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      City:{" "}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <input type="button" value="update" onClick={updateButton} />
      <input type="button" value="cancel" onClick={() => props.call()} />
    </div>
  );
};
export default EditMember;
