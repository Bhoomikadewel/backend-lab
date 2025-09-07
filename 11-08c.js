const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200);
    res.write("Hello World");
    res.end();
}).listen(3000);

console.log("Server running at http://localhost:3000/");
