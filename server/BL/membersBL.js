const membersDAL = require("../DAL/membersDAL");
const subscriptionDAL = require("../DAL/subscriptionsDAL");
const moviesDAL = require("../DAL/moviesDAL");
const axios = require("axios");

exports.initDB = async () => {
  let resp1 = await axios.get("https://jsonplaceholder.typicode.com/users");
  let membersApi = resp1.data;
  membersApi.forEach(async (x) => {
    let obj = {
      Name: x.name,
      Email: x.email,
      City: x.address.city,
    };
    return await membersDAL.addMember(obj);
  });
};

exports.getAllSubscriptionsWithMembers = async () => {
  let allMovies = await moviesDAL.getAllMovies();

  let allsubscriptions = await subscriptionDAL.getAllSubscriptions();

  let allMembers = await membersDAL.getAllMembers();

  let allMembersWithSubs = [];
  allMembers.forEach((m) => {
    let sub = allsubscriptions.filter((s) => s.MemberId == m._id);
    let moviesWatched = [];
    if (sub.length > 0) {
      sub[0].Movies.forEach((x) => {
        let movie = allMovies.filter((mov) => x.movieId == mov._id);
        if (movie.length > 0) {
          let moviesObj = {
            movieId: movie[0]._id,
            name: movie[0].name,
            date: x.date,
          };
          moviesWatched.push(moviesObj);
        }
      });
    }
    let finalMember = {
      MemberId: m._id,
      Name: m.Name,
      City: m.City,
      Email: m.Email,
      MoviesWathced: moviesWatched,
    };
    allMembersWithSubs.push(finalMember);
  });

  return allMembersWithSubs;
};

exports.subMovies = async (watchMovie) => {
  let arr = [];
  let allMovies = await moviesDAL.getAllMovies();
  allMovies.forEach((x) => {
    let result = false;
    watchMovie.forEach((m) => {
      if (x.name == m.name) result = true;
    });
    if (result == false) arr.push(x);
  });
  // console.log(arr);
  return arr;
};

exports.addSub = async (newSub) => {
  let sub = await subscriptionDAL.getSubscriptionByMemberId(newSub.MemberId);

  if (sub.length > 0) {
    let arrMovies = sub[0].Movies;
    arrMovies.push(newSub.Movie);
    console.log(arrMovies);
    let obj = {
      MemberId: newSub.MemberId,
      Movies: arrMovies,
    };
    let resp = await subscriptionDAL.updateSubscriptionById(sub[0]._id, obj);
    console.log(resp);
  } else {
    let arr = [];
    arr.push(newSub.Movie);
    let obj = {
      MemberId: newSub.MemberId,
      Movies: arr,
    };

    let resp = await subscriptionDAL.addSubscription(obj);
    console.log(resp);
  }
};

exports.updateMemberById = async (member) => {
  return await membersDAL.updateMemberById(member.Id, member);
};

exports.deleteMember = async (memberId) => {
  let subscriptionId = await subscriptionDAL.getSubscriptionByMemberId(
    memberId
  );

  if (subscriptionId.length > 0) {
    let resp = await subscriptionDAL.deleteSubscription(subscriptionId[0]._id);
    console.log("subscription: " + resp);
  }
  let respMember = await membersDAL.deleteMember(memberId);
  console.log("member: " + respMember);
};

exports.addMember = async (newMember) => {
  let resp = await membersDAL.addMember(newMember);
  console.log(resp);
};
