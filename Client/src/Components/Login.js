import React, { useState, useEffect } from "react";

import { useHistory, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  // const submit = () => {
  //   console.log(userName);
  //   let obj = {
  //     UserName: userName,
  //     Password: password,
  //   };
  //   axios.post("http://localhost:3001/", obj).then(
  //     (response) => {
  //       if (response.data == true) {
  //         axios
  //           .post("http://localhost:3001/users/getPermissions", {
  //             userName: userName,
  //           })
  //           .then((resp) => {
  //             console.log(resp.data.Permissions);
  //             setPermissions(resp.data.Permissions);
  //             setFirstName(resp.data.FirstName);
  //           });
  //         console.log(permissions);
  //         console.log(firstName);
  //         let userInfo = {
  //           UserName: obj.UserName,
  //           FirstName: firstName,
  //           Login: true,
  //           Permissions: permissions,
  //         };
  //         sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  //         return history.push("/main");
  //       } else if (response.data === "User does not exist !") {
  //         alert(response.data);
  //         return history.push("/");
  //       } else {
  //         alert("Incorrect password !");
  //         return history.push("/");
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  const submit = async () => {
    console.log(userName);
    let obj = {
      UserName: userName,
      Password: password,
    };
    let response = await axios.post("http://localhost:3001/", obj);
    console.log(response);
    if (response.data == true) {
      let resp = await axios.post(
        "http://localhost:3001/users/getPermissions",
        {
          userName: userName,
        }
      );
      console.log(resp.data.Permissions);

      let userInfo = {
        UserName: obj.UserName,
        FirstName: resp.data.FirstName,
        Login: true,
        Permissions: resp.data.Permissions,
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
