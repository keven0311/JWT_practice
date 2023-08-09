const express = require("express");
const router = express.Router();

const { Users } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("user post call!");
    const { name, username, email, isadmin } = req.body;
    const info = {
      name: name,
      username: username,
      email: email,
      isadmin: isadmin,
    };
    const newUser = await Users.create(info);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
