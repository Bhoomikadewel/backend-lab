const express = require("express");
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node.js" },
  { id: 2, task: "Build a REST API" },
];
let nextId = 3;

app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = { id: nextId++, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { task } = req.body;
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.task = task;
    res.json(todo);
  } else res.status(404).json({ message: "Todo not found" });
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
  } else res.status(404).json({ message: "Todo not found" });
});

app.listen(2000, () => console.log("Express server running at http://localhost:2000/todos"));