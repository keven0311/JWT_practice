require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../../db");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    console.log("req userId: ", req.userId);
    // req.userId = decoded.userId; // Add the userId to the request object
    next();
  });
};

module.exports = {
  authenticateToken,
};
