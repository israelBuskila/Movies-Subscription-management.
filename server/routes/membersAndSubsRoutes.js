const express = require("express");
const router = express.Router();
const membersBL = require("../BL/membersBL");

router.get("/", async (req, res, next) => {
  res.send(await membersBL.getAllSubscriptionsWithMembers());
});

router.post("/subMovies", async (req, res, next) => {
  res.send(await membersBL.subMovies(req.body));
});
module.exports = router;
