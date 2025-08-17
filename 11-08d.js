const fs = require('fs');

fs.readFile('data.txt', (err, data) => {
    if(err){
        console.log("File not found!"); 
        console.log(err);
    }
    else {
        console.log(data);
    }
});