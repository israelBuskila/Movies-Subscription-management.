const axios = require("axios");
const moviesDAL = require("../DAL/moviesDAL");
const subscriptionsDAL = require("../DAL/subscriptionsDAL");
const membersDAL = require("../DAL/membersDAL");

exports.getAllmoviesWithSubscriptions = async () => {
  let resp1 = await axios.get("https://api.tvmaze.com/shows");
  let moviesApi = resp1.data;

  let moviesDB = await moviesDAL.getAllMovies();

  let allMovies = moviesApi.concat(moviesDB);

  let resp2 = await axios.get("https://jsonplaceholder.typicode.com/users");
  let membersApi = resp2.data;

  let membersDB = await membersDAL.getAllMembers();
  let allMembers = membersApi.concat(membersDB);

  let subscriptions = await subscriptionsDAL.getAllSubscriptions();

  let allMoviesWithsubscriptions = [];
  allMovies.forEach((movie) => {
    let arr = [];
    subscriptions.forEach((sub) => {
      let mov = sub.Movies.filter((m) => m.movieId == movie.id);

      if (mov.length > 0) {
        let member = allMembers.filter((member) => member.id == sub.MemberId);
        if (member.length > 0) {
          let watchMovie = {
            memberId: member[0].id,
            memberName: member[0].name,
            date: mov[0].date,
          };
          arr.push(watchMovie);
        }
      }
    });
    let finalMovie = {
      id: movie.id,
      name: movie.name,
      genres: movie.genres,
      image: movie.image,
      premiered: movie.premiered,
      watchMovie: arr,
    };

    allMoviesWithsubscriptions.push(finalMovie);
  });

  return allMoviesWithsubscriptions;
};

exports.deleteMovieById = async (id) => {
  //if exist in DB so delete

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    let resp = await moviesDAL.deleteMovie(id);
    console.log(resp);
  }

  //delete subscription
};
