import { useState, useEffect } from "react";
import axios from "axios";
import Member from "./Member";
import EditMember from "./EditMember";
import AddMember from "./AddMember";

const Subscriptions = () => {
  const [toggle, setToggle] = useState("AllMembers");
  const [members, setMembers] = useState();
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/subscriptions")
      .then((resp) => setMembers(resp.data));
  }, []);

  const showButton = () => {
    return (
      <div>
        <h2>Subscription</h2>
        <input
          type="button"
          onClick={() => setToggle("AllMembers")}
          value="All Members"
        />
        <input
          type="button"
          onClick={() => setToggle("addMember")}
          value="Add Member"
        />
      </div>
    );
  };
  const allMembers = () => {
    if (members) {
      return members.map((item, index) => {
        return (
          <Member
            key={index}
            member={item}
            call={(em) => toggleEditMember(em)}
          />
        );
      });
    }
  };

  const toggleEditMember = (mem) => {
    if (mem != undefined) {
      setMember(mem);
      setToggle("editMember");
    }
  };

  const editMember = () => {
    return <EditMember member={member} call={() => setToggle("AllMembers")} />;
  };
  const addMember = () => {
    return <AddMember call={() => setToggle("AllMembers")} />;
  };

  return (
    <div>
      {(toggle == "AllMembers" || toggle == "addMember") && showButton()}
      {toggle == "AllMembers" && allMembers()}
      {toggle == "editMember" && editMember()}
      {toggle == "addMember" && addMember()}
    </div>
  );
};
export default Subscriptions;
