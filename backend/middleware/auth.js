const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Get token from the header
  const token = req.header("x-auth-token");

  // Check if token is available
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user from the payload to request object
    req.userId = decoded.id;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Something wrong with auth middleware", error);
    res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
