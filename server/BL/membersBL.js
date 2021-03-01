const membersDAL = require("../DAL/membersDAL");
const subscriptionDAL = require("../DAL/subscriptionsDAL");
const moviesDAL = require("../DAL/moviesDAL");
const axios = require("axios");
const { move } = require("../routes/users");

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
  console.log(allsubscriptions);

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
