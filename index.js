const fs = require('fs');
const http = require('http');
const url = require('url');

//Reading data from data.json file
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const laptopData = JSON.parse(data); //Converting data into objects
 
//Creating our own web server
const server = http.createServer((req, res) =>{
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;
    console.log(pathName);
    if (pathName === '/products' || pathName === '/') {
       res.writeHead(200, {
           'Content-type': 'text/html'
       });
       res.end('This is the Products page!');
    }
    else if (pathName ==='/laptop' && id< laptopData.length) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end('This is the Laptop page!');
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('URL was not found!');       
    }
});

//setting a port and an IP address
server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for Requests now');
});