const fs = require('fs');
const readStream = fs.createReadStream('data.txt', { encoding: 'utf-8' }); 
readStream.on('data', (chunk) => {
    console.log("File data:" + chunk); 
});
readStream.on('error', (err) => {  
    console.log("Error reading file:", err.message);
});