const express = require("express");
const router = express.Router();
const auth = require("../BL/authntication");

router.post("/", async (req, res, next) => {
  let a = await auth.authenticationUser(req.body.UserName, req.body.Password);
  return res.send(a);
});

router.post("/createAccount", async (req, res, next) => {
  let a = await auth.createUser(req.body.UserName, req.body.Password);

  return res.send(a);
});

module.exports = router;
