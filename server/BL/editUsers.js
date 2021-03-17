const userDal = require("../DAL/usersDAL");
const permissionsDAL = require("../DAL/permissionsDAL");
const userLogin = require("../DAL/usersLoginDAL");

exports.getAllUserWithPermissions = async () => {
  let users = await userDal.getAllUsers();
  let permissions = await permissionsDAL.getAllUsersPermission();

  let arr = users.reduce((acc, x) => {
    let perm = permissions.filter((i) => i.UserName == x.UserName);
    let user = {
      FirstName: x.FirstName,
      LastName: x.LastName,
      UserName: x.UserName,
      CreatedDate: x.CreatedDate,
      SessionTimeOut: x.SessionTimeOut,
      Permissions: perm[0].Permissions,
    };

    return [...acc, user];
  }, []);
  return arr;
};

exports.getPermissionsByUserName = async (userName) => {
  let user = await userDal.getUserByUserName(userName);
  // console.log(user);
  let permissions = await permissionsDAL.getUserPermissionsByUserName(userName);
  let obj = {
    FirstName: user[0].FirstName,
    Permissions: permissions[0].Permissions,
  };
  console.log(obj);
  return obj;
};

exports.addNewUser = async (obj) => {
  await userLogin.addUserLogin(obj);

  let date = new Date();
  let time =
    date.getDay() + "/" + date.getMonth() + 1 + "/" + date.getFullYear();

  let user = {
    UserName: obj.UserName,
    FirstName: obj.FirstName,
    LastName: obj.LastName,
    CreatedDate: time,
    SessionTimeOut: obj.SessionTimeOut,
  };

  let respUser = await userDal.addUser(user);
  console.log(respUser);
  let respPermissions = await permissionsDAL.addUserPermissions(obj);
  console.log(respPermissions);
};
exports.updateUserByUserName = async (userName, obj) => {
  console.log("object");
  let user = await userDal.getUserByUserName(userName);
  console.log(user);
  if (user[0] === undefined) return "User does not exist !";
  await userDal.updateUserById(user[0]._id, obj);
  console.log(user[0]._id);

  let userPermission = await permissionsDAL.getUserPermissionsByUserName(
    userName
  );

  if (userPermission[0] === undefined) return "User does not exist !";
  let resp = await permissionsDAL.updateUserPermissionsById(
    userPermission[0]._id,
    obj
  );
  console.log(resp);
};

exports.deleteUserByUserId = async (userName) => {
  //userlogin
  let id = await userLogin.getUserByUserName(userName);
  await userLogin.deleteUsersLogin(id[0]._id);

  //users
  let user = await userDal.getUserByUserName(userName);
  let user_id = user[0]._id;

  await userDal.deleteUser(user_id);

  //permissions
  let permissions = await permissionsDAL.getUserPermissionsByUserName(userName);
  let permissions_id = permissions[0]._id;
  console.log(permissions_id);
  await permissionsDAL.deleteUserPermissions(permissions_id);
};
