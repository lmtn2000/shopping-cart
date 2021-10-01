// const express =require('express')
// const app =express()
// const port =3001
// let path = require('path')

// app.get('/',(req,res) =>{
//     res.sendFile(path.join(__dirname+'/index.html'))
// })
// app.use(express.static(__dirname + '/public'))
// app.listen(port, ()=>{
//     console.log('Sever is listening on 3001')
// })

// const http=require('http')
// const fs=require('fs')
// const url=require('url')

// http.createServer((req,res)=>{
//     fs.readFile('index.html',(err,data)=>{
//         res.writeHead(200,{'Content-Type':'Text/html'})
//         res.write(data)
//         return res.end()
//     })
//     fs.readdir('photos')
// }).listen(3001)

var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3001);