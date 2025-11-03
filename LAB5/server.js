const express = require("express");
const connectDB = require("./db/connect");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/todos", todoRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Mongoose To-Do List API 🌿");
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));