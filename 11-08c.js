const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200);
    res.write("Hello World");
    res.end();
}).listen(5000);

console.log("Server running at http://localhost:5000/");
