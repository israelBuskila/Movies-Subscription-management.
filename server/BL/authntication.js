const usersLoginDAL = require("../DAL/usersLoginDAL");

exports.authenticationUser = async (userName, password) => {
  let user = await usersLoginDAL.getUserByUserName(userName);

  if (user[0] === undefined) return "User does not exist !";
  else if (user[0].Password != password) {
    return "Incorrect password !";
  } else return true;
};

exports.createUser = async (userName, password) => {
  let obj = {
    UserName: userName,
    Password: password,
  };
  let user = await usersLoginDAL.getUserByUserName(userName);
  if (user[0] === undefined) return "User does not exist !";
  let resp = await usersLoginDAL.updateUserLogin(user[0]._id, obj);
  console.log(resp);
  return true;
};
