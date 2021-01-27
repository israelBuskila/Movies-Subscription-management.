const UserPermissions = require("../models/PermissionsModel");

exports.getAllUsersPermission = function () {
  return new Promise((resolve, reject) => {
    UserPermissions.find({}, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getUserPermissionsById = function (id) {
  return new Promise((resolve, reject) => {
    UserPermissions.findById(id, function (err, per) {
      if (err) {
        reject(err);
      } else {
        resolve(per);
      }
    });
  });
};

exports.getUserPermissionsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    UserPermissions.find({ Id: userId }, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.addUserPermissions = function (id, permissions) {
  return new Promise((resolve, reject) => {
    const p = new UserPermissions({
      Id: id,
      Permissions: permissions,
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

exports.updateUserPermissionsById = function (id, obj) {
  return new Promise((resolve, reject) => {
    UserPermissions.findByIdAndUpdate(
      id,
      {
        Id: obj.Id,
        Permissions: obj.Permissions,
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

exports.deleteUserPermissions = function (id) {
  return new Promise((resolve, reject) => {
    UserPermissionss.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
