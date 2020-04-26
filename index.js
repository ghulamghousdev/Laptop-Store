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

    if (pathName === '/products' || pathName === '/') {
       res.writeHead(200, {
           'Content-type': 'text/html'
       });
       
       fs.readFile(`${__dirname}/templates/template-overview.html`,'utf-8',(err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`,'utf-8',(err, data) => {
            const cardsOutput = laptopData.map(element => replaceTemplate(data, element)).join('');
            overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);
            res.end(overviewOutput);
            });
        });
    }
    else if (pathName ==='/laptop' && id< laptopData.length) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
       
        fs.readFile(`${__dirname}/templates/template-laptop.html`,'utf-8',(err, data) => {
            let laptop = laptopData[id]  
            const output = replaceTemplate(data, laptop);  
            res.end(output);
        });
    }

    else if((/\.(jpg|jpeg|png|gif)$/i).test(pathName)){
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, {
                'Content-Type': 'image/jpg'
            });
            res.end(data);
        })
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

function replaceTemplate(originalHTML, laptop){
    let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName)
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
            
}