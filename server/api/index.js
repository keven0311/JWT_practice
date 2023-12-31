const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/login", require("./login"));
router.use("/signup", require("./signup"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
