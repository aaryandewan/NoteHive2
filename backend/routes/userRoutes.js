const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

// User Signup
router.post("/signup", async (req, res) => {
  // Your signup logic here
});

// User Login
router.post("/login", async (req, res) => {
  // Your login logic here
});

module.exports = router;
