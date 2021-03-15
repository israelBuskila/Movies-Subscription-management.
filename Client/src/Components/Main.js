import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import ManageUsers from "./ManageUsers";
import Movies from "./Movies";
import Subscriptions from "./Subscriptions";

const Main = () => {
  let history = useHistory();
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userInfo"))) {
      if (JSON.parse(sessionStorage.getItem("userInfo")).Login !== true)
        return history.push("/");
    } else return history.push("/");
  }, []);

  let showManagUsers = () => {
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
    return history.push("/");
  };

  return (
    <div>
      {/* {user.firstName} */}
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
      {toggle == "movies" && <Movies />}
      {toggle == "subscription" && <Subscriptions />}
      {toggle == "manageUsers" && <ManageUsers />}

      <br />
    </div>
  );
};
export default Main;
