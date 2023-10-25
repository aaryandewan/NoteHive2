const express = require("express");
const User = require("../models/UserModel"); // Import the User model
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For creating JSON Web Tokens
const verifyToken = require("../middleware/auth");
const router = express.Router();

// Sign Up Route
// Sign Up Route

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.query; // or req.body if you're using body
    console.log(req.query);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Log In Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Profile Route
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // this is set by our verifyToken middleware
    const user = await User.findById(userId).select("-password"); // don't send back the password

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
