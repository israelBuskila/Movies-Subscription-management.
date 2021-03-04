const Subscriptions = require("../models/SubscriptionsModel");

exports.getAllSubscriptions = function () {
  return new Promise((resolve, reject) => {
    Subscriptions.find({}, function (err, pers) {
      if (err) {
        reject(err);
      } else {
        resolve(pers);
      }
    });
  });
};

exports.getSubscriptionById = function (id) {
  return new Promise((resolve, reject) => {
    Subscriptions.findById(id, function (err, per) {
      if (err) {
        reject(err);
      } else {
        resolve(per);
      }
    });
  });
};

exports.getSubscriptionByMemberId = (memberId) => {
  return new Promise((resolve, reject) => {
    Subscriptions.find({ MemberId: memberId }, function (err, sub) {
      if (err) {
        reject(err);
      } else {
        resolve(sub);
      }
    });
  });
};

exports.addSubscription = function (obj) {
  return new Promise((resolve, reject) => {
    const s = new Subscriptions({
      MemberId: obj.MemberId,
      Movies: obj.Movies,
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

exports.updateSubscriptionById = function (id, obj) {
  return new Promise((resolve, reject) => {
    Subscriptions.findByIdAndUpdate(
      id,
      {
        MemberId: obj.MemberId,
        Movies: obj.Movies,
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

exports.deleteSubscription = function (id) {
  return new Promise((resolve, reject) => {
    Subscriptions.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
