const Members = require("../models/MembersModel");

exports.getAllMembers = function () {
  return new Promise((resolve, reject) => {
    Members.find({}, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getMemberById = function (id) {
  return new Promise((resolve, reject) => {
    Members.findById(id, function (err, per) {
      if (err) {
        reject(err);
      } else {
        resolve(per);
      }
    });
  });
};

// exports.getUserByUserName = (userName) => {
//   return new Promise((resolve, reject) => {
//     Members.find({ UserName: userName }, function (err, pers) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(pers);
//       }
//     });
//   });
// };

exports.addMember = function (obj) {
  return new Promise((resolve, reject) => {
    const s = new Members({
      Name: obj.Name,
      Email: obj.Email,
      City: obj.City,
    });

    s.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

exports.updateMemberById = function (id, obj) {
  return new Promise((resolve, reject) => {
    Members.findByIdAndUpdate(
      id,
      {
        Name: obj.Name,
        Email: obj.Email,
        City: obj.City,
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

exports.deleteMember = function (id) {
  return new Promise((resolve, reject) => {
    Members.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
