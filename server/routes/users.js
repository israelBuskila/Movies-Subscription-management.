const express = require("express");
const router = express.Router();

const usersDAL = require("../DAL/usersDAL");

router.get("/", async (req, res, next) => {
  return res.send(await usersDAL.getAllUsers());
});

router.post("/createAccount", async (req, res, next) => {
  let a = await auth.createUser(req.body.UserName, req.body.Password);

  return res.send(a);
});

module.exports = router;
