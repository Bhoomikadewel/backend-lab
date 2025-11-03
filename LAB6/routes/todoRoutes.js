const express = require("express");
const router = express.Router();

// In-memory To-Do list (for demo)
let todos = [
  { id: 1, title: "Learn Express Middleware", completed: false },
  { id: 2, title: "Build To-Do API", completed: true },
];

// GET all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// GET a single todo by ID (Dynamic Route)
router.get("/:id", (req, res, next) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return next(new Error("Todo not found"));
  res.json(todo);
});

// POST - create a new todo
router.post("/", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT - update a todo
router.put("/:id", (req, res, next) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return next(new Error("Todo not found"));
  todo.title = req.body.title || todo.title;
  todo.completed = req.body.completed ?? todo.completed;
  res.json(todo);
});

// DELETE - remove a todo
router.delete("/:id", (req, res, next) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return next(new Error("Todo not found"));
  todos.splice(index, 1);
  res.json({ message: "Todo deleted successfully" });
});

// Nested route example: /todos/:todoId/comments
router.get("/:todoId/comments", (req, res) => {
  res.json({
    todoId: req.params.todoId,
    comments: [
      { user: "Romita", text: "This was an easy one!" },
      { user: "Darling", text: "Middleware magic ✨" },
    ],
  });
});

module.exports = router;