require("dotenv").config();
const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isadmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Users.beforeCreate(async (user) => {
  const SALT_ROUNDS = 12;
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPassword;
});

Users.authenticate = async ({ username, password }) => {
  const user = await Users.findOne({
    where: { username },
  });
  if (!user || !(await user.comparePassword(password))) {
    const error = Error("Incorrect username/password!");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};
module.exports = Users;

Users.prototype.comparePassword = async function (plainTextPw) {
  const isValid = await bcrypt.compare(plainTextPw, this.password);
  // console.log("valid password?", isValid);
  return isValid;
};

Users.prototype.generateToken = () => {
  return jwt.sign({ id: this.id }, process.env.TOKEN_SECRET);
};
