const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "Romita", role: "Developer" },
  { id: 2, name: "Darling", role: "Student" },
];

// GET all users
router.get("/", (req, res) => {
  res.json(users);
});

// GET a specific user with nested route: /users/:id/todos
router.get("/:id/todos", (req, res) => {
  const { id } = req.params;
  res.json({
    userId: id,
    todos: [
      { title: "Study Node.js", completed: true },
      { title: "Write Middleware Lab", completed: false },
    ],
  });
});

module.exports = router;