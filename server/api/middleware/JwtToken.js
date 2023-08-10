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
const jwt = require("jsonwebtoken");
const { Users } = require("../../db");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.userId; // Add the userId to the request object
    next();
  });
};

module.exports = {
  authenticateToken,
};
