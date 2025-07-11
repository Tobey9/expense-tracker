const express = require("express");
const router = express.Router();
const users = require("../controllers/userControllers");

router.post("/register", users.register);

router.post("/login", users.login);

router.post("/logout", users.logout);

module.exports = router;
