process.stdout.write("Enter your name: ");

process.stdin.on('data', (data) => {
    let name = data.toString().trim();   
    console.log("Hello " + name);        
    process.exit();
});