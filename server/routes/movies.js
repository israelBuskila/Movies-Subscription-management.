const express = require("express");
const router = express.Router();
const moviesBL = require("../BL/moviesBL");

router.get("/", async (req, res, next) => {
  return res.send(await moviesBL.getAllmoviesWithSubscriptions());
});

router.post("/deleteMovie", async (req, res, next) => {
  let resp = await moviesBL.deleteMovieById(req.body);
});

router.post("/addMovie", async (req, res, next) => {
  let resp = await moviesBL.addMovie(req.body);
});

module.exports = router;
