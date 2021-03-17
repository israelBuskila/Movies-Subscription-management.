import { useState, useEffect } from "react";
import axios from "axios";
import Member from "./Member";
import EditMember from "./EditMember";
import AddMember from "./AddMember";
import { useHistory } from "react-router-dom";

const Subscriptions = (props) => {
  const [toggle, setToggle] = useState("AllMembers");
  const [members, setMembers] = useState();
  const [member, setMember] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("userInfo"))) {
      let permission = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).Permissions.filter((x) => x == "View Subscriptions");
      if (
        JSON.parse(sessionStorage.getItem("userInfo")).Login == true &&
        permission.length > 0
      ) {
        axios
          .get("http://localhost:3001/subscriptions")
          .then((resp) => setMembers(resp.data));
        if (props.location !== undefined) {
          setToggle("memberLink");
        }
      }
    } else return history.push("/");
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
    let permission = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).Permissions.filter((x) => x == "createSubscriptions");
    if (permission.length > 0)
      return <AddMember call={() => setToggle("AllMembers")} />;
  };

  const memberFromLink = () => {
    if (members) {
      let result = members.filter(
        (x) => x.Name == props.location.state.item.memberName
      );
      if (result.length > 0) {
        return (
          <Member member={result[0]} call={(em) => toggleEditMember(em)} />
        );
      }
    }
  };

  return (
    <div>
      {(toggle == "AllMembers" || toggle == "addMember") && showButton()}
      {toggle == "AllMembers" && allMembers()}
      {toggle == "editMember" && editMember()}
      {toggle == "addMember" && addMember()}
      {toggle == "memberLink" && memberFromLink()}
    </div>
  );
};
export default Subscriptions;
