const axios = require("axios");
const moviesDAL = require("../DAL/moviesDAL");
const subscriptionsDAL = require("../DAL/subscriptionsDAL");
const membersDAL = require("../DAL/membersDAL");

exports.initDB = async () => {
  let resp1 = await axios.get("http://api.tvmaze.com/shows?page=1");
  let moviesApi = resp1.data;
  moviesApi.forEach(async (x) => {
    return await moviesDAL.addMovie(x);
  });
};

exports.getAllmoviesWithSubscriptions = async () => {
  let allMovies = await moviesDAL.getAllMovies();

  let allMembers = await membersDAL.getAllMembers();

  let subscriptions = await subscriptionsDAL.getAllSubscriptions();

  let allMoviesWithsubscriptions = [];
  allMovies.forEach((movie) => {
    let arr = [];
    subscriptions.forEach((sub) => {
      let mov = sub.Movies.filter((m) => m.movieId == movie._id);

      if (mov.length > 0) {
        let member = allMembers.filter((member) => member._id == sub.MemberId);

        if (member.length > 0) {
          let watchMovie = {
            subscriptionId: sub._id,
            memberId: member[0].id,
            memberName: member[0].Name,
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
      premiered: movie.premiered,
      image: movie.image,
      watchMovie: arr,
    };

    allMoviesWithsubscriptions.push(finalMovie);
  });

  return allMoviesWithsubscriptions;
};

exports.deleteMovieById = async (movie) => {
  let resp = await moviesDAL.deleteMovie(movie.id);
  console.log(resp);

  //delete subscription
  movie.watchMovie.forEach(async (x) => {
    return await subscriptionsDAL.deleteSubscription(x.subscriptionId);
  });
};

exports.addMovie = async (movie) => {
  let resp = await moviesDAL.addMovie(movie);
  console.log(resp);
};

exports.editMovie = async (movie) => {
  console.log(movie);
  let resp = await moviesDAL.updateMovieById(movie.id, movie);
  console.log(resp);
};
