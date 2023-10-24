require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const userRoutes = require("./routes/userRoutes");
// const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.error("Failed to connect to MongoDB: ", error));

// Use your routes
// app.use("/api/users", userRoutes);
// app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
