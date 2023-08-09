require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Users } = require("../db");

router.post("/", async (req, res, next) => {
  const { name, username, password, email, isadmin } = req.body;
  let existUser = await Users.findAll({
    where: { username: username },
  });

  if (!existUser) {
    await Users.create(req.body);
  }
  res.send("Account Created!");
});

module.exports = router;
