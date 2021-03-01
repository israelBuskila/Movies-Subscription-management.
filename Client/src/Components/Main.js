import React, { useContext, useState, useEffect } from "react";
import useSession from "react-session-hook";
import { useHistory } from "react-router-dom";

import ManageUsers from "./ManageUsers";
import Movies from "./Movies";
import Subscriptions from "./Subscriptions";
import EditUser from "./EditUser";

const Main = () => {
  let history = useHistory();
  const session = useSession();
  const [toggle, setToggle] = useState("");

  // if (session.isAuthenticated == false && session.isAdmin == false)
  //   return history.push("/");
  // else {
  let showManagUsers = () => {
    if (true)
      return (
        <input
          type="button"
          value="Users Nanagement"
          onClick={() => setToggle("manageUsers")}
        />
      );
  };
  let logOut = () => {
    session.isAdmin = false;
    console.log(session.isAdmin);
    session.removeSession();
    console.log(session.isAdmin);

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
