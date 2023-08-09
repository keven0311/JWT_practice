const jwt = require("jsonwebtoken");

exports.cookeiJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, "kev");
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
  }
};
