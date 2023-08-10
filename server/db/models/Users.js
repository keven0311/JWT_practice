const Sequelize = require("sequelize");
const db = require("../database");
const bcrypt = require("bcrypt");

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

module.exports = Users;

Users.prototype.comparePassword = async function (plainTextPw) {
  const isValid = await bcrypt.compare(plainTextPw, this.password);
  // console.log("valid password?", isValid);
  return isValid;
};
