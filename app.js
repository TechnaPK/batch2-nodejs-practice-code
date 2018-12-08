var express = require('express');
var bodyParser = require('body-parser')
var server = express()

server.use( bodyParser.urlencoded() )

server.use((req, res, next)=>{
    // console.log(new Date())
    next()
})

server.use( express.static('./frontend') )

server.get('/user/:name/:lname', (req, res)=>{
    res.send('My name is ' + req.params.name + " " + req.params.lname)
})

server.get('/hello', (req, res)=>{
    res.send('Hello World')
})

server.get('/search', (req, res)=>{
    
    res.send( req.query )

})

server.post('/login', (req, res)=>{
    
    res.send( req.body.username + ' ' + req.body.password  )
    res.send( req.body.password )

})

server.listen(8000, () => { console.log("Server successfully started.") } )






// server.get('/search', (req, res) => {
//     console.log( req.query )
//     res.end("Search Form request recieved.")
// })

// server.post('/login', (req, res)=>{
//     console.log( req.body )
//     res.end("Login Form request recieved.")
// })