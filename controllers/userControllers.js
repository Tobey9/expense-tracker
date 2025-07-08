require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const newUser = await User.create({
      email,
      password,
      userName: username,
    });

    const token = jwt.sign(
      {
        userId: newUser.id,
        username: username,
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration", err);
    res.status(500).json({ error: "Server Error." });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.userName, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV == "production",
      maxAge: 3600000,
    });

    res.json({
      message: "Logged in successfully",
      userId: user.id,
      username: user.userName,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Login error" });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV == "production",
  });
  res.json({ message: "Logged out successfully" });
};
