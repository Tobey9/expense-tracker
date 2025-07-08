const Expense = require("../models/Expense");
const authVerify = require("../middleware/authVerify");
const { Op } = require("sequelize");

module.exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const userId = req.userId;

    if (!amount || !category) {
      return res
        .status(400)
        .json({ message: "Amount and category are required" });
    }

    const allowedCategories = [
      "Groceries",
      "Leisure",
      "Electronics",
      "Utilities",
      "Clothing",
      "Health",
      "Others",
    ];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const expense = await Expense.create({
      amount,
      category,
      description,
      userId,
    });

    res.status(201).json({ message: "Expense Added" });
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const userId = req.userId;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense is not found" });
    }

    if (expense.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete expense" });
    }

    await expense.destroy();

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.editExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const { amount, description, category } = req.body;
    const userId = req.userId;

    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ message: "Expense is not found" });
    }

    if (expense.userId !== userId) {
      return res.status(403).json({ message: "Not authorized to update" });
    }

    expense.amount = amount ?? expense.amount;
    expense.description = description ?? expense.description;
    expense.category = category ?? expense.category;

    await expense.save();

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (err) {
    console.error("Update expense failed", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.getFilteredExpenses = async (req, res) => {
  const userId = req.userId;
  const { filter, startDate, endDate } = req.query;

  let dateCondition = {};

  const today = new Date();

  switch (filter) {
    case "week":
      dateCondition = {
        [Op.gte]: new Date(today.setDate(today.getDate() - 7)),
      };
      break;

    case "month":
      dateCondition = {
        [Op.gte]: new Date(today.setMonth(today.getMonth() - 1)),
      };
      break;

    case "3months":
      dateCondition = {
        [Op.gte]: new Date(today.setMonth(today.getMonth() - 3)),
      };
      break;

    case "custom":
      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ message: "Custom filter needs startdate and enddate" });
      }
      dateCondition = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
      break;

    default:
      dateCondition = {};
  }

  try {
    const expenses = await Expense.findAll({
      where: {
        userId,
        ...(Object.keys(dateCondition).length && { date: dateCondition }),
      },
      order: [["date", "DESC"]],
    });

    res.json(expenses);
  } catch (err) {
    console.error("Error fetching filtered expenses", err);
    res.status(500).json({ message: "Server Error" });
  }
};
