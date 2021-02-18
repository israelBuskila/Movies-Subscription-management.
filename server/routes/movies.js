const express = require("express");
const router = express.Router();
const moviesBL = require("../BL/moviesBL");

router.get("/", async (req, res, next) => {
  return res.send(await moviesBL.getAllmoviesWithSubscriptions());
});

router.get("/deleteMovie/:id", async (req, res, next) => {
  let resp = await moviesBL.deleteMovieById(req.params.id);
});

module.exports = router;
