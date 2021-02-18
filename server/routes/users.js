const express = require("express");
const router = express.Router();
const userBL = require("../BL/editUsers");

router.get("/", async (req, res, next) => {
  return res.send(await userBL.getAllUserWithPermissions());
});

// router.post("/createAccount", async (req, res, next) => {
//   let a = await auth.createUser(req.body.UserName, req.body.Password);

//   return res.send(a);
// });

router.post("/editUser", async (req, res, next) => {
  let resp = await userBL.updateUserByUserName(req.body.UserName, req.body);
});

router.get("/deleteUser/:userName", async (req, res, next) => {
  let resp = await userBL.deleteUserByUserId(req.params.userName);
});

router.post("/addNewUser", async (req, res, next) => {
  console.log(req.body);
  let resp = await userBL.addNewUser(req.body);
});

module.exports = router;
