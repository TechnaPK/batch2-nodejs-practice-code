const express = require('express');

var server = express()

server.use((req, res, next)=>{
    console.log(new Date())
    next()
})

server.get('/user', (req, res)=>{
    res.send('user page')
})

server.get('/hello', (req, res)=>{
    res.send('Hello World')
})

server.listen(8000)

















// var http = require('http');

// http.createServer(function (req, res) {

//     res.write("Hello World!")
//     res.end();
    
// }).listen(8000);