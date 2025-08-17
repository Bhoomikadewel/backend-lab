const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('data.txt', (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write("404 File Not Found");
            res.end();
        } else {
            res.writeHead(200);
            res.write(data);
            res.end();
        }
    });
}).listen(5000);

console.log("Server running at http://localhost:5000");
