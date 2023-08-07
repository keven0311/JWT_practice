const Sequelize = require("sequelize");
const db = require("../database");

const Users = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users;
