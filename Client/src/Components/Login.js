import React, { useState, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [permissions, setPermissions] = useState();

  let history = useHistory();

  const submit = () => {
    console.log(userName);
    let obj = {
      UserName: userName,
      Password: password,
    };
    axios.post("http://localhost:3001/", obj).then(
      (response) => {
        if (response.data == true) {
          axios
            .post("http://localhost:3001/users/getPermissions", {
              userName: userName,
            })
            .then((resp) => {
              console.log(resp);
              setPermissions(resp);
            });

          let userInfo = {
            UserName: obj.UserName,
            Login: true,
            Permissions: permissions,
          };
          sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
          return history.push("/main");
        } else if (response.data === "User does not exist !") {
          alert(response.data);
          return history.push("/");
        } else {
          alert("Incorrect password !");
          return history.push("/");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div>
      <h1>Log in Page</h1>
      <br />
      User Name:
      <input type="text" onChange={(e) => setUserName(e.target.value)} />
      <br />
      Password:
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <input type="button" onClick={submit} value="Login" />
      <br />
      New User?: <Link to={"/createAccount"}> Create Account</Link>
      <br />
    </div>
  );
}

export default Login;
