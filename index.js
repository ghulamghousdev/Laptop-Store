
const fs = require('fs');
const http = require('http');

//Reading data from data.json file
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(data); //Converting data into objects
 
//Creating our own web server
const server = http.createServer((req, res) =>{
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end('This is the response!');
});

//setting a port and an IP address
server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for Requests now');
});