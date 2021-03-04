const express = require("express");
const router = express.Router();
const membersBL = require("../BL/membersBL");

router.get("/", async (req, res, next) => {
  res.send(await membersBL.getAllSubscriptionsWithMembers());
});

router.post("/subMovies", async (req, res, next) => {
  res.send(await membersBL.subMovies(req.body));
});

router.post("/addSub", async (req, res, next) => {
  await membersBL.addSub(req.body);
});
module.exports = router;
