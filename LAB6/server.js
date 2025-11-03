const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

// Custom middleware for logging
app.use(logger);

// Nested and dynamic routes
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware (must come last)
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});