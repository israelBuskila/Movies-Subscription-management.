const Users = require("../models/UsersModel");

exports.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    Users.find({}, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getUserByUserName = (userName) => {
  return new Promise((resolve, reject) => {
    Users.find({ UserName: userName }, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    Users.findById(id, function (err, per) {
      if (err) {
        reject(err);
      } else {
        resolve(per);
      }
    });
  });
};

exports.addUser = function (obj) {
  return new Promise((resolve, reject) => {
    const p = new Users({
      FirstName: obj.FirstName,
      LastName: obj.LastName,
      City: obj.City,
    });

    p.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

//Need to test the function.
exports.updateUserByUserName = async function (userName, obj) {
  let user = await getUserByUserName(userName);
  if (user[0] === undefined) return "User does not exist !";
  let resp = await updateUser(user[0]._id, obj);
  console.log(resp);
};

exports.updateUserById = function (id, obj) {
  return new Promise((resolve, reject) => {
    Users.findByIdAndUpdate(
      id,
      {
        Id: obj.Id,
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        UserName: obj.UserName,
        CreatedDate: obj.CreatedDate,
        SessionTimeOut: obj.sessionTimeOut,
      },
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Updated !");
        }
      }
    );
  });
};

exports.deleteUser = function (id) {
  return new Promise((resolve, reject) => {
    Users.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
