const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);


app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});


app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error adding todo" });
  }
});


app.put("/todos/:id", async (req, res) => {
  try {
    const { task } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { task },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});


app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000/todos")
);
