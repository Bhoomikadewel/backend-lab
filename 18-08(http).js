const http = require("http");

let todos = [
  { id: 1, task: "update journal" },
  { id: 2, task: "code" },
];
let nextId = 3;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const urlParts = req.url.split("/"); 
  const id = parseInt(urlParts[2]);

  if (req.url === "/todos" && req.method === "GET") {
    res.end(JSON.stringify(todos));
  } 
  else if (req.url === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk.toString());
    req.on("end", () => {
      const { task } = JSON.parse(body);
      const newTodo = { id: nextId++, task };
      todos.push(newTodo);
      res.statusCode = 201;
      res.end(JSON.stringify(newTodo));
    });
  } 
  else if (urlParts[1] === "todos" && req.method === "PUT") {
    let body = "";
    req.on("data", chunk => body += chunk.toString());
    req.on("end", () => {
      const { task } = JSON.parse(body);
      const todo = todos.find(t => t.id === id);
      if (todo) {
        todo.task = task;
        res.end(JSON.stringify(todo));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Todo not found" }));
      }
    });
  } 
  else if (urlParts[1] === "todos" && req.method === "DELETE") {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      const deleted = todos.splice(index, 1);
      res.end(JSON.stringify(deleted[0]));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Todo not found" }));
    }
  } 
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(4000, () => console.log("Server running at http://localhost:4000/todos"));