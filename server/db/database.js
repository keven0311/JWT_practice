const Sequelize = require("sequelize");
const dbName = "jwtpractice";

const db = new Sequelize(`postgres://localhost:5432/${dbName}`, {
  logging: false,
});

module.exports = db;
