const fs = require('fs');

const read = fs.createReadStream('input.txt', { encoding: 'utf8' }); 
const write = fs.createWriteStream('output2.txt');

read.pipe(write);

read.on('error', (err) => {
    console.error("Something went wrong:", err.message);
});