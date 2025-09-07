const fs = require('fs');
const readStream = fs.createReadStream('output.txt', { encoding: 'utf8' });
readStream.on('data', (chunk) => {
    console.log(chunk);
});
readStream.on('error', (err) => {   
    console.log("Caught an error:" + err.message);
});