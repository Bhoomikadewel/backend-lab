// routes/todoRoutes.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// CREATE a new To-Do
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all To-Dos with pagination
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query; // default pagination
    const todos = await Todo.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Todo.countDocuments();
    res.json({
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      todos,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single To-Do by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a To-Do
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a To-Do
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;