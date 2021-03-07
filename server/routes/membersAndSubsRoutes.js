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

router.post("/updateMember", async (req, res, next) => {
  await membersBL.updateMemberById(req.body);
});

router.get("/deleteMember/:id", async (req, res, next) => {
  await membersBL.deleteMember(req.params.id);
});

router.post("/addMember", async (req, res, next) => {
  await membersBL.addMember(req.body);
});

module.exports = router;
