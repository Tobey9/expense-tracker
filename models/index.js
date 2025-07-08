const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./User");
const Expense = require("./Expense");

// Define associations
User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Expense.belongsTo(User, {
  foreignKey: "userId",
});

const db = {
  sequelize,
  Sequelize,
  User,
  Expense,
};

module.exports = db;
