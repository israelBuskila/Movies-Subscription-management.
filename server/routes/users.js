const express = require("express");
const router = express.Router();

const usersDAL = require("../DAL/usersDAL");
const userBL = require("../BL/editUsers");

router.get("/", async (req, res, next) => {
  return res.send(await usersDAL.getAllUsers());
});

// router.post("/createAccount", async (req, res, next) => {
//   let a = await auth.createUser(req.body.UserName, req.body.Password);

//   return res.send(a);
// });

router.post("/editUser", async (req, res, next) => {
  userBL.updateUserByUserName(req.body.UserName, req.body);
});
//nedd to extract the id from req and return the permissions for this user by id
// router.get("/permissions/:id", async (req, res, next) => {
//   userBL.updateUserByUserName(req.body.UserName, req.body);
// });

router.post("/addNewUser", async (req, res, next) => {
  let resp = await userBL.addNewUser(req.body);
});

module.exports = router;
