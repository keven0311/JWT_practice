// const jwt = require("jsonwebtoken");

// exports.cookeiJwtAuth = (req, res, next) => {
//   const token = req.cookies.token;
//   try {
//     const user = jwt.verify(token, "kev");
//     req.user = user;
//     next();
//   } catch (err) {
//     res.clearCookie("token");
//   }
// };

require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
