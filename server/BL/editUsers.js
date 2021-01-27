const userDal = require("../DAL/usersDAL");
const permissionsDAL = require("../DAL/permissionsDAL");
const userLogin = require("../DAL/usersLoginDAL");

// exports.getAllusersWithPermissions = async () =>
// {
//   let users = await usersDAL.getAllUsers()
//   let permissions = await permissionsDAL.getAllUsersPermission()
//   let u = users.map(x => {
//     x = {...x, }
//   })
// }

exports.updateUserByUserName = async function (userName, obj) {
  let user = await userDal.getUserByUserName(userName);
  if (user[0] === undefined) return "User does not exist !";
  await userDal.updateUserById(user[0]._id, obj);
  console.log(user[0]._id);

  let userPermission = await permissionsDAL.getUserPermissionsByUserId(
    user[0].Id
  );

  if (userPermission[0] === undefined) return "User does not exist !";
  let resp = await permissionsDAL.updateUserPermissionsById(
    userPermission[0]._id,
    obj
  );
  console.log(resp);
};

exports.addNewUser = async (obj) => {
  let id = await userLogin.addUserLogin(obj);

  let date = new Date();
  let time =
    date.getDay() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();

  let user = {
    Id: id,
    UserName: obj.UserName,
    FirstName: obj.FirstName,
    LastName: obj.LastName,
    CreatedDate: time,
    SessionTimeOut: obj.SessionTimeOut,
  };

  let respUser = await userDal.addUser(user);
  console.log(respUser);
  let respPermissions = await permissionsDAL.addUserPermissions(
    id,
    obj.Permissions
  );
  console.log(respPermissions);
};
