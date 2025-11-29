const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res
        .status(400)
        .json({ status: false, message: "Username or email already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();
    return res
      .status(201)
      .json({ message: "User created successfully.", user_id: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user)
      return res
        .status(400)
        .json({ status: false, message: "Invalid Username and password" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return res
        .status(400)
        .json({ status: false, message: "Invalid Username and password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "devsecret",
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: "Login successful.", jwt_token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
