const express = require("express");
const authVerify = require("../middleware/authVerify");
const router = express.Router();
const expenses = require("../controllers/expenseControllers");

router.post("/add", authVerify, expenses.addExpense);
router.get("/filter", authVerify, expenses.getFilteredExpenses);
router.delete("/:expenseId", authVerify, expenses.deleteExpense);
router.put("/edit/:expenseId", authVerify, expenses.editExpense);

module.exports = router;
