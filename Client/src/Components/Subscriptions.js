import { useState, useEffect } from "react";
import axios from "axios";
import Member from "../Views/Member";

const Subscriptions = () => {
  const [toggle, setToggle] = useState("All Members");
  const [members, setMembers] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/subscriptions")
      .then((resp) => setMembers(resp.data));
  }, []);

  const allMembers = () => {
    if (members) {
      return members.map((item, index) => {
        return <Member key={index} member={item} />;
      });
    }
  };
  return (
    <div>
      <h2>Subscription</h2>
      <input
        type="button"
        onClick={() => setToggle("All Members")}
        value="All Members"
      />
      <input
        type="button"
        onClick={() => setToggle("Add Members")}
        value="Add Members"
      />
      {toggle == "All Members" && allMembers()}
    </div>
  );
};
export default Subscriptions;
