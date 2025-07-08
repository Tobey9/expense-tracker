const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

module.exports = app;
