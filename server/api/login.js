const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  //authenticate user
  const username = req.body.username;
});

module.exports = router;
