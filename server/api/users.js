const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Users } = require("../db");

const { authenticateToken } = require("./middleware/JwtToken");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id },
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, username, password, email, isadmin } = req.body;
    const info = {
      name: name,
      username: username,
      password: password,
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
