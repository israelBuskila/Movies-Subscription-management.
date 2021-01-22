import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const submit = () => {
    let obj = {
      UserName: userName,
      Password: password,
    };
    axios.post("http://localhost:3001/createAccount", obj).then(
      (response) => {
        if (response.data == true) return history.push("/");
        else if (response.data === "User does not exist !") {
          alert(response.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <h1>Create Account</h1>
      <br />
      User Name:
      <input type="text" onChange={(e) => setUserName(e.target.value)} />
      <br />
      Password:
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <input type="button" onClick={submit} value="Create" />
      <br />
    </div>
  );
};
export default CreateAccount;
