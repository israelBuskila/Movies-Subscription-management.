const Movies = require("../models/MoviesModel");

exports.getAllMovies = function () {
  return new Promise((resolve, reject) => {
    Movies.find({}, function (err, movies) {
      if (err) {
        reject(err);
      } else {
        resolve(movies);
      }
    });
  });
};

exports.getMovieById = function (id) {
  return new Promise((resolve, reject) => {
    Movies.findById(id, function (err, movies) {
      if (err) {
        reject(err);
      } else {
        resolve(movies);
      }
    });
  });
};

// exports.getUserByUserName = (userName) => {
//   return new Promise((resolve, reject) => {
//     Movies.find({ UserName: userName }, function (err, pers) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(pers);
//       }
//     });
//   });
// };

exports.addMovie = function (obj) {
  return new Promise((resolve, reject) => {
    const m = new Movies({
      name: obj.name,
      genres: obj.genres,
      image: obj.image,
      premiered: obj.premiered,
    });

    m.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Created !");
      }
    });
  });
};

exports.updateMovieById = function (id, obj) {
  return new Promise((resolve, reject) => {
    Movies.findByIdAndUpdate(
      id,
      {
        name: obj.name,
        genres: obj.genres,
        image: obj.image,
        premired: obj.date,
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

exports.deleteMovie = function (id) {
  return new Promise((resolve, reject) => {
    Movies.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !");
      }
    });
  });
};
