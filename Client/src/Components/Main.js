import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import ManageUsers from "./ManageUsers";
import Movies from "./Movies";
import Subscriptions from "./Subscriptions";

const Main = () => {
  let history = useHistory();
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    console.log(JSON.parse(sessionStorage.getItem("userInfo")));
    if (JSON.parse(sessionStorage.getItem("userInfo"))) {
      if (JSON.parse(sessionStorage.getItem("userInfo")).Login != true)
        return history.push("/");
    } else return history.push("/");
  }, []);

  const movies = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "View Movies");
    if (permission.length > 0) return <Movies />;
  };

  const subscriptions = () => {
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "View Subscriptions");
    if (permission.length > 0) return <Subscriptions />;
    // else alert("You need permission to view subscriptions");
  };

  let showManagUsers = () => {
    if (JSON.parse(sessionStorage.getItem("userInfo")))
      if (JSON.parse(sessionStorage.getItem("userInfo")).UserName == "Admin")
        return (
          <input
            type="button"
            value="Users Nanagement"
            onClick={() => setToggle("manageUsers")}
          />
        );
  };
  let logOut = () => {
    sessionStorage.removeItem("userInfo");
    return history.push("/");
  };

  return (
    <div>
      {/* {user.firstName} */}
      Hello {JSON.parse(sessionStorage.getItem("userInfo")).FirstName}
      <h1>Movies - Subscriptions Web Site</h1>
      <input type="button" value="Movies" onClick={() => setToggle("movies")} />
      <input
        type="button"
        value="Subscription"
        onClick={() => setToggle("subscription")}
      />
      {showManagUsers()}
      <input type="button" value="Log Out" onClick={() => logOut()} />
      <br />
      {toggle == "movies" && movies()}
      {toggle == "subscription" && subscriptions()}
      {toggle == "manageUsers" && <ManageUsers />}
      <br />
    </div>
  );
};
export default Main;
