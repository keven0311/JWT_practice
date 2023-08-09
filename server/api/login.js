require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Users } = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const { name, username, password, email, isadmin } = req.body;

    const user = await Users.findOne({
      where: { username: username },
    });

    if (user) {
      if (await user.comparePassword(password)) {
        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        return res.send({ payload, token });
      } else {
        return res.status(401).send("Invalid Password");
      }
    } else {
      return res.status(404).send("NO USER");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
